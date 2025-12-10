import { type FC, type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { RiHome6Fill } from "react-icons/ri";
import { MdHistory } from "react-icons/md";
import { FaBed } from "react-icons/fa6";
import { MdOutlineFavorite } from "react-icons/md";
import { HiUser } from "react-icons/hi2";
import clsx from "clsx";

const BottomNavigation: FC = () => {
  // use location
  const location = useLocation();

  // root segment
  const rootSegment = location.pathname.split("/")[1] || "";

  // route navigation
  const routeNavigation: { link: string; label: string }[] = [
    { link: "/", label: "Home" },
    { link: "/history", label: "History" },
    { link: "/room", label: "Room" },
    { link: "/favorite", label: "Favorite" },
    { link: "/user", label: "User" },
  ];

  return (
    <div className="w-full fixed bottom-0 h-18 bg-white shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] z-40 rounded-t-3xl px-4 flex flex-row justify-center items-center gap-2">
      {/* router navigation */}
      {routeNavigation.map((item, index) => (
        <ButtonNavigation
          key={index}
          link={item.link}
          label={item.label}
          active={
            rootSegment === ""
              ? item.link === "/"
              : rootSegment === item.link.split("/")[1]
          }
        />
      ))}
    </div>
  );
};

// button navigation
type PropsButtonNavigation = {
  link: string;
  label: string;
  active: boolean;
};
const ButtonNavigation: FC<PropsButtonNavigation> = ({
  link,
  label,
  active,
}) => {
  return (
    <Link to={link} className="flex flex-col justify-start items-center  p-3">
      {/* children */}
      {link === "/" ? (
        <RiHome6Fill
          className={clsx(
            "text-2xl transition-colors duration-200 ease-in-out",
            active ? "text-primary-skyblue" : "text-gray-600/50"
          )}
        />
      ) : link === "/history" ? (
        <MdHistory
          className={clsx(
            "text-2xl transition-colors duration-200 ease-in-out",
            active ? "text-primary-skyblue" : "text-gray-600/50"
          )}
        />
      ) : link === "/room" ? (
        <FaBed
          className={clsx(
            "text-2xl transition-colors duration-200 ease-in-out",
            active ? "text-primary-skyblue" : "text-gray-600/50"
          )}
        />
      ) : link === "/favorite" ? (
        <MdOutlineFavorite
          className={clsx(
            "text-2xl transition-colors duration-200 ease-in-out",
            active ? "text-primary-skyblue" : "text-gray-600/50"
          )}
        />
      ) : (
        link === "/user" && (
          <HiUser
            className={clsx(
              "text-2xl transition-colors duration-200 ease-in-out",
              active ? "text-primary-skyblue" : "text-gray-600/50"
            )}
          />
        )
      )}

      {/* label */}
      <p
        className={clsx(
          "text-xs font-medium transition-colors duration-200 ease-in-out",
          active ? "text-primary-skyblue" : "text-gray-600/50"
        )}
      >
        {label}
      </p>
    </Link>
  );
};

export default BottomNavigation;
