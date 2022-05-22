/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendConnectionInvite
// ====================================================

export interface SendConnectionInvite_sendConnectionInvite {
  __typename: "SendConnectionInvite";
  ok: boolean | null;
}

export interface SendConnectionInvite {
  sendConnectionInvite: SendConnectionInvite_sendConnectionInvite | null;
}

export interface SendConnectionInviteVariables {
  inviteeId: string;
  message: string;
}
