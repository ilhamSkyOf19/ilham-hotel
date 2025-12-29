import { type FC, type ReactNode } from "react";
import Modal from "react-modal";

type Props = {
  children: ReactNode;
  active: boolean;
  handleClose: () => void;
  bgTransparent?: boolean;
  fullWidth?: boolean;
};
const ModalComponent: FC<Props> = ({
  children,
  active,
  handleClose,
  bgTransparent,
  fullWidth,
}) => {
  return (
    <Modal
      isOpen={active}
      onRequestClose={handleClose}
      bodyOpenClassName="modal-open"
      appElement={document.getElementById("root")!}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: 9999, // pastikan lebih tinggi dari elemen lain
          display: "flex",
          justifyContent: "center", // horizontal center
          alignItems: "center", // vertical center
        },
        content: {
          position: "relative",
          inset: "unset",
          width: fullWidth ? "auto" : "85%",
          maxHeight: "90%",
          height: "auto",
          borderRadius: "20px",
          border: "none",
          backgroundColor: bgTransparent ? "transparent" : "white",
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
