import faker from 'faker';
import { User } from '../../../../../models/User';
import { createDbConnection } from '../../../../../utils/createDbConnection';
import {
  emailTakenErr,
  validEmailErr,
  shortPassErr,
  longPassErr
} from '../../../errorMessages';
import { Connection } from 'typeorm';
import { TestClient } from '../../../../../test/testClient';

const client = new TestClient();

const username = faker.internet.userName();
const email = faker.internet.email();
const password = faker.internet.password();

let connection: Connection;
beforeAll(async () => {
  connection = await createDbConnection('TEST');
});

afterAll(async () => {
  await connection.close();
});

afterEach(async () => {
  await User.delete({ email });
});

describe('register user', () => {
  it('registers', async () => {
    const response = await client.register(username, email, password);
    expect(response).toEqual({
      register: {
        error: null,
        success: true
      }
    });

    const users = await User.find({ where: { email } });
    expect(users.length).toBe(1);
    expect(users[0]).toHaveProperty('email', email);
  });

  it('returns error if email already exists', async () => {
    await client.register(username, email, password);
    const errResponse: any = await client.register(username, email, password);
    const { error } = errResponse.register;
    expect(error).toHaveLength(1);
    expect(error[0]).toHaveProperty('path', 'email');
    expect(error[0]).toHaveProperty('message', emailTakenErr);
  });

  it('throws error on invalid email', async () => {
    const errResponse: any = await client.register(username, 'asd', password);
    const { error } = errResponse.register;
    expect(error).toHaveLength(1);
    expect(error[0]).toHaveProperty('path', 'email');
    expect(error[0]).toHaveProperty('message', validEmailErr);
  });

  it('throws error on invalid password', async () => {
    const errResponse: any = await client.register(username, email, '1');
    const { error } = errResponse.register;
    expect(error).toHaveLength(1);
    expect(error[0]).toHaveProperty('path', 'password');
    expect(error[0]).toHaveProperty('message', shortPassErr);
  });

  it('throws error on invalid password', async () => {
    const errResponse: any = await client.register(
      username,
      email,
      '111111111111111111111111111111111111111111111111111111111'
    );
    const { error } = errResponse.register;
    expect(error).toHaveLength(1);
    expect(error[0]).toHaveProperty('path', 'password');
    expect(error[0]).toHaveProperty('message', longPassErr);
  });

  it('returns an array of errors when email and password are both invalid', async () => {
    const errResponse: any = await client.register(username, 'email', '1');
    const { error } = errResponse.register;
    expect(error).toHaveLength(2);
    expect(error[1]).toHaveProperty('path', 'password');
    expect(error[1]).toHaveProperty('message', shortPassErr);
    expect(error[0]).toHaveProperty('path', 'email');
    expect(error[0]).toHaveProperty('message', validEmailErr);
  });
});
