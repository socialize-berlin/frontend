/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomepageQuery
// ====================================================

export interface HomepageQuery_users {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  lat: any | null;
  lng: any | null;
  headline: string;
  introduction: string;
}

export interface HomepageQuery {
  users: HomepageQuery_users[] | null;
}
