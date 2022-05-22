/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ConnectionStatus } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MyConnectionsQuery
// ====================================================

export interface MyConnectionsQuery_connections_author {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  introduction: string;
}

export interface MyConnectionsQuery_connections_invitee {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  introduction: string;
}

export interface MyConnectionsQuery_connections {
  __typename: "Connection";
  uuid: any;
  author: MyConnectionsQuery_connections_author;
  invitee: MyConnectionsQuery_connections_invitee;
  status: ConnectionStatus;
  message: string | null;
  created: any;
}

export interface MyConnectionsQuery {
  connections: MyConnectionsQuery_connections[] | null;
}
