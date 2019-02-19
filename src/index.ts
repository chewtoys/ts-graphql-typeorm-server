import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { createDbConnection } from './utils/createDbConnection';
import { genSchema } from './schema';
import { routes } from './routes';
import { context } from './context';
import { middlewares } from './middlewares';
const { PORT, CONN_TYPE } = process.env;

(async () => {
  await createDbConnection(CONN_TYPE);
})();

const server = new ApolloServer({
  schema: genSchema(),
  context,
  playground: true
});
const app = Express();
middlewares(app);

routes(app);

server.applyMiddleware({ app, path: '/' });

app.listen({ port: PORT }, () =>
  console.log(`Server is running on port ${PORT}`)
);
