/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CancelConnectionInvite
// ====================================================

export interface CancelConnectionInvite_cancelConnectionInvite {
  __typename: "CancelConnectionInvite";
  ok: boolean | null;
}

export interface CancelConnectionInvite {
  cancelConnectionInvite: CancelConnectionInvite_cancelConnectionInvite | null;
}

export interface CancelConnectionInviteVariables {
  connectionId: string;
}
