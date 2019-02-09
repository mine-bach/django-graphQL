export type Maybe<T> = T | null;

export interface UserInformationsInput {
  firstName: string;

  lastName: string;

  email: string;

  password?: Maybe<string>;

  passwordConfirmation?: Maybe<string>;
}

export interface UserAuthenticationInput {
  email: string;

  password: string;
}

/** The `DateTime` scalar type represents a DateTime value as specified by [iso8601](https://en.wikipedia.org/wiki/ISO_8601). */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export namespace UserQuery {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    auth: Maybe<Auth>;

    users: Maybe<(Maybe<Users>)[]>;
  };

  export type Auth = {
    __typename?: "UserNode";

    id: string;

    pk: Maybe<number>;

    username: Maybe<string>;
  };

  export type Users = {
    __typename?: "UserNode";

    id: string;

    pk: Maybe<number>;

    username: Maybe<string>;
  };
}

export namespace TokenAuth {
  export type Variables = {
    email: string;
    password: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    tokenAuth: Maybe<TokenAuth>;
  };

  export type TokenAuth = {
    __typename?: "ObtainJSONWebToken";

    token: Maybe<string>;
  };
}

export namespace UserAuthenticationFormCheck {
  export type Variables = {
    input: UserAuthenticationInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    checkUserAuthentication: Maybe<CheckUserAuthentication>;
  };

  export type CheckUserAuthentication = {
    __typename?: "CheckUserAuthentication";

    errors: Maybe<string>;
  };
}

export namespace UserInformationFormSave {
  export type Variables = {
    input: UserInformationsInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    saveUserInformation: Maybe<SaveUserInformation>;
  };

  export type SaveUserInformation = {
    __typename?: "SaveUserInformation";

    errors: Maybe<string>;
  };
}

export namespace AuthQuery {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    auth: Maybe<Auth>;
  };

  export type Auth = {
    __typename?: "UserNode";

    id: string;

    isSuperuser: boolean;

    email: string;

    username: Maybe<string>;

    firstName: string;

    lastName: string;
  };
}

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  users?: Maybe<(Maybe<UserNode>)[]>;

  auth?: Maybe<UserNode>;
}

export interface UserNode {
  id: string;

  password: string;

  lastLogin?: Maybe<DateTime>;
  /** Précise que l'utilisateur possède toutes les permissions sans les assigner explicitement. */
  isSuperuser: boolean;

  username?: Maybe<string>;

  firstName: string;

  lastName: string;

  email: string;
  /** Précise si l'utilisateur peut se connecter à ce site d'administration. */
  isStaff: boolean;
  /** Précise si l'utilisateur doit être considéré comme actif. Décochez ceci plutôt que de supprimer le compte. */
  isActive: boolean;

  dateJoined: DateTime;

  pk?: Maybe<number>;
}

export interface Mutations {
  saveUserInformation?: Maybe<SaveUserInformation>;

  checkUserAuthentication?: Maybe<CheckUserAuthentication>;

  tokenAuth?: Maybe<ObtainJsonWebToken>;
}

export interface SaveUserInformation {
  errors?: Maybe<string>;
}

export interface CheckUserAuthentication {
  errors?: Maybe<string>;
}

/** Obtain JSON Web Token mutation */
export interface ObtainJsonWebToken {
  token?: Maybe<string>;
}

// ====================================================
// Arguments
// ====================================================

export interface SaveUserInformationMutationsArgs {
  input: UserInformationsInput;
}
export interface CheckUserAuthenticationMutationsArgs {
  input: UserAuthenticationInput;
}
export interface TokenAuthMutationsArgs {
  username: string;

