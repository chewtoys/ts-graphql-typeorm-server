./types.d.ts#IContext
// Generated in 2018-12-23T17:33:34+03:00
export type Maybe<T> = T | null;








// ====================================================
// Types
// ====================================================



export interface Query {
  
  hello: string;
}


export interface Mutation {
  
  register?: Maybe<Error[]>;
  
  login: AuthResponse;
  
  logout: boolean;
}


export interface Error {
  
  path: string;
  
  message: string;
}


export interface AuthResponse {
  
  error?: Maybe<Error[]>;
  
  token?: Maybe<string>;
}



// ====================================================
// Arguments
// ====================================================

export interface RegisterMutationArgs {
  
  email: string;
  
  password: string;
}
export interface LoginMutationArgs {
  
  email: string;
  
  password: string;
}


import { GraphQLResolveInfo } from 'graphql';



import { IContext } from './types.d.ts';

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
    
    register?: RegisterResolver<Maybe<Error[]>, TypeParent, Context>;
    
    login?: LoginResolver<AuthResponse, TypeParent, Context>;
    
    logout?: LogoutResolver<boolean, TypeParent, Context>;
  }


  export type RegisterResolver<R = Maybe<Error[]>, Parent = {}, Context = IContext> = Resolver<R, Parent, Context, RegisterArgs>;
  export interface RegisterArgs {
    
    email: string;
    
    password: string;
  }


  export type LoginResolver<R = AuthResponse, Parent = {}, Context = IContext> = Resolver<R, Parent, Context, LoginArgs>;
  export interface LoginArgs {
    
    email: string;
    
    password: string;
  }


  export type LogoutResolver<R = boolean, Parent = {}, Context = IContext> = Resolver<R, Parent, Context>;  
}

export namespace ErrorResolvers {
  export interface Resolvers<Context = IContext, TypeParent = Error> {
    
    path?: PathResolver<string, TypeParent, Context>;
    
    message?: MessageResolver<string, TypeParent, Context>;
  }


  export type PathResolver<R = string, Parent = Error, Context = IContext> = Resolver<R, Parent, Context>;
  export type MessageResolver<R = string, Parent = Error, Context = IContext> = Resolver<R, Parent, Context>;  
}

export namespace AuthResponseResolvers {
  export interface Resolvers<Context = IContext, TypeParent = AuthResponse> {
    
    error?: ErrorResolver<Maybe<Error[]>, TypeParent, Context>;
    
    token?: TokenResolver<Maybe<string>, TypeParent, Context>;
  }


  export type ErrorResolver<R = Maybe<Error[]>, Parent = AuthResponse, Context = IContext> = Resolver<R, Parent, Context>;
  export type TokenResolver<R = Maybe<string>, Parent = AuthResponse, Context = IContext> = Resolver<R, Parent, Context>;  
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
    Error?: ErrorResolvers.Resolvers;
    AuthResponse?: AuthResponseResolvers.Resolvers;
}

export interface IDirectiveResolvers<Result> {
    skip?: SkipDirectiveResolver<Result>;
    include?: IncludeDirectiveResolver<Result>;
    deprecated?: DeprecatedDirectiveResolver<Result>;
}