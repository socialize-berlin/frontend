/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendMessage
// ====================================================

export interface SendMessage_sendMessage {
  __typename: "SendMessage";
  ok: boolean | null;
}

export interface SendMessage {
  sendMessage: SendMessage_sendMessage | null;
}

export interface SendMessageVariables {
  name: string;
  email: string;
  message: string;
}
