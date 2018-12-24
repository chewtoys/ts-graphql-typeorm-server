import register from './auth/register/resolver';
import login from './auth/login/resolver';
import logout from './auth/logout/resolver';
import requestResetPassword from './auth/resetPassword/requestResetPasswordResolver';
import resetPassword from './auth/resetPassword/resetPasswordResolver';

export const resolvers = {
  Mutation: {
    register,
    login,
    logout,
    requestResetPassword,
    resetPassword
  },
  Query: {
    hello(_: any, __: any) {
      return 'hello';
    }
  }
};
