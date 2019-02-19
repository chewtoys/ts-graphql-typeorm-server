import * as bcrypt from 'bcryptjs';
import { MutationResolvers } from '../../../../types/schema';
import { resetPasswordPrefix } from '../../../../constants';
import { expiredKeyErr } from '../../errorMessages';
import { validatePassword } from './validatePassword';
import { User } from '../../../../models/User';

const respond = (errorMessage?: string) => ({
  error: errorMessage && [{ path: 'passwordReset', message: errorMessage }],
  success: Boolean(!errorMessage)
});

const resetPassword: MutationResolvers.ResetPasswordResolver = async (
  _,
  { input: { newPassword, key } },
  { redis }
) => {
  const redisKey = `${resetPasswordPrefix}${key}`;
  const userId = await redis.get(redisKey);
  if (!userId) {
    return respond(expiredKeyErr);
  }

  const error = validatePassword(newPassword);
  if (error) {
    return { error, success: false };
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.update(
    { id: userId },
    { password: hashed, resetPasswordLocked: false }
  );
  await redis.del(redisKey);
  return respond();
};

export default resetPassword;
