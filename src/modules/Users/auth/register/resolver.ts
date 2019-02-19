import { MutationResolvers } from '../../../../types/schema';
import { User } from '../../../../models/User';
import validateRegister from './validateRegister';
import { createConfirmEmailLink } from './createConfirmEmailLink';
// import { confirmEmail } from '../../../../services/email/confirmEmail';
import { respond } from '../../../common/genericResponse';

const register: MutationResolvers.RegisterResolver = async (
  _,
  { input: { username, email, password } },
  { redis, request }
) => {
  const error = await validateRegister({ email, password });
  if (error) {
    return { error, success: false };
  }

  const user = await User.create({
    username,
    email,
    password
  }).save();

  const url = `${request.protocol}://${request.get('host')}`;
  await createConfirmEmailLink(url, user.id, redis);

  // await confirmEmail(email, link);
  return respond();
};

export default register;
