/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  introduction: string;
  lat: any | null;
  lng: any | null;
  pendingConnectionsCount: number;
  unreadMessagesCount: number;
}

export interface MeQuery {
  me: MeQuery_me | null;
}
