import Joi from 'joi';
import { Error } from '../../../../types/schema';

const opts = {
  language: {
    key: '{{label}} '
  },
};

const schema = Joi.object({
  password: Joi.string().min(8).max(30).label('Password'),
});

type validatePassword = (password: string) => Error;

export const validatePassword = (password: string) => {
  const valid = Joi.validate({ password }, schema, opts);

  if (valid.error) {
    const { details } = valid.error;
    return [{ path: 'password reset', message: details[0].message }];
  }
};