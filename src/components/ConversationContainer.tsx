import { gql, useApolloClient, useQuery } from "@apollo/client";
import { ConversationQuery } from "../modals/__generated__/ConversationQuery";
import { Loader } from "./Loader";
import { Conversation, CONVERSATION_FRAGMENT } from "./Conversation";
import { useEffect } from "react";
import { useAuth } from "../context/UserContext";

const CONVERSATION_QUERY = gql`
  query ConversationQuery($uuid: ID!) {
    conversation(uuid: $uuid) {
      ...conversationData
    }
  }
  ${CONVERSATION_FRAGMENT}
`;

const READ_ALL_MESSAGES = gql`
  mutation ReadAllMessages($connectionId: ID!) {
    readAllMessages(connectionId: $connectionId) {
      ok
    }
  }
`;

export function ConversationContainer(props: { uuid: string }) {
  const client = useApolloClient();
  const { refetch: fetchUserProfile } = useAuth();
  const { loading, data, refetch } = useQuery<ConversationQuery>(
    CONVERSATION_QUERY,
    {
      variables: { uuid: props.uuid },
    }
  );

  useEffect(() => {
    const readAllMessages = async () => {
      try {
        await client.mutate({
          mutation: READ_ALL_MESSAGES,
          variables: { connectionId: props.uuid },
        });

        await fetchUserProfile();
      } catch (e) {
        console.error(e);
      }
    };

    if (data) {
      readAllMessages();
    }
  }, [client, data, fetchUserProfile, props.uuid]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <Loader />;
  }

  if (data) {
    return <Conversation conversation={data.conversation} refetch={refetch} />;
  }

  return null;
}
