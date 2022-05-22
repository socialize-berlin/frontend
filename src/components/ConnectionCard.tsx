import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../context/UserContext";
import { connectionCardData } from "./__generated__/connectionCardData";
import { css } from "styled-components/macro";
import { Button } from "./Button";
import { useEffect } from "react";
import { Trash } from "react-feather";
import { Avatar } from "./Avatar";
import { useResponsive } from "../context/ResponsiveContext";

export const CONNECTION_CARD_FRAGMENT = gql`
  fragment connectionUserData on User {
    id
    firstName
    lastName
    headline
    introduction
  }
  fragment connectionCardData on Connection {
    uuid
    author {
      ...connectionUserData
    }
    invitee {
      ...connectionUserData
    }
    status
    message
    created
  }
`;

const ACCEPT_CONNECTION_INVITE = gql`
  mutation AcceptConnectionInvite($connectionId: ID!) {
    acceptConnectionInvite(connectionId: $connectionId) {
      ok
    }
  }
`;

const DECLINE_CONNECTION_INVITE = gql`
  mutation DeclineConnectionInvite($connectionId: ID!) {
    declineConnectionInvite(connectionId: $connectionId) {
      ok
    }
  }
`;

const CANCEL_CONNECTION_INVITE = gql`
  mutation CancelConnectionInvite($connectionId: ID!) {
    cancelConnectionInvite(connectionId: $connectionId) {
      ok
    }
  }
`;

const REMOVE_CONNECTION = gql`
  mutation RemoveConnection($connectionId: ID!) {
    removeConnection(connectionId: $connectionId) {
      ok
    }
  }
`;

export function ConnectionCard(props: {
  connection: connectionCardData;
  refetch: () => void;
  onConversationOpen: (uuid: string) => void;
}) {
  const { connection } = props;
  const { userProfile } = useAuth();
  const [acceptConnectionInvite, aci] = useMutation(ACCEPT_CONNECTION_INVITE);
  const [declineConnectionInvite, dci] = useMutation(DECLINE_CONNECTION_INVITE);
  const [cancelConnectionInvite, cci] = useMutation(CANCEL_CONNECTION_INVITE);
  const [removeConnection, rc] = useMutation(REMOVE_CONNECTION);
  const { isMobile } = useResponsive();

  useEffect(() => {
    if (aci.data || dci.data || cci.data || rc.data) {
      props.refetch();
    }
  }, [aci.data, dci.data, cci.data, rc.data, props]);

  const isAuthor = connection.author.id === userProfile?.id;
  const isReceiver = !isAuthor;

  const user = isAuthor ? connection.invitee : connection.author;
  const color =
    connection.status === "A"
      ? "#d0cdfb"
      : connection.status === "P"
      ? "#fef0ad"
      : "#fbdada";

  return (
    <div
      css={css`
        position: relative;
        padding: 20px;
        border-radius: 20px;
        /* box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1); */
        border: 1px solid #eee;
        margin-bottom: 30px;
        border-color: ${color};

        &:before {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: ${color};
          opacity: 0.2;
          content: "";
          border-radius: inherit;
        }

        &:last-child {
          margin-bottom: 0;
        }

        h3 {
          margin: 0 0 5px 0;
          font-weight: bold;
        }

        h4 {
          margin: 0;
          font-weight: normal;
        }
      `}
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
          `}
        >
          <h3>
            {user.firstName} {user.lastName}
          </h3>
          <h4>{user.headline}</h4>
        </div>
        <div
          css={
            isMobile &&
            css`
              margin-top: 20px;
            `
          }
        >
          {isAuthor && connection.status === "P" ? (
            <Button
              onClick={() => {
                cancelConnectionInvite({
                  variables: {
                    connectionId: connection.uuid,
                  },
                });
              }}
              look="black"
              isSubmitting={cci.loading}
              size="small"
            >
              Cancel
            </Button>
          ) : isReceiver && connection.status === "P" ? (
            <div>
              <Button
                css={css`
                  margin-right: 10px;
                `}
                look="primary"
                isSubmitting={aci.loading}
                size="small"
                onClick={() => {
                  acceptConnectionInvite({
                    variables: {
                      connectionId: connection.uuid,
                    },
                  });
                }}
              >
                Approve
              </Button>
              <Button
                look="black"
                onClick={() => {
                  declineConnectionInvite({
                    variables: {
                      connectionId: connection.uuid,
                    },
                  });
                }}
                isSubmitting={dci.loading}
                size="small"
              >
                Decline
              </Button>
            </div>
          ) : connection.status === "A" ? (
            <div>
              <Button
                look="primary"
                onClick={() => {
                  props.onConversationOpen(connection.uuid);
                }}
                isSubmitting={rc.loading}
                size="small"
                css={css`
                  margin-right: 10px;
                  vertical-align: middle;
                `}
              >
                Message
              </Button>
              <Button
                look="black"
                onClick={() => {
                  removeConnection({
                    variables: {
                      connectionId: connection.uuid,
                    },
                  });
                }}
                css={css`
                  vertical-align: middle;
                `}
                isSubmitting={rc.loading}
                size="small"
              >
                <Trash size={20} />
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      {connection.status === "P" && (
        <div
          css={css`
            position: relative;
            background: #fff;
            border-radius: 20px;
            padding: 10px 20px;
            margin-top: 20px;
            width: 100%;
            box-sizing: border-box;

            p {
              margin: 0;
            }
          `}
        >
          <p>{connection.message}</p>
        </div>
      )}
    </div>
  );
}
