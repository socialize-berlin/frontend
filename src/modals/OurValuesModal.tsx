import { Button } from "../components/Button";
import { Modal } from "./Modal";
import { css } from "styled-components/macro";

export function OurValuesModal(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal modalIsOpen={props.isOpen} onClose={props.onClose}>
      <h2>Our Values</h2>
      <ul className="list">
        <li>
          <div className="icon">🔐</div>
          <strong>We care about your data.</strong> The app requires mimum
          information from the user and at any point of time it can be deleted.
        </li>
        <li>
          <div className="icon">🍪</div>
          <strong>We won't give you cookies.</strong> We respect user right to
          privacy and don't use any third-party tools that can compromise it.
        </li>
        <li>
          <div className="icon">🌎</div>
          <strong>We make it accessible.</strong> We make sure that the app is
          as easy to use as possible. We also make sure that it is accessible to
          everyone.
        </li>
      </ul>
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
