import { ContactUsForm } from "../forms/ContactUsForm";
import { Modal } from "./Modal";

export function ContactUsModal(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal modalIsOpen={props.isOpen} onClose={props.onClose}>
      <h2>Send us a message:</h2>
      <ContactUsForm onSubmit={async () => {}} />
    </Modal>
  );
}
