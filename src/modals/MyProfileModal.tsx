import { useAuth } from "../context/UserContext";
import { MyProfileForm } from "../forms/MyProfileForm";
import { Modal } from "./Modal";

export function MyProfileModal(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { userProfile } = useAuth();

  if (!userProfile) return null;

  return (
    <Modal modalIsOpen={props.isOpen} onClose={props.onClose}>
      <h2>My Profile:</h2>
      <MyProfileForm
        initialValues={{
          first_name: userProfile.firstName,
          last_name: userProfile.lastName,
          headline: userProfile.headline,
          introduction: userProfile.introduction,
        }}
        onClose={props.onClose}
      />
    </Modal>
  );
}
