/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUser
// ====================================================

export interface CreateUser_createUser {
  __typename: "CreateUser";
  token: string | null;
}

export interface CreateUser {
  createUser: CreateUser_createUser | null;
}

export interface CreateUserVariables {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
