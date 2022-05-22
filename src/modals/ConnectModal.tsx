import { mapUserData } from "../components/__generated__/mapUserData";
import { useAuth } from "../context/UserContext";
import { ConnectForm } from "../forms/ConnectForm";
import { Modal } from "./Modal";

export function ConnectModal(props: {
  isOpen: boolean;
  onClose: () => void;
  onConnect?: () => void;
  user: mapUserData;
}) {
  const { userProfile } = useAuth();

  if (!userProfile) return null;

  return (
    <Modal modalIsOpen={props.isOpen} onClose={props.onClose}>
      <h2>Connect with {props.user.firstName}:</h2>
      <ConnectForm
        user={props.user}
        onClose={props.onClose}
        onConnect={props.onConnect}
      />
    </Modal>
  );
}
