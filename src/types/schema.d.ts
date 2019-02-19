./types.ts#IContext
// Generated in 2019-02-19T16:54:07+03:00
export type Maybe<T> = T | null;


export interface LoginInput {
  
  email: string;
  
  password: string;
}

export interface RegisterInput {
  
  username: string;
  
  email: string;
  
  password: string;
}

export interface RequestResetPasswordInput {
  
  email: string;
}

export interface ResetPasswordInput {
  
  newPassword: string;
  
  key: string;
}







// ====================================================
// Types
// ====================================================



export interface Query {
  
  hello: string;
}


export interface Mutation {
  
  login: LoginResponse;
  
  logout: LogoutResponse;
  
  register: Response;
  
  requestResetPassword: Response;
  
  resetPassword: Response;
}


export interface LoginResponse {
  
  error?: Maybe<Error[]>;
  
  success: boolean;
  
  token?: Maybe<string>;
}


export interface Error {
  
  path: string;
  
  message: string;
}


export interface LogoutResponse {
  
  error?: Maybe<Error[]>;
  
  success: boolean;
}


export interface Response {
  
  error?: Maybe<Error[]>;
  
  success: boolean;
}



// ====================================================
// Arguments
// ====================================================

export interface LoginMutationArgs {
  
  input: LoginInput;
}
export interface RegisterMutationArgs {
  
  input: RegisterInput;
}
export interface RequestResetPasswordMutationArgs {
  
  input?: Maybe<RequestResetPasswordInput>;
}
export interface ResetPasswordMutationArgs {
  
  input: ResetPasswordInput;
}


import { GraphQLResolveInfo } from 'graphql';



import { IContext } from './types.ts';

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<Result, Parent = {}, Context = {}, Args = {}> =
  | ((...args: any[]) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;


export namespace QueryResolvers {
  export interface Resolvers<Context = IContext, TypeParent = {}> {
    
    hello?: HelloResolver<string, TypeParent, Context>;
  }


  export type HelloResolver<R = string, Parent = {}, Context = IContext> = Resolver<R, Parent, Context>;  
}

export namespace MutationResolvers {
  export interface Resolvers<Context = IContext, TypeParent = {}> {
    
    login?: LoginResolver<LoginResponse, TypeParent, Context>;
    
    logout?: LogoutResolver<LogoutResponse, TypeParent, Context>;
    
    register?: RegisterResolver<Response, TypeParent, Context>;
    
    requestResetPassword?: RequestResetPasswordResolver<Response, TypeParent, Context>;
    
    resetPassword?: ResetPasswordResolver<Response, TypeParent, Context>;
  }


  export type LoginResolver<R = LoginResponse, Parent = {}, Context = IContext> = Resolver<R, Parent, Context, LoginArgs>;
  export interface LoginArgs {
    
    input: LoginInput;
  }


  export type LogoutResolver<R = LogoutResponse, Parent = {}, Context = IContext> = Resolver<R, Parent, Context>;
  export type RegisterResolver<R = Response, Parent = {}, Context = IContext> = Resolver<R, Parent, Context, RegisterArgs>;
  export interface RegisterArgs {
    
    input: RegisterInput;
  }


  export type RequestResetPasswordResolver<R = Response, Parent = {}, Context = IContext> = Resolver<R, Parent, Context, RequestResetPasswordArgs>;
  export interface RequestResetPasswordArgs {
    
    input?: Maybe<RequestResetPasswordInput>;
  }


  export type ResetPasswordResolver<R = Response, Parent = {}, Context = IContext> = Resolver<R, Parent, Context, ResetPasswordArgs>;
  export interface ResetPasswordArgs {
    
    input: ResetPasswordInput;
  }

  
}

export namespace LoginResponseResolvers {
  export interface Resolvers<Context = IContext, TypeParent = LoginResponse> {
    
    error?: ErrorResolver<Maybe<Error[]>, TypeParent, Context>;
    
    success?: SuccessResolver<boolean, TypeParent, Context>;
    
    token?: TokenResolver<Maybe<string>, TypeParent, Context>;
  }


  export type ErrorResolver<R = Maybe<Error[]>, Parent = LoginResponse, Context = IContext> = Resolver<R, Parent, Context>;
  export type SuccessResolver<R = boolean, Parent = LoginResponse, Context = IContext> = Resolver<R, Parent, Context>;
  export type TokenResolver<R = Maybe<string>, Parent = LoginResponse, Context = IContext> = Resolver<R, Parent, Context>;  
}

export namespace ErrorResolvers {
  export interface Resolvers<Context = IContext, TypeParent = Error> {
    
    path?: PathResolver<string, TypeParent, Context>;
    
    message?: MessageResolver<string, TypeParent, Context>;
  }


  export type PathResolver<R = string, Parent = Error, Context = IContext> = Resolver<R, Parent, Context>;
  export type MessageResolver<R = string, Parent = Error, Context = IContext> = Resolver<R, Parent, Context>;  
}

export namespace LogoutResponseResolvers {
  export interface Resolvers<Context = IContext, TypeParent = LogoutResponse> {
    
    error?: ErrorResolver<Maybe<Error[]>, TypeParent, Context>;
    
    success?: SuccessResolver<boolean, TypeParent, Context>;
  }


  export type ErrorResolver<R = Maybe<Error[]>, Parent = LogoutResponse, Context = IContext> = Resolver<R, Parent, Context>;
  export type SuccessResolver<R = boolean, Parent = LogoutResponse, Context = IContext> = Resolver<R, Parent, Context>;  
}

export namespace ResponseResolvers {
  export interface Resolvers<Context = IContext, TypeParent = Response> {
    
    error?: ErrorResolver<Maybe<Error[]>, TypeParent, Context>;
    
    success?: SuccessResolver<boolean, TypeParent, Context>;
  }


  export type ErrorResolver<R = Maybe<Error[]>, Parent = Response, Context = IContext> = Resolver<R, Parent, Context>;
  export type SuccessResolver<R = boolean, Parent = Response, Context = IContext> = Resolver<R, Parent, Context>;  
}



/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<Result, SkipDirectiveArgs, IContext>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<Result, IncludeDirectiveArgs, IContext>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<Result, DeprecatedDirectiveArgs, IContext>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}



export interface IResolvers {
    Query?: QueryResolvers.Resolvers;
    Mutation?: MutationResolvers.Resolvers;
    LoginResponse?: LoginResponseResolvers.Resolvers;
    Error?: ErrorResolvers.Resolvers;
    LogoutResponse?: LogoutResponseResolvers.Resolvers;
    Response?: ResponseResolvers.Resolvers;
}

export interface IDirectiveResolvers<Result> {
    skip?: SkipDirectiveResolver<Result>;
    include?: IncludeDirectiveResolver<Result>;
    deprecated?: DeprecatedDirectiveResolver<Result>;
}