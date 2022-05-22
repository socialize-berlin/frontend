/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnlistUser
// ====================================================

export interface UnlistUser_unlistUser_user {
  __typename: "User";
  lat: any | null;
  lng: any | null;
}

export interface UnlistUser_unlistUser {
  __typename: "UnlistUser";
  ok: boolean | null;
  user: UnlistUser_unlistUser_user | null;
}

export interface UnlistUser {
  unlistUser: UnlistUser_unlistUser | null;
}
