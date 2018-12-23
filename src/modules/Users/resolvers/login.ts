import bcrypt from 'bcryptjs';
import { MutationResolvers, AuthResponse } from '../../../types/schema';
import { User } from '../../../models/User';
import { invalidLogin, confirmEmailErr } from '../errorMessages';
import generateToken from '../auth/generateToken';

type Response = (mesage?: string, token?: string) => AuthResponse;

const response: Response = (message, token) => ({
  error: message && [{ path: 'login', message }],
  token
});

const login: MutationResolvers.LoginResolver = async (_, { email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) { return response(invalidLogin); }

  if (!user.confirmed) { return response(confirmEmailErr); }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) { return response(invalidLogin); }

  const token = generateToken(user.id);
  return response(null, token);
};

export default login;