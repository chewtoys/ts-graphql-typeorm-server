import faker from 'faker';
import { graphql } from 'graphql';
import Redis from 'ioredis';
import {
  testRegisterMutation,
  testLoginMutation,
  testResetPasswordMutation,
  testLogoutMutation
} from './testClientQueries';
import { genSchema } from '../schema';
import { User } from '../models/User';

interface Options {
  source: string;
  variableValues?: { [key: string]: any };
}

const { REDIS_URL } = process.env;
const mockRequest: { [key: string]: any } = {
  get: (): any => null
};

export class TestClient {
  schema = genSchema();
  context: { [key: string]: any } = {
    request: mockRequest,
    redis: new Redis(REDIS_URL)
  };

  constructor() {}

  async gqlCall({ source, variableValues }: Options) {
    return graphql({
      schema: this.schema,
      source,
      variableValues,
      contextValue: this.context
    });
  }

  async register(username: string, email: string, password: string) {
    const response = await this.gqlCall({
      source: testRegisterMutation,
      variableValues: {
        username,
        email,
        password
      }
    });
    return response.data;
  }

  async authenticate(id: string) {
    this.context = {
      user: id
    };
  }

  async login(email: string, password: string) {
    const response = await this.gqlCall({
      source: testLoginMutation,
      variableValues: {
        email,
        password
      }
    });
    return response.data;
  }

  async resetPassword(newPassword: string, key: string) {
    const response = await this.gqlCall({
      source: testResetPasswordMutation,
      variableValues: {
        newPassword,
        key
      }
    });

    return response.data;
  }

  async logout() {
    const response = await this.gqlCall({ source: testLogoutMutation });
    this.context.user = null;

    return response.data;
  }

  async createUser(count: number = 1) {
    const users = [];
    for (let i = 0; i < count; i++) {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      const user = await User.create({
        username,
        email,
        password,
        confirmed: true
      }).save();
      users.push({ id: user.id, username, email, password });
    }
    return users;
  }

  async registerAndLogin() {
    const users = await this.createUser();
    const { email, password, username, id } = users[0];

    await this.authenticate(id);
    return { id, username, email, password };
  }

  async mutation<TData, TVars = {}>(
    mutation: string,
    variableValues?: TVars
  ): Promise<{ [key: string]: TData }> {
    const response = await this.gqlCall({ source: mutation, variableValues });
    return response.data;
  }

  async query<TData, TVars>(
    query: string,
    variableValues?: TVars
  ): Promise<{ [key: string]: TData }> {
    const response = await this.gqlCall({ source: query, variableValues });
    return response.data;
  }
}
