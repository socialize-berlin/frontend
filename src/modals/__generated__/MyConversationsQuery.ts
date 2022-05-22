/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyConversationsQuery
// ====================================================

export interface MyConversationsQuery_conversations_author {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  introduction: string;
}

export interface MyConversationsQuery_conversations_invitee {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  introduction: string;
}

export interface MyConversationsQuery_conversations_lastMessage {
  __typename: "ConversationMessage";
  message: string;
  created: any;
}

export interface MyConversationsQuery_conversations {
  __typename: "Conversation";
  uuid: any;
  author: MyConversationsQuery_conversations_author;
  invitee: MyConversationsQuery_conversations_invitee;
  lastMessage: MyConversationsQuery_conversations_lastMessage | null;
  isSeen: boolean | null;
  created: any;
}

export interface MyConversationsQuery {
  conversations: MyConversationsQuery_conversations[] | null;
}
