import { type FC } from "react";

type Props = {
  label: string;
};

const HeaderDashboardData: FC<Props> = ({ label }) => {
  return (
    <div className="w-full flex flex-row justify-start items-center">
      <h1 className="w-full text-center text-3xl text-primary-skyblue font-semibold capitalize">
        {label}
      </h1>
    </div>
  );
};

export default HeaderDashboardData;
