import { MutationResolvers } from '../../../../types/schema';
import { User } from '../../../../models/User';
import { lockUserAccount, AccountLockReason } from '../lockUserAccount';
import { createResetPasswordLink } from './createResetPasswordLink';
import { userNotFoundErr } from '../../errorMessages';

const respond = (errorMessage: string) => ({
  error: [{ path: 'passwordReset', message: errorMessage }],
  success: !Boolean(errorMessage)
});

const requestResetPassword: MutationResolvers.RequestResetPasswordResolver = async (
  _,
  { input: { email } }
) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return respond(userNotFoundErr);
  }

  await lockUserAccount(user.id, AccountLockReason.passwordReset);
  // create the link on front end
  await createResetPasswordLink('', user.id);
  // send email
  return { error: null, success: true };
};

export default requestResetPassword;
