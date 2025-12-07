import { type FC } from "react";

type Props = {
  label: string;
  link: string;
};
const TitleSeAll: FC<Props> = ({ label, link }) => {
  return (
    <div className="w-[90vw] flex flex-row justify-between items-center">
      <h1 className="text-lg font-medium text-black">{label}</h1>
      <a href={link} className="text-primary-skyblue text-base">
        See all
      </a>
    </div>
  );
};

export default TitleSeAll;
