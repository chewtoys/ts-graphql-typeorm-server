import register from './register';
import login from './login';
import logout from './logout';



export const resolvers = {
  Mutation: {
    register,
    login,
    logout
  },
  Query: {
    hello() {
      return 'hello';
    }
  }
};
