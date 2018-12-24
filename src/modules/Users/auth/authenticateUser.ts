import Jwt from 'jsonwebtoken';
import { User } from '../../../models/User';
import { Request } from 'express';
import { redis } from '../../../services/redis';

const { JWT_KEY } = process.env;

type AuthenticateUser = (request: Request) => Promise<User> | null;

export const authenticateUser: AuthenticateUser = async (request) => {
  const token = request.headers.authorization;
  if (!token) { return null; }

  let id: any;
  try {
    const decoded: any = Jwt.verify(token, JWT_KEY);
    id = decoded.id;
  } catch (err) {
    return null;
  }
  const blacklisted = await redis.get(id);
  if (blacklisted) { return null; }

  const user = await User.findOne({ where: { id } });

  return user;
};