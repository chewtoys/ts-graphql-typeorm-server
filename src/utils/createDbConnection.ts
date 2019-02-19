import { createConnection } from 'typeorm';
import { User } from '../models/User';

export const createDbConnection = async (connType: string) => {
  const { DATABASE_URL } = process.env;
  return createConnection({
    type: 'postgres',
    synchronize: connType === 'PROD' ? false : true,
    dropSchema: connType === 'TEST' && true,
    logging: connType === 'DEV' && true,
    entities: [User],
    url: DATABASE_URL,
    name: 'default'
  });
};
