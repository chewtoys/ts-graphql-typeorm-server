import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { User } from '../../../models/User';
import { getConnection } from 'typeorm';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

interface GoogleProfile {
  id: string;
  emails: [{ value: string, type: string }];
}

passport.use(new Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `/auth/google/callback`
}, async (_: any, __: any, { id, emails }: GoogleProfile, done: any) => {
  const email = emails[0].value;

  const user = await getConnection()
    .getRepository(User)
    .createQueryBuilder('user')
    .where('user.googleId = :id', { id })
    .orWhere('user.email = :email', { email })
    .getOne();

  if (!user) {
    await User.create({
      googleId: id,
      email,
      confirmed: true
    }).save();
  } else if (!user.googleId) {
    // user logged in before but not with google
    // merge accounts
    user.googleId = id;
    await user.save();
  }

  return done(null, user);
}
));