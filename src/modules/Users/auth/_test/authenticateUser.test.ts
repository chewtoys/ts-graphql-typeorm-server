import faker from 'faker';
import { createDbConnection } from '../../../../utils/createDbConnection';
import { Connection } from 'typeorm';
import { authenticateUser } from '../authenticateUser';
import { User } from '../../../../models/User';
import { TestClient } from '../../../../../test/testClient';

const client = new TestClient();

const email = faker.internet.email();
const password = faker.internet.password();

const mockRequest: any = {
  headers: { authorization: '' }
};

let connection: Connection;
beforeAll(async () => {
  connection = await createDbConnection();
  await User.create({ email, password, confirmed: true }).save();
});

afterAll(async () => {
  await connection.close();
});


describe('reads the id from the token and returns the user', () => {
  it('returns the user', async () => {
    await client.login(email, password);
    mockRequest.headers.authorization = client.token;

    const user = await User.findOne({ where: { email } });
    const res = await authenticateUser(mockRequest);

    expect(res).toHaveProperty('id', user.id);
    expect(res).toHaveProperty('email', email);
  });

  it('returns null when users not logged in', async () => {
    await client.logout();
    const res = await authenticateUser(mockRequest);
    expect(res).toBeNull();
  });
});