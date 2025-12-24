import { type FC } from "react";
import ButtonDeleteText from "../ButtonDeleteText";
import ButtonCloseText from "../ButtonCloseText";
import loadingIcon from "../../assets/animation/loading-blue.svg";

type Props = {
  handleDelete: () => void;
  handleClose: () => void;
  loading?: boolean;
};

const ContentModalDelete: FC<Props> = ({
  handleDelete,
  handleClose,
  loading,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      {/* title */}
      <h1 className="w-full text-black text-2xl font-bold text-center">
        Hapus Data
      </h1>
      {/* description */}
      <p className="w-full text-black text-base font-semibold text-center mt-4">
        Apakah yakin ingin menghapus data?
      </p>

      {/* action */}
      <div className="w-full flex flex-row justify-evenly items-center mt-4">
        {/* button close */}
        <div className="flex-1 flex flex-row justify-center items-center">
          <ButtonCloseText handleClose={() => handleClose()} />
        </div>

        {/* button delete */}

        <div className="flex-1 flex flex-row justify-center items-center">
          {loading ? (
            <img src={loadingIcon} alt="loading blue" className="w-7" />
          ) : (
            <ButtonDeleteText handleDelete={() => handleDelete()} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentModalDelete;
