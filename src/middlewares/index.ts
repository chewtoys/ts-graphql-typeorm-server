import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';
import { redis } from '../services/redis';

export const middlewares = (express: any) => {
  express.use(new RateLimit({
    store: new RateLimitRedis({
      client: redis
    }),
    windowMs: 15 * 60 * 1000,
    max: 100
  }));
  express.use(helmet());
};
