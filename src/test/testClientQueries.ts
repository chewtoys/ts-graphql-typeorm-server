export const testRegisterMutation = `
mutation($username: String!, $email: String!, $password: String!) {
  register(input: { username: $username, email: $email, password: $password }) {
    error {
      path
      message
    }
    success
  }
}
`;

export const testLoginMutation = `
mutation($email: String!, $password: String!) {
  login(input: { email: $email, password: $password }) {
      error {
        path
        message
      }
      token
      success
    }
  }
`;

export const testResetPasswordMutation = `
mutation($newPassword: String!, $key: String!) {
  resetPassword(input: { newPassword: $newPassword, key: $key }) {
    error {
      path
      message
    }
    success
  }
}
`;

export const testLogoutMutation = `
mutation {
  logout {
    success
  }
}
`;

export const testCreateWorkspaceMutation = `
  mutation($name: String!) {
    createWorkspace(input: { name: $name }) {
      success
      error {
        path
        message
      }
    }
  }
`;

export const testCreateChannelMutation = `
    mutation($workspaceId: Int!, $name: String!, $type: ChannelType!, $members: [String!]) {
    createChannel(input: { name: $name, workspaceId: $workspaceId, type: $type, members: $members }) {
      success
      error {
        path
        message
      }
    }
  }
`;
