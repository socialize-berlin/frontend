import { Modal } from "./Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function ThanksForVoting() {
  const location = useLocation();
  const navigate = useNavigate();
  const isOpen = location.hash === "#thank-you-for-voting";

  return (
    <Modal
      modalIsOpen={isOpen}
      onClose={() => {
        navigate("/");
      }}
    >
      <h2>Thank you for voting! 🎉</h2>
      <p>
        Survey results will be used to prioritize our roadmap.
        <br /> You can now close this window and continue to the homepage.
      </p>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Close
      </Button>
    </Modal>
  );
}
