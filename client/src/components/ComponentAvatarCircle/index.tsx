import { type FC } from "react";
import user from "../../assets/people/user.webp";
import iconNew from "../../assets/icons/new.webp";
import verified from "../../assets/icons/verified.webp";
import star from "../../assets/icons/star.webp";

type Props = {
  img: string;
  title: "BEGINNER" | "REGULAR" | "VERIFIED";
};

const ComponentAvatarCircle: FC<Props> = ({ img, title }) => {
  return (
    <div className="w-11 h-11 flex flex-row justify-center items-center relative">
      {/* label title */}
      <div className="w-5 h-5 rounded-full absolute -top-1 -right-1 overflow-hidden">
        <img
          src={
            title === "BEGINNER"
              ? iconNew
              : title === "REGULAR"
              ? star
              : verified
          }
          alt="icon new"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
        <img
          src={img === "default.png" ? user : img}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ComponentAvatarCircle;
