import { IContext } from '../../../../types/types';
import * as Jwt from 'jsonwebtoken';
import { MutationResolvers } from '../../../../types/schema';
import { blacklistedPrefix } from '../../../../constants';

const { JWT_KEY } = process.env;

const logout: MutationResolvers.LogoutResolver = async (_, __, { redis, request }: IContext) => {
  const token = request.headers.authorization;

  const { id, exp, iat }: any = Jwt.verify(token, JWT_KEY);

  await redis.set(`${blacklistedPrefix}${id}`, 'loggedOut', 'ex', exp - iat);

  return { success: true, error: null };
};

export default logout;