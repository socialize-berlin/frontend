/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ConversationQuery
// ====================================================

export interface ConversationQuery_conversation_messages_author {
  __typename: "User";
  id: string;
  firstName: string;
}

export interface ConversationQuery_conversation_messages {
  __typename: "ConversationMessage";
  author: ConversationQuery_conversation_messages_author;
  message: string;
  created: any;
  isSeen: boolean;
}

export interface ConversationQuery_conversation {
  __typename: "Conversation";
  uuid: any;
  messages: ConversationQuery_conversation_messages[] | null;
  created: any;
}

export interface ConversationQuery {
  conversation: ConversationQuery_conversation;
}

export interface ConversationQueryVariables {
  uuid: string;
}
