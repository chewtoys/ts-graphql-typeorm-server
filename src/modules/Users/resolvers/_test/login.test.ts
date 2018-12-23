import { request } from 'graphql-request';
import { invalidLogin, confirmEmailErr } from '../../errorMessages';
import { User } from '../../../../models/User';
import { createDbConnection } from '../../../../utils/createDbConnection';
import { Connection } from 'typeorm';

const { URL } = process.env;

const registerMutation = (e: string, p: string) => `
  mutation {
    register(email: "${e}", password: "${p}") {
      path
      message
    }
  }
`;

const loginMutation = (e: string, p: string) => `
  mutation {
    login(email: "${e}", password: "${p}") {
      error {
        path
        message
      }
      token
    }
  }
`;

let connection: Connection;
beforeAll(async () => {
  connection = await createDbConnection();
});

afterAll(async () => {
  await connection.close();
});

describe('login', () => {
  const email = 'test@test.com';
  const password = '123123123123';
  describe('errors', () => {
    beforeAll(async () => {
      await request(URL, registerMutation(email, password));
    });

    test('email not comfirmed', async () => {
      const response: any = await request(URL, loginMutation(email, password));
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
        const response: any = await request(URL, loginMutation('tes@test.com', password));
        const { error } = response.login;
        expect(error).toHaveLength(1);
        expect(error[0]).toHaveProperty('path', 'login');
        expect(error[0]).toHaveProperty('message', invalidLogin);
      });

      test('invalid password', async () => {
        const response: any = await request(URL, loginMutation(email, '1231231'));
        const { error } = response.login;
        expect(error).toHaveLength(1);
        expect(error[0]).toHaveProperty('path', 'login');
        expect(error[0]).toHaveProperty('message', invalidLogin);
      });

      test('login', async () => {
        const response: any = await request(URL, loginMutation(email, password));
        expect(typeof response.login.token === 'string').toBeTruthy();
      });
    });
  });
});