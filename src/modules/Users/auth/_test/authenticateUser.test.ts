import { createDbConnection } from '../../../../utils/createDbConnection';
import { Connection } from 'typeorm';
import { authenticateUser } from '../authenticateUser';
import { User } from '../../../../models/User';
import { TestClient } from '../../../../test/testClient';

const client = new TestClient();

let email: string;
let password: string;

const mockRequest: any = {
  headers: { authorization: '' }
};

let connection: Connection;
beforeAll(async () => {
  connection = await createDbConnection('TEST');
  const users = await client.createUser(1);
  email = users[0].email;
  password = users[0].password;
});

afterAll(async () => {
  await User.delete({ email });

  await connection.close();
});

describe('reads the id from the token and returns the user', () => {
  it('returns the user', async () => {
    const response: any = await client.login(email, password);
    const { token } = response.login;
    mockRequest.headers.authorization = token;

    const user = await User.findOne({ where: { email } });
    const res = await authenticateUser(mockRequest);

    expect(res).toHaveProperty('id', user.id);
    expect(res).toHaveProperty('email', email);
  });
});
