import { request } from 'graphql-request';
import faker from 'faker';
import { createDbConnection } from '../../../../utils/createDbConnection';
import { Connection } from 'typeorm';
import { authenticateUser } from '../authenticateUser';
import { User } from '../../../../models/User';

const { URL } = process.env;
const email = faker.internet.email();
const password = faker.internet.password();

const mockRequest: any = {
  headers: {
    authorization: ''
  }
};

let connection: Connection;
beforeAll(async () => {
  connection = await createDbConnection();
  await User.create({ email, password, confirmed: true }).save();
});

afterAll(async () => {
  await connection.close();
});

const loginMutation = `
  mutation {
    login(email: "${email}", password: "${password}") {
        error {
          path
          message
        }
        token
    }
  }
`;

describe('reads the id from the token and returns the user', () => {
  it('returns the user', async () => {
    const response: any = await request(URL, loginMutation);
    const token = response.login.token;
    mockRequest.headers.authorization = token;

    const user = await User.findOne({ where: { email } });
    const res = await authenticateUser(mockRequest);

    expect(res).toHaveProperty('id', user.id);
    expect(res).toHaveProperty('email', email);
  });
});