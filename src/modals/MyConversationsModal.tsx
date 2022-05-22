import { gql, useQuery } from "@apollo/client";
import {
  ConversationCard,
  CONVERSATION_CARD_FRAGMENT,
} from "../components/ConversationCard";
import { Modal } from "./Modal";
import { MyConversationsQuery } from "./__generated__/MyConversationsQuery";
import { useEffect, useState } from "react";
import { ConversationContainer } from "../components/ConversationContainer";
import { css } from "styled-components/macro";
import { Message } from "../components/Message";
import { useResponsive } from "../context/ResponsiveContext";
import { customStyles } from "../components/HomepageFilters";
import Select from "react-select";
import { useAuth } from "../context/UserContext";

const MY_CONVERSATIONS_QUERY = gql`
  query MyConversationsQuery {
    conversations {
      ...conversationCardData
    }
  }
  ${CONVERSATION_CARD_FRAGMENT}
`;

export function MyConversationsModal(props: {
  isOpen: boolean;
  onClose: () => void;
  conversationUUID: string | null;
}) {
  const [conversationId, setConversationId] = useState<string | null>(
    props.conversationUUID
  );
  const { loading, data, refetch } = useQuery<MyConversationsQuery>(
    MY_CONVERSATIONS_QUERY
  );
  const { isMobile } = useResponsive();
  const { userProfile } = useAuth();

  useEffect(() => {
    if (
      !conversationId &&
      data &&
      data.conversations &&
      data.conversations.length > 0
    ) {
      setConversationId(data.conversations[0].uuid);
    }
  }, [data, conversationId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const conversations = data && data.conversations ? data.conversations : [];

  return (
    <Modal
      id={"my-conversations-modal"}
      contentStyles={{
        maxWidth: "1000px",
        height: isMobile ? "100vh" : "80vh",
        maxHeight: "calc(100vh - 40px)",
      }}
      modalIsOpen={props.isOpen}
      onClose={props.onClose}
      noInnerPadding={isMobile}
    >
      {loading ? null : (
        <div>
          <div
            css={css`
              position: relative;
              display: flex;
              flex-flow: row wrap;
              height: calc(80vh - 112px);

              ${isMobile &&
              css`
                height: calc(100vh - 80px);
                flex-direction: column;
              `}
            `}
          >
            <div
              css={css`
                flex: 0 0 360px;
                margin-right: 40px;
                border-right: 1px solid #eee;
                padding-right: 40px;
                box-sizing: border-box;

                ${isMobile &&
                css`
                  flex: 0 0 auto;
                  border-right: none;
                  border-bottom: 1px solid #eee;
                  padding-right: 0;
                  margin-right: 0;
                  width: 100%;
                  padding-bottom: 20px;
                  margin-bottom: 20px;
                `}
              `}
            >
              <div
                css={css`
                  padding-bottom: 20px;
                  display: flex;
                  align-items: center;

                  h3 {
                    font-weight: bold;
                  }
                `}
              >
                <div
                  css={css`
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    margin-right: 10px;
                    text-align: center;
                    background: #522e7c;
                    color: #fff;
                    border-radius: 50%;
                  `}
                >
                  {conversations.length}
                </div>
                <h3>Conversations: </h3>
              </div>
              {conversations.length === 0 && (
                <Message message="You have no conversations yet" />
              )}
              {!isMobile &&
                conversations.map((conversation) => (
                  <div
                    key={conversation.uuid}
                    css={css`
                      padding: 15px;
                      border-radius: 10px;
                      background: ${conversation.uuid === conversationId
                        ? "#f5f5fe"
                        : "none"};
                      margin-bottom: 2px;

                      &:last-child {
                        border-bottom: none;
                      }

                      &:hover {
                        background: #f5f5fe;
                        cursor: pointer;
                      }
                    `}
                  >
                    <ConversationCard
                      conversation={conversation}
                      refetch={refetch}
                      onMessage={() => {
                        setConversationId(conversation.uuid);
                      }}
                    />
                  </div>
                ))}
              {isMobile && (
                <Select
                  placeholder={"Conversation"}
                  styles={customStyles}
                  value={conversationId}
                  onChange={(value: any) => {
                    if (value) {
                      setConversationId(value.value);
                    }
                  }}
                  options={[
                    {
                      label: "Select Conversation",
                      value: "",
                    },
                    ...conversations.map((conversation) => {
                      const isAuthor =
                        conversation.author.id === userProfile?.id;
                      const user = isAuthor
                        ? conversation.invitee
                        : conversation.author;

                      return {
                        value: conversation.uuid,
                        label: `${user.firstName} ${user.lastName}`,
                      };
                    }),
                  ]}
                />
              )}
            </div>
            <div
              css={css`
                flex: 1 0 10%;
                height: 100%;
                min-height: 0;
              `}
            >
              {conversationId && (
                <ConversationContainer uuid={conversationId} />
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
