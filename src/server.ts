import 'reflect-metadata';
import { GraphQLServer } from 'graphql-yoga';
import { createDbConnection } from './utils/createDbConnection';
import schema from './schema';
import { confirmEmail } from './routes';
import { context } from './context';


(async () => {
  await createDbConnection();
})();


const server = new GraphQLServer({
  schema,
  context
});

server.express.get('/confirm/:id', confirmEmail);

export default server;