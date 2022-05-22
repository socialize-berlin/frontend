/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeclineConnectionInvite
// ====================================================

export interface DeclineConnectionInvite_declineConnectionInvite {
  __typename: "DeclineConnectionInvite";
  ok: boolean | null;
}

export interface DeclineConnectionInvite {
  declineConnectionInvite: DeclineConnectionInvite_declineConnectionInvite | null;
}

export interface DeclineConnectionInviteVariables {
  connectionId: string;
}
