import { User } from '../../../../../models/User';
import { createDbConnection } from '../../../../../utils/createDbConnection';
import {
  emailTakenErr,
  validEmailErr,
  shortPassErr,
  longPassErr
} from '../../../errorMessages';
import { Connection } from 'typeorm';
import { TestClient } from '../../../../../../test/testClient';

const client = new TestClient();

const email = 'asd@asd.com';
const password = 'asdasasdasd';

let connection: Connection;
beforeAll(async () => {
  connection = await createDbConnection();
});

afterAll(async () => {
  await connection.close();
});

afterEach(async () => {
  await User.delete({ email });
});

describe('register user', () => {
  it('registers', async () => {
    const response = await client.register(email, password);
    expect(response).toEqual({ register: null });

    const users = await User.find({ where: { email } });
    expect(users.length).toBe(1);
    expect(users[0]).toHaveProperty('email', email);
  });

  it('returns error if email already exists', async () => {
    await client.register(email, password);
    const errResponse: any = await client.register(email, password);
    expect(errResponse.register).toHaveLength(1);
    expect(errResponse.register[0]).toHaveProperty('path', 'email');
    expect(errResponse.register[0]).toHaveProperty('message', emailTakenErr);
  });

  it('throws error on invalid email', async () => {
    const errResponse: any = await client.register('asd', password);
    expect(errResponse.register).toHaveLength(1);
    expect(errResponse.register[0]).toHaveProperty('path', 'email');
    expect(errResponse.register[0]).toHaveProperty('message', validEmailErr);
  });

  it('throws error on invalid password', async () => {
    const errResponse: any = await client.register(email, '1');
    expect(errResponse.register).toHaveLength(1);
    expect(errResponse.register[0]).toHaveProperty('path', 'password');
    expect(errResponse.register[0]).toHaveProperty('message', shortPassErr);
  });

  it('throws error on invalid password', async () => {
    const errResponse: any = await client.register(email, '111111111111111111111111111111111111111111111111111111111');
    expect(errResponse.register).toHaveLength(1);
    expect(errResponse.register[0]).toHaveProperty('path', 'password');
    expect(errResponse.register[0]).toHaveProperty('message', longPassErr);
  });

  it('returns an array of errors when email and password are both invalid', async () => {
    const errResponse: any = await client.register('email', '1');
    expect(errResponse.register).toHaveLength(2);
    expect(errResponse.register[0]).toHaveProperty('path', 'email');
    expect(errResponse.register[0]).toHaveProperty('message', validEmailErr);
    expect(errResponse.register[1]).toHaveProperty('path', 'password');
    expect(errResponse.register[1]).toHaveProperty('message', shortPassErr);
  });
});