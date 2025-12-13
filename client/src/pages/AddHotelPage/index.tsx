import { type FC } from "react";
import HeaderInputPage from "../../components/HeaderInputPage";
import BoxInputAbstrakText from "../../components/BoxInputAbstrakText";

const AddHotelPage: FC = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-start items-center pt-6 p-4">
      {/* header */}
      <HeaderInputPage label="Add Hotel" />

      {/* content input */}
      <form className="w-full flex flex-col justify-start items-start mt-8 gap-4">
        <BoxInputAbstrakText />
      </form>
    </div>
  );
};

export default AddHotelPage;
