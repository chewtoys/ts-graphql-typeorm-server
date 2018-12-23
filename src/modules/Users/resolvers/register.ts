import { MutationResolvers } from '../../../types/schema';
import hashPassword from '../auth/hashPassword';
import { User } from '../../../models/User';
import validateRegister from '../auth/validateRegister';
import { createConfirmEmailLink } from '../auth/createConfirmEmailLink';

const register: MutationResolvers.RegisterResolver = async (
  _,
  { email, password },
  { redis, request }
) => {
  const error = await validateRegister({ email, password });
  if (error) { return error; }

  const hashed = await hashPassword(password);
  const user = await User.create({
    email,
    password: hashed
  }).save();

  const url = `${request.protocol}://${request.get('host')}`;
  createConfirmEmailLink(url, user.id, redis);

  return null;
};


export default register;