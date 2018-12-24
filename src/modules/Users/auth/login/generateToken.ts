import jwt from 'jsonwebtoken';
const { JWT_KEY } = process.env;

type generateToken = (id: string) => string;

const generateToken: generateToken = (id) => {
  return jwt.sign({ id }, JWT_KEY, { expiresIn: '2d' });
};

export default generateToken;