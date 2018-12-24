import { redis } from '../../../services/redis';
import { User } from '../../../models/User';

export enum AccountLockReason {
  passwordReset = 'passwordReset'
}

type LockUserAccount = (userId: string, reason: AccountLockReason, duration?: number) => Promise<void>;


export const lockUserAccount: LockUserAccount = async (userId, reason, duration) => {
  if (reason === AccountLockReason.passwordReset) {
    await User.update({ id: userId }, { resetPasswordLocked: true });
    duration = 20 * 60;
  }

  await redis.set(userId, reason, 'ex', duration);
};
