import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../context/UserContext";
import { SendMessageForm } from "../forms/SendMessageForm";
import {
  conversationData,
  conversationData_messages,
  conversationData_messages_author,
} from "./__generated__/conversationData";
import reverse from "lodash/reverse";
import { css } from "styled-components/macro";
import { useEffect, useRef } from "react";
import { DateTime, Interval } from "luxon";
import humanizeDuration from "humanize-duration";
import { useResponsive } from "../context/ResponsiveContext";

export const CONVERSATION_FRAGMENT = gql`
  fragment conversationData on Conversation {
    uuid
    messages {
      author {
        id
        firstName
      }
      message
      created
      isSeen
    }
    created
  }
`;

const SEND_CONVERSATIONMESSAGE = gql`
  mutation SendConversationMessage($connectionId: ID!, $message: String!) {
    sendConversationMessage(connectionId: $connectionId, message: $message) {
      ok
    }
  }
`;

type GroupedMessage = {
  author: conversationData_messages_author;
  messages: string[];
  created: any;
  isSeen: boolean;
};

function getGroupedMessage(
  messages: conversationData_messages[]
): GroupedMessage[] {
  return reverse(messages).reduce((acc: GroupedMessage[], message) => {
    const last = acc[acc.length - 1];

    if (last && last.author.id === message.author.id) {
      last.messages.push(message.message);
      last.created = message.created;
      last.isSeen = message.isSeen;
    } else {
      acc.push({
        author: message.author,
        messages: [message.message],
        created: message.created,
        isSeen: message.isSeen,
      });
    }

    return acc;
  }, []);
}

export function Conversation(props: {
  conversation: conversationData;
  refetch: () => void;
}) {
  const [sendConversationMessage] = useMutation(SEND_CONVERSATIONMESSAGE);
  const messagesRef = useRef<HTMLDivElement>(null);
  const { userProfile } = useAuth();
  const messages =
    props.conversation && props.conversation.messages
      ? [...props.conversation.messages]
      : [];

  const { isMobile } = useResponsive();

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [props.conversation.uuid]);

  if (!userProfile) return null;

  const groupedMessages = getGroupedMessage(messages);

  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 50px;
        box-sizing: border-box;

        ${isMobile &&
        css`
          padding-top: 0;
        `}
      `}
    >
      <div
        ref={messagesRef}
        css={css`
          flex: 1 0 10%;
          overflow: scroll;

          ::-webkit-scrollbar {
            width: 20px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #522e7c;
            border-radius: 20px;
            border: 6px solid transparent;
            background-clip: content-box;
          }
          ::-webkit-scrollbar-track {
            display: none;
          }
        `}
      >
        {groupedMessages.map((message) => {
          const interval = Interval.fromDateTimes(
            DateTime.fromISO(message.created),
            DateTime.now()
          );
          const duration = interval.toDuration().valueOf();

          return (
            <div
              css={css`
                position: relative;
                margin-bottom: 20px;
              `}
            >
              <h4
                css={css`
                  margin-bottom: 5px;
                `}
              >
                {message.author.id === userProfile.id
                  ? "You"
                  : message.author.firstName}
              </h4>
              <div
                css={css`
                  p {
                    margin: 0px;
                  }
                `}
              >
                {message.messages.map((message, index) => (
                  <p key={`message--${index}`}>{message}</p>
                ))}
              </div>
              <div
                css={css`
                  position: absolute;
                  top: 0;
                  right: 20px;

                  h5 {
                    margin: 0;
                    color: #ccc;
                    font-weight: normal;
                  }
                `}
              >
                <h5>
                  {humanizeDuration(duration, {
                    largest: 2,
                    units: ["y", "mo", "w", "d", "h", "m"],
                    round: true,
                  })}
                </h5>
              </div>
            </div>
          );
        })}
      </div>
      <div
        css={css`
          flex: 0 0 auto;
          margin-top: 20px;
        `}
      >
        <SendMessageForm
          onSubmit={async (values) => {
            await sendConversationMessage({
              variables: {
                connectionId: props.conversation.uuid,
                message: values.message,
              },
            });

            await props.refetch();

            if (messagesRef.current) {
              messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
            }
          }}
        />
      </div>
    </div>
  );
}
