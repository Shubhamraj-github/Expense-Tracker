import { Modal, Fade, Box, Backdrop } from "@mui/material";
import classes from "./LoginModal.module.scss";

const AuthModal = ({ open, handleClose, content }) => {
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      disableEscapeKeyDown={true}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>
        <Box className={`${classes.modalBox}`}>{content}</Box>
      </Fade>
    </Modal>
  );
};

export default AuthModal;
