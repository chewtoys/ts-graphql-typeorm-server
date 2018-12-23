import { createConnection, getConnectionOptions } from 'typeorm';

export const createDbConnection = async () => {
  const { DB_NAME } = process.env;
  const connOpts = await getConnectionOptions(DB_NAME);
  return createConnection({ ...connOpts, name: 'default' });
};
