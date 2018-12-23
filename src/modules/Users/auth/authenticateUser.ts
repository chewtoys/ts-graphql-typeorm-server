import Jwt from 'jsonwebtoken';
import { User } from '../../../models/User';
import { Request } from 'express';

const { JWT_KEY } = process.env;

type AuthenticateUser = (request: Request) => Promise<User> | null;

export const authenticateUser: AuthenticateUser = async (request) => {
  const token = request.headers.authorization;
  if (!token) { return null; }

  const { id }: any = Jwt.verify(token, JWT_KEY);

  const user = await User.findOne({ where: { id } });

  return user;
};