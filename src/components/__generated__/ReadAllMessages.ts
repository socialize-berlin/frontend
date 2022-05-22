/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReadAllMessages
// ====================================================

export interface ReadAllMessages_readAllMessages {
  __typename: "ReadAllMessages";
  ok: boolean | null;
}

export interface ReadAllMessages {
  readAllMessages: ReadAllMessages_readAllMessages | null;
}

export interface ReadAllMessagesVariables {
  connectionId: string;
}
