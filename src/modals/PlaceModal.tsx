import { useAuth } from "../context/UserContext";
import { PlaceForm } from "../forms/PlaceForm";
import { Modal } from "./Modal";

export function PlaceModal(props: { isOpen: boolean; onClose: () => void }) {
  const { userProfile } = useAuth();

  if (!userProfile) return null;

  return (
    <Modal modalIsOpen={props.isOpen} onClose={props.onClose}>
      <h2>Place me on map:</h2>
      <PlaceForm
        initialValues={{
          headline: userProfile.headline,
          introduction: userProfile.introduction,
        }}
        onClose={props.onClose}
      />
    </Modal>
  );
}