  password: string;
}

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

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

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
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
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    users?: UsersResolver<Maybe<(Maybe<UserNode>)[]>, TypeParent, Context>;

    auth?: AuthResolver<Maybe<UserNode>, TypeParent, Context>;
  }

  export type UsersResolver<
    R = Maybe<(Maybe<UserNode>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type AuthResolver<
    R = Maybe<UserNode>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace UserNodeResolvers {
  export interface Resolvers<Context = {}, TypeParent = UserNode> {
    id?: IdResolver<string, TypeParent, Context>;

    password?: PasswordResolver<string, TypeParent, Context>;

    lastLogin?: LastLoginResolver<Maybe<DateTime>, TypeParent, Context>;
    /** Précise que l'utilisateur possède toutes les permissions sans les assigner explicitement. */
    isSuperuser?: IsSuperuserResolver<boolean, TypeParent, Context>;

    username?: UsernameResolver<Maybe<string>, TypeParent, Context>;

    firstName?: FirstNameResolver<string, TypeParent, Context>;

    lastName?: LastNameResolver<string, TypeParent, Context>;

    email?: EmailResolver<string, TypeParent, Context>;
    /** Précise si l'utilisateur peut se connecter à ce site d'administration. */
    isStaff?: IsStaffResolver<boolean, TypeParent, Context>;
    /** Précise si l'utilisateur doit être considéré comme actif. Décochez ceci plutôt que de supprimer le compte. */
    isActive?: IsActiveResolver<boolean, TypeParent, Context>;

    dateJoined?: DateJoinedResolver<DateTime, TypeParent, Context>;

    pk?: PkResolver<Maybe<number>, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = UserNode,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type PasswordResolver<
    R = string,
    Parent = UserNode,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type LastLoginResolver<
    R = Maybe<DateTime>,
    Parent = UserNode,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type IsSuperuserResolver<
    R = boolean,
    Parent = UserNode,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type UsernameResolver<
    R = Maybe<string>,
    Parent = UserNode,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type FirstNameResolver<
    R = string,
    Parent = UserNode,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type LastNameResolver<
    R = string,
    Parent = UserNode,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<
    R = string,
    Parent = UserNode,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type IsStaffResolver<
    R = boolean,
    Parent = UserNode,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type IsActiveResolver<
    R = boolean,
    Parent = UserNode,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type DateJoinedResolver<
    R = DateTime,
    Parent = UserNode,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type PkResolver<
    R = Maybe<number>,
    Parent = UserNode,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace MutationsResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    saveUserInformation?: SaveUserInformationResolver<
      Maybe<SaveUserInformation>,
      TypeParent,
      Context
    >;

    checkUserAuthentication?: CheckUserAuthenticationResolver<
      Maybe<CheckUserAuthentication>,
      TypeParent,
      Context
    >;

    tokenAuth?: TokenAuthResolver<
      Maybe<ObtainJsonWebToken>,
      TypeParent,
      Context
    >;
  }

  export type SaveUserInformationResolver<
    R = Maybe<SaveUserInformation>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, SaveUserInformationArgs>;
  export interface SaveUserInformationArgs {
    input: UserInformationsInput;
  }

  export type CheckUserAuthenticationResolver<
    R = Maybe<CheckUserAuthentication>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, CheckUserAuthenticationArgs>;
  export interface CheckUserAuthenticationArgs {
    input: UserAuthenticationInput;
  }

  export type TokenAuthResolver<
    R = Maybe<ObtainJsonWebToken>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, TokenAuthArgs>;
  export interface TokenAuthArgs {
    username: string;

    password: string;
  }
}

export namespace SaveUserInformationResolvers {
  export interface Resolvers<Context = {}, TypeParent = SaveUserInformation> {
    errors?: ErrorsResolver<Maybe<string>, TypeParent, Context>;
  }

  export type ErrorsResolver<
    R = Maybe<string>,
    Parent = SaveUserInformation,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace CheckUserAuthenticationResolvers {
  export interface Resolvers<
    Context = {},
    TypeParent = CheckUserAuthentication
  > {
    errors?: ErrorsResolver<Maybe<string>, TypeParent, Context>;
  }

  export type ErrorsResolver<
    R = Maybe<string>,
    Parent = CheckUserAuthentication,
    Context = {}
  > = Resolver<R, Parent, Context>;
}
/** Obtain JSON Web Token mutation */
export namespace ObtainJsonWebTokenResolvers {
  export interface Resolvers<Context = {}, TypeParent = ObtainJsonWebToken> {
    token?: TokenResolver<Maybe<string>, TypeParent, Context>;
  }

  export type TokenResolver<
    R = Maybe<string>,
    Parent = ObtainJsonWebToken,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<DateTime, any> {
  name: "DateTime";
}

export interface IResolvers {
  Query?: QueryResolvers.Resolvers;
  UserNode?: UserNodeResolvers.Resolvers;
  Mutations?: MutationsResolvers.Resolvers;
  SaveUserInformation?: SaveUserInformationResolvers.Resolvers;
  CheckUserAuthentication?: CheckUserAuthenticationResolvers.Resolvers;
  ObtainJsonWebToken?: ObtainJsonWebTokenResolvers.Resolvers;
  DateTime?: GraphQLScalarType;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
