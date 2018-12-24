import { GraphQLClient } from 'graphql-request';

export class TestClient {
  url: string;
  client: GraphQLClient;
  token: string;
  constructor() {
    this.url = process.env.URL;
    this.client = new GraphQLClient(this.url);
  }

  async register(email: string, password: string) {
    const response = await this.client.request(`
      mutation {
        register(input: { email: "${email}", password: "${password}" }) {
          path
          message
        }
      }
    `);
    return response;
  }

  async login(email: string, password: string) {
    const response: any = await this.client.request(`
    mutation {
      login(input: { email: "${email}", password: "${password}" }) {
          error {
            path
            message
          }
          token
          success
        }
      }
    `);
    if (!response.login.token) { return response; }
    this.token = response.login.token; // will be used inside tests
    this.client.setHeader('authorization', this.token);
    return response;
  }

  async resetPassword(newPassword: string, key: string) {
    const response = await this.client.request(`
      mutation {
        resetPassword(input: { newPassword: "${newPassword}", key: "${key}" }) {
          error {
            path
            message
          }
          success
        }
      }
    `);
    return response;
  }

  async logout() {
    const response = await this.client.request(`
      mutation {
        logout {
          success
        }
      }
    `);
    this.token = '';
    this.client.setHeader('authorization', '');
    return response;
  }
}