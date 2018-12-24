import * as Joi from 'joi';
import { User } from '../../../../models/User';
import { ValidateRegister } from '../../../../types/types';
import { emailTakenErr } from '../../errorMessages';


const opts = {
  language: {
    key: '{{label}} '
  },
  abortEarly: false
};

const schema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).label('Email'),
  password: Joi.string().min(8).max(30).label('Password'),
});


const validateRegister: ValidateRegister = async ({ email, password }) => {
  const valid = Joi.validate({ email, password }, schema, opts);
  if (valid.error) {
    const { error: { details } } = valid;

    if (details.length > 1) {
      return details.map(({ context, message }) => ({
        path: context.key,
        message
      }));
    }
    return [{ path: details[0].context.key, message: details[0].message }];
  }

  const userExists = await User.findOne({
    where: { email },
    select: ['id']
  });

  if (userExists) { return [{ path: 'email', message: emailTakenErr }]; }

};

export default validateRegister;