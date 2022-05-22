/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveConnection
// ====================================================

export interface RemoveConnection_removeConnection {
  __typename: "RemoveConnection";
  ok: boolean | null;
}

export interface RemoveConnection {
  removeConnection: RemoveConnection_removeConnection | null;
}

export interface RemoveConnectionVariables {
  connectionId: string;
}
