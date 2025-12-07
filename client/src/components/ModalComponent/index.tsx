import { type FC, type ReactNode } from "react";
import Modal from "react-modal";

type Props = {
  children: ReactNode;
  active: boolean;
  handleClose: () => void;
};
const ModalComponent: FC<Props> = ({ children, active, handleClose }) => {
  return (
    <Modal
      isOpen={active}
      onRequestClose={handleClose}
      appElement={document.getElementById("root")!}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 9999, // pastikan lebih tinggi dari elemen lain
          display: "flex",
          justifyContent: "center", // horizontal center
          alignItems: "center", // vertical center
        },
        content: {
          position: "relative",
          inset: "unset",
          width: "85%",
          maxHeight: "90%",
          height: "auto",
          borderRadius: "20px",
          backgroundColor: "white",
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
