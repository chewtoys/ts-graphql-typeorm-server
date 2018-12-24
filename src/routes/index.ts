import { GraphQLServer } from 'graphql-yoga';
import googleAuth from './auth/google';
import confirmEmail from './email/confirmEmail';
import '../modules/Users/auth/googleOAuth';


export const routes = (express: GraphQLServer['express']) => {
  express.use('/auth/google', googleAuth);
  express.use('/', confirmEmail);
};

