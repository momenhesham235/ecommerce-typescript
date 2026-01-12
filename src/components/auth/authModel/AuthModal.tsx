import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { closeAuthModal } from "@store/ui/uiSlice";
import { ROUTES } from "@utils";

const AuthModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authModalOpen, redirectAfterLogin } = useAppSelector(
    (state) => state.ui
  );

  return (
    <Modal
      show={authModalOpen}
      onHide={() => dispatch(closeAuthModal())}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Login Required</Modal.Title>
      </Modal.Header>

      <Modal.Body>You need to be logged in to continue this action. </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={() => {
            dispatch(closeAuthModal());
            navigate(ROUTES.LOGIN, {
              state: {
                redirect: redirectAfterLogin,
              },
            });
          }}
        >
          Login
        </Button>

        <Button variant="secondary" onClick={() => dispatch(closeAuthModal())}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;
