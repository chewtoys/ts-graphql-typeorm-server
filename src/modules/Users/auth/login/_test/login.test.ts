import faker from 'faker';
import { invalidLogin, confirmEmailErr } from '../../../errorMessages';
import { User } from '../../../../../models/User';
import { createDbConnection } from '../../../../../utils/createDbConnection';
import { Connection } from 'typeorm';
import { TestClient } from '../../../../../test/testClient';

const client = new TestClient();

let connection: Connection;
faker.seed(Math.random());
const email = faker.internet.email();
const password = faker.internet.password();
const username = faker.internet.userName();

beforeAll(async () => {
  connection = await createDbConnection('TEST');
  await client.register(username, email, password);
});

afterAll(async () => {
  await User.delete({ email });
  await connection.close();
});

describe('login', () => {
  describe('errors', () => {
    test('email not comfirmed', async () => {
      const response = await client.login(email, password);
      const { error } = response.login;
      expect(error).toHaveLength(1);
      expect(error[0]).toHaveProperty('path', 'login');
      expect(error[0]).toHaveProperty('message', confirmEmailErr);
    });

    describe('', () => {
      beforeAll(async () => {
        await User.update({ email }, { confirmed: true });
      });

      test('invalid email', async () => {
        const response = await client.login('tes@test.com', password);
        const { error } = response.login;
        expect(error).toHaveLength(1);
        expect(error[0]).toHaveProperty('path', 'login');
        expect(error[0]).toHaveProperty('message', invalidLogin);
      });

      test('invalid password', async () => {
        const response = await client.login(email, '1231231');
        const { error } = response.login;
        expect(error).toHaveLength(1);
        expect(error[0]).toHaveProperty('path', 'login');
        expect(error[0]).toHaveProperty('message', invalidLogin);
      });

      test('login', async () => {
        const response = await client.login(email, password);
        expect(typeof response.login.token === 'string').toBeTruthy();
      });
    });
  });
});
