import { hash } from 'bcryptjs';

export default async (password: string) => hash(password, 10);
