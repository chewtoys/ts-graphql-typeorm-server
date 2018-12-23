import register from './register';

export const resolvers = {
  Mutation: {
    register
  },
  Query: {
    hello() {
      return 'hello';
    }
  }
};
