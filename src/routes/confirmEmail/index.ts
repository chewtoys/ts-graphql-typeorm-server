import { User } from '../../models/User';
import { Response, Request } from 'express-serve-static-core';
import { redis } from '../../services/redis';

export const confirmEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = await redis.get(id);
  if (!userId) { return res.send('invalid'); }
  await User.update({ id: userId }, { confirmed: true });
  await redis.del(id);
  res.send('ok');
};

