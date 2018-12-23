import { MutationResolvers } from '../../../types/schema';
import { User } from '../../../models/User';
import validateRegister from '../auth/validateRegister';
import { createConfirmEmailLink } from '../auth/createConfirmEmailLink';
import { confirmEmail } from '../../../services/email/confirmEmail';

const register: MutationResolvers.RegisterResolver = async (
  _,
  { email, password },
  { redis, request }
) => {
  const error = await validateRegister({ email, password });
  if (error) { return error; }

  const user = await User.create({
    email,
    password
  }).save();

  const url = `${request.protocol}://${request.get('host')}`;
  const link = await createConfirmEmailLink(url, user.id, redis);

  await confirmEmail(email, link);
  return null;
};


export default register;