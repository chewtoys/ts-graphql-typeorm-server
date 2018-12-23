import 'reflect-metadata';
import { GraphQLServer } from 'graphql-yoga';
import Redis from 'ioredis';
import { createDbConnection } from './utils/createDbConnection';
import schema from './schema';
import { User } from './models/User';

const redis = new Redis();

(async () => {
  await createDbConnection();
})();

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({
    redis,
    request
  })
});

server.express.get('/confirm/:id', async (req, res) => {
  const { id } = req.params;
  const userId = await redis.get(id);
  if (!userId) { return res.send('invalid'); }
  await User.update({ id: userId }, { confirmed: true });
  await redis.del(id);
  res.send('ok');
});

export default server;