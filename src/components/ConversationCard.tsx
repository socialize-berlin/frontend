import { gql } from "@apollo/client";
import { useAuth } from "../context/UserContext";
import { conversationCardData } from "./__generated__/conversationCardData";
import { css } from "styled-components/macro";
import { Avatar } from "./Avatar";

export const CONVERSATION_CARD_FRAGMENT = gql`
  fragment conversationUserData on User {
    id
    firstName
    lastName
    headline
    introduction
  }
  fragment conversationCardData on Conversation {
    uuid
    author {
      ...conversationUserData
    }
    invitee {
      ...conversationUserData
    }
    lastMessage {
      message
      created
    }
    isSeen
    created
  }
`;

export function ConversationCard(props: {
  conversation: conversationCardData;
  refetch: () => void;
  onMessage: () => void;
}) {
  const { conversation } = props;
  const { userProfile } = useAuth();

  const isAuthor = conversation.author.id === userProfile?.id;
  const user = isAuthor ? conversation.invitee : conversation.author;

  return (
    <div
      css={css`
        position: relative;

        h3 {
          margin: 0 0 5px 0;
          font-weight: bold;
        }

        h4 {
          margin: 0;
          font-weight: normal;
        }

        p {
          margin-bottom: 0;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      `}
      onClick={props.onMessage}
    >
      <div
        css={css`
          position: relative;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            margin-right: 20px;
          `}
        >
          <Avatar size={50} user={user} />
        </div>
        <div
          css={css`
            flex: 1 0 10%;
            min-width: 0;
            line-break: anywhere;

            h3 {
              margin: 0;
            }
            p {
              margin-top: 10px;
            }
          `}
        >
          <h3
            css={css`
              position: relative;
              display: inline;
            `}
          >
            {user.firstName} {user.lastName}
            {!conversation.isSeen && (
              <div
                css={css`
                  position: absolute;
                  top: -2px;
                  right: -15px;
                  width: 7px;
                  height: 7px;
                  background: #ff006eff;
                  border-radius: 50%;
                `}
              ></div>
            )}
          </h3>
          <h4
            css={css`
              color: #999;
              font-size: 12px;
            `}
          >
            {user.headline}
          </h4>
          {conversation.lastMessage && (
            <p>{conversation.lastMessage.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
