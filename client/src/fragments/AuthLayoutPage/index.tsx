import { type FC, type ReactNode } from "react";
import HeaderAuth from "../../components/HeaderAuth";
import { Link } from "react-router";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  type: "login" | "register";
};
const AuthLayoutPage: FC<Props> = ({ children, type }) => {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-start items-start">
      {/* header */}
      <HeaderAuth type="login" />

      {/* content input */}
      <div className="w-full flex flex-col justify-start items-center pb-10 pt-75">
        {/* from */}

        {children}

        {/* forgot password */}
        {type === "login" && (
          <div className="w-[85vw] flex flex-row justify-end items-center mt-3">
            <Link
              to="/forget-password"
              className="text-primary-skyblue text-sm font-medium"
            >
              Forgot Password?
            </Link>
          </div>
        )}
        {/* route login */}
        <div
          className={clsx(
            "w-[85vw] flex flex-row justify-between items-center",
            type === "login" ? "mt-4" : "mt-6"
          )}
        >
          <p className="text-black text-sm font-semibold">
            {type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <Link
            to={type === "login" ? "/register" : "/login"}
            className="text-primary-skyblue text-sm font-medium"
          >
            {type === "login" ? "Sign Up" : "Sign In"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutPage;
