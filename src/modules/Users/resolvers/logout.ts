import { IContext } from '../../../types/types';




const logout = async (_: any, __: any, { redis, request, user }: IContext) => {
  const token = request.headers.authorization;



  await redis.set(token, 'loggedOut')
};

export default logout;