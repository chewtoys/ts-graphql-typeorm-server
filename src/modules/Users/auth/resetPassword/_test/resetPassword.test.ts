import { createDbConnection } from '../../../../../utils/createDbConnection';
import { Connection } from 'typeorm';
import { createResetPasswordLink } from '../createResetPasswordLink';
import { lockUserAccount, AccountLockReason } from '../../lockUserAccount';
import {
  resetPasswordLockedError,
  shortPassErr,
  expiredKeyErr
} from '../../../errorMessages';
import { TestClient } from '../../../../../test/testClient';
import { User } from '../../../../../models/User';

const client = new TestClient();
let email: string;
let password: string;
const newPassword = 'asdasdasdasdasdasd';
let userId: string;

let connection: Connection;
beforeAll(async () => {
  connection = await createDbConnection('TEST');
  const user = await client.createUser(1);
  email = user[0].email;
  password = user[0].password;
  userId = user[0].id;
});

afterAll(async () => {
  await User.delete({ email });
  connection.close();
});

describe('reset pass email', () => {
  let key = '';
  beforeAll(async () => {
    const url = await createResetPasswordLink('', userId);
    const parts = url.split('/');
    key = parts[parts.length - 1];
  });

  it('cant login when the user started reset process', async () => {
    await lockUserAccount(userId, AccountLockReason.passwordReset);

    const response = await client.login(email, password);
    expect(response.login.error[0]).toHaveProperty(
      'message',
      resetPasswordLockedError
    );
  });

  it('returns error when the new password is short', async () => {
    const response: any = await client.resetPassword('a', key);
    expect(response.resetPassword.error[0]).toHaveProperty(
      'message',
      shortPassErr
    );
  });

  it('resets the password', async () => {
    const response: any = await client.resetPassword(newPassword, key);

    expect(response.resetPassword.success).toBeTruthy();

    const loginResponse: any = await client.login(email, newPassword);
    expect(loginResponse.login.success).toBeTruthy();
  });

  it('returns error on second request to reset password', async () => {
    const response: any = await client.resetPassword(newPassword, key);
    expect(response.resetPassword.error[0].message).toBe(expiredKeyErr);
  });
});
