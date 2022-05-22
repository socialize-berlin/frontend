/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendConversationMessage
// ====================================================

export interface SendConversationMessage_sendConversationMessage {
  __typename: "SendConversationMessage";
  ok: boolean | null;
}

export interface SendConversationMessage {
  sendConversationMessage: SendConversationMessage_sendConversationMessage | null;
}

export interface SendConversationMessageVariables {
  connectionId: string;
  message: string;
}
