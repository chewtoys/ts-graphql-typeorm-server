import { Redis } from 'ioredis';
import { Request } from 'express';

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
}

export type ValidateRegister = (arg: RegisterInput) => Promise<Array<Error>>;