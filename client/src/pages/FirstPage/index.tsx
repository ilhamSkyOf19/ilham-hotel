import { type FC } from "react";
import thumb1 from "../../assets/thumb/thumb-auth-2.webp";

const FirstPage: FC = () => {
  return (
    <div className="w-screen h-screen relative">
      {/* thumbnail */}
      <img
        src={thumb1}
        alt="thumbnail"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default FirstPage;
