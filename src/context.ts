import { Request } from 'express';
import { IContext } from './types/types';
import { redis } from './services/redis';
import { authenticateUser } from './modules/Users/auth/authenticateUser';




type Context = (arg1: { request: Request }) => Promise<IContext>;

export const context: Context = async ({ request }) => ({
  redis,
  request,
  user: await authenticateUser(request)
});