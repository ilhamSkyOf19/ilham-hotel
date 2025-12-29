import { type FC } from "react";
import ModalComponent from "../ModalComponent";
import { generateUrlImg } from "../../utils/util";

type Props = {
  active: boolean;
  handleClose: () => void;
  img: string;
};
const ModalImage: FC<Props> = ({ active, handleClose, img }) => {
  return (
    <ModalComponent
      active={active}
      handleClose={() => handleClose()}
      bgTransparent={true}
      fullWidth={true}
    >
      <img
        src={generateUrlImg({ path: "galleries", img: img })}
        alt="image gallery"
        className="object-cover"
        loading="lazy"
      />
    </ModalComponent>
  );
};

export default ModalImage;
