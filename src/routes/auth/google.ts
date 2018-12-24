import { Router } from 'express';
import passport from 'passport';
import generateToken from '../../modules/Users/auth/login/generateToken';

const router = Router();

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/callback', passport.authenticate('google', {
  failureRedirect: '/',
  session: false,
}), async (req, res) => {
  const token = await generateToken(req.user.id);
  res.json({ token });
  res.redirect('/');
});

export default router;