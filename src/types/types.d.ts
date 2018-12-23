import { Redis } from 'ioredis';
import { Request } from 'express';
import { User } from '../models/User';

export interface Error {
  path: string;
  message: string;
}

interface RegisterInput {
  email: string;
  password: string;
}

export interface IContext {
  redis: Redis;
  request: Request;
  user: User;
}

export interface Resolver {
  parent: any;
  args: any;
  context: IContext;
  info: any;
}

export type ValidateRegister = (arg: RegisterInput) => Promise<Array<Error>>;