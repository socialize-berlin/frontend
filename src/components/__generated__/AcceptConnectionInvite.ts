/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AcceptConnectionInvite
// ====================================================

export interface AcceptConnectionInvite_acceptConnectionInvite {
  __typename: "AcceptConnectionInvite";
  ok: boolean | null;
}

export interface AcceptConnectionInvite {
  acceptConnectionInvite: AcceptConnectionInvite_acceptConnectionInvite | null;
}

export interface AcceptConnectionInviteVariables {
  connectionId: string;
}
