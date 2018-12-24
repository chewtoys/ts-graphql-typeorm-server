import bcrypt from 'bcryptjs';
import { MutationResolvers, LoginResponse } from '../../../../types/schema';
import { User } from '../../../../models/User';
import { invalidLogin, confirmEmailErr, resetPasswordLockedError } from '../../errorMessages';
import generateToken from './generateToken';

type Response = (mesage?: string, token?: string) => LoginResponse;

const response: Response = (message, token) => ({
  error: message && [{ path: 'login', message }],
  success: Boolean(token),
  token
});

const login: MutationResolvers.LoginResolver = async (_, { input: { email, password } }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) { return response(invalidLogin); }

  if (!user.confirmed) { return response(confirmEmailErr); }

  if (user.resetPasswordLocked) { return response(resetPasswordLockedError); }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) { return response(invalidLogin); }

  const token = generateToken(user.id);
  return response(null, token);
};

export default login;