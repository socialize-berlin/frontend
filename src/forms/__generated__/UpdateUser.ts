/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser_user {
  __typename: "User";
  headline: string;
  introduction: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUser_updateUser {
  __typename: "UpdateUser";
  user: UpdateUser_updateUser_user | null;
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser | null;
}

export interface UpdateUserVariables {
  headline: string;
  introduction: string;
  firstName: string;
  lastName: string;
}
