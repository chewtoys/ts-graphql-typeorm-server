import { v4 } from 'uuid';
import { resetPasswordPrefix } from '../../../../constants';
import { redis } from '../../../../services/redis';

type CreateResetPasswordLink = (url: string, userId: string) => Promise<string>;



export const createResetPasswordLink: CreateResetPasswordLink = async (url, userId) => {
  const id = v4();
  await redis.set(`${resetPasswordPrefix}${id}`, userId, 'ex', 60 * 20);
  return `${url}/change-password/${id}`;
};

