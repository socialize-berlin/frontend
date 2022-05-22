/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: conversationCardData
// ====================================================

export interface conversationCardData_author {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  introduction: string;
}

export interface conversationCardData_invitee {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  introduction: string;
}

export interface conversationCardData_lastMessage {
  __typename: "ConversationMessage";
  message: string;
  created: any;
}

export interface conversationCardData {
  __typename: "Conversation";
  uuid: any;
  author: conversationCardData_author;
  invitee: conversationCardData_invitee;
  lastMessage: conversationCardData_lastMessage | null;
  isSeen: boolean | null;
  created: any;
}
