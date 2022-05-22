import { Button } from "../components/Button";
import { Modal } from "./Modal";
import { css } from "styled-components/macro";

export function AboutUsModal(props: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal modalIsOpen={props.isOpen} onClose={props.onClose}>
      <h2>About the Project</h2>

      <p>
        With this project we wanted to promote "Walk & Talk" culture and connect
        people by interests. It's up for you if you want to use it for
        connecting with professionals in the industry or just meet new people
        for a coffee and a nice conversation.
      </p>
      <p>
        Let's disconnect from online world - and <strong>socialize! 🚶‍♀️</strong>
      </p>
      <Button
        css={css`
          margin-top: 20px;
        `}
        onClick={props.onClose}
      >
        Close
      </Button>
    </Modal>
  );
}
