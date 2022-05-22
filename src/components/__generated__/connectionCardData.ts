/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ConnectionStatus } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: connectionCardData
// ====================================================

export interface connectionCardData_author {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  introduction: string;
}

export interface connectionCardData_invitee {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  introduction: string;
}

export interface connectionCardData {
  __typename: "Connection";
  uuid: any;
  author: connectionCardData_author;
  invitee: connectionCardData_invitee;
  status: ConnectionStatus;
  message: string | null;
  created: any;
}
