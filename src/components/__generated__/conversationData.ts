/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: conversationData
// ====================================================

export interface conversationData_messages_author {
  __typename: "User";
  id: string;
  firstName: string;
}

export interface conversationData_messages {
  __typename: "ConversationMessage";
  author: conversationData_messages_author;
  message: string;
  created: any;
  isSeen: boolean;
}

export interface conversationData {
  __typename: "Conversation";
  uuid: any;
  messages: conversationData_messages[] | null;
  created: any;
}
