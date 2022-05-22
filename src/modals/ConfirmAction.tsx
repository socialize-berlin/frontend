import { Button } from "../components/Button";
import { Modal } from "./Modal";
import { css } from "styled-components/macro";
import { useState } from "react";

export function ConfirmActionModal(props: {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  action: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal modalIsOpen={props.isOpen} onClose={props.onClose}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
      <div
        css={css`
          position: relative;
          margin-top: 40px;
        `}
      >
        <Button
          isSubmitting={isLoading}
          type="button"
          onClick={async () => {
            try {
              setIsLoading(true);
              await props.action();
              props.onClose();
            } finally {
              setIsLoading(false);
            }
          }}
        >
          Confirm
        </Button>
        <Button
          css={css`
            margin-left: 20px;
          `}
          look="blank"
          type="button"
          onClick={props.onClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
