import 'reflect-metadata';
import { GraphQLServer } from 'graphql-yoga';
import { createDbConnection } from './utils/createDbConnection';
import schema from './schema';
import { routes } from './routes';
import { context } from './context';
import { middlewares } from './middlewares';

(async () => { await createDbConnection(); })();


const server = new GraphQLServer({
  schema,
  context
});




middlewares(server.express);

routes(server.express);

export default server;