import { Router } from 'express';
import { User } from '../../../models/User';
import { Response, Request } from 'express-serve-static-core';
import { redis } from '../../../services/redis';

const router = Router();

router.get('/confirm/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = await redis.get(id);
  if (!userId) { return res.send('invalid'); }
  await User.update({ id: userId }, { confirmed: true });
  await redis.del(id);
  res.send('ok');
});

export default router;


