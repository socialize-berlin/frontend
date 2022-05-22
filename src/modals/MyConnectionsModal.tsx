import { gql, useQuery } from "@apollo/client";
import {
  ConnectionCard,
  CONNECTION_CARD_FRAGMENT,
} from "../components/ConnectionCard";
import { Modal } from "./Modal";
import { MyConnectionsQuery } from "./__generated__/MyConnectionsQuery";
import { css } from "styled-components/macro";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";

const MY_CONNECTIONS_QUERY = gql`
  query MyConnectionsQuery {
    connections {
      ...connectionCardData
    }
  }
  ${CONNECTION_CARD_FRAGMENT}
`;

function ConnectionList(props: {
  connections: MyConnectionsQuery["connections"];
  refetch: () => void;
  onConversationOpen: (uuid: string) => void;
}) {
  const connections = props.connections ? props.connections : [];

  if (!connections.length) {
    return null;
  }

  return (
    <div>
      {connections.map((connection) => (
        <ConnectionCard
          key={connection.uuid}
          connection={connection}
          refetch={props.refetch}
          onConversationOpen={props.onConversationOpen}
        />
      ))}
    </div>
  );
}

export function MyConnectionsModal(props: {
  isOpen: boolean;
  onClose: () => void;
  onConversationOpen: (uuid: string) => void;
}) {
  const { loading, data, refetch } =
    useQuery<MyConnectionsQuery>(MY_CONNECTIONS_QUERY);

  const [type, setType] = useState<string>("P");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const connections = data && data.connections ? data.connections : [];
  const filteredConnections = connections.filter(
    (connection) => connection && connection.status === type
  );

  const filters = [
    {
      label: "Pending",
      value: "P",
    },

    {
      label: "Approved",
      value: "A",
    },
    {
      label: "Declined",
      value: "R",
    },
  ];

  return (
    <Modal
      id="my-connections-modal"
      modalIsOpen={props.isOpen}
      onClose={props.onClose}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2>My Connections:</h2>

          <ul
            css={css`
              list-style: none;
              margin: 0;
              padding: 0;
              margin-bottom: 40px;
              display: flex;
              flex-flow: row wrap;
              align-items: center;

              li {
                margin-right: 20px;
              }
            `}
          >
            {filters.map((filter) => {
              return (
                <li key={filter.value}>
                  <button
                    css={css`
                      background: transparent;
                      border: none;
                      padding: 0 0 10px 0;
                      font-size: 16px;
                      border-bottom: 2px solid white;

                      ${filter.value === type &&
                      css`
                        border-bottom: 2px solid #522e7c;
                        font-weight: bold;
                      `}
                    `}
                    onClick={() => setType(filter.value)}
                  >
                    {filter.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div>
            {filteredConnections.length ? (
              <ConnectionList
                connections={filteredConnections}
                refetch={refetch}
                onConversationOpen={props.onConversationOpen}
              />
            ) : (
              <Message message="No connections" />
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
