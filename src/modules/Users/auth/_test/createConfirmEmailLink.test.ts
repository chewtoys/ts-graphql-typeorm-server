import Redis from 'ioredis';
import axios from 'axios';
import { createConfirmEmailLink } from '../createConfirmEmailLink';
import { createDbConnection } from '../../../../utils/createDbConnection';
import { User } from '../../../../models/User';

let userId: string;

beforeAll(async () => {
  await createDbConnection();
  const user = await User.create({
    email: 'fake@fake.com',
    password: 'asdasdasdasd'
  }).save();
  userId = user.id;
});

describe('confirmation', () => {
  let response: any;
  let url: string;
  const redis = new Redis();
  beforeAll(async () => {
    url = await createConfirmEmailLink(process.env.URL, userId, redis);

    response = await axios.get(url);
  });

  it('sends response ok', async () => {
    expect(response.data).toBe('ok');
  });

  it('updates the users confirmed field', async () => {
    const user = await User.findOne({ where: { id: userId } });
    expect(user.confirmed).toBeTruthy();
  });

  it('removes the id from redis', async () => {
    const chunks = url.split('/');
    const key = chunks[chunks.length - 1];
    const value = await redis.get(key);
    expect(value).toBeNull();
  });
});


