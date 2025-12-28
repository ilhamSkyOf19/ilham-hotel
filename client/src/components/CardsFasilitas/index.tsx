import { type FC, type ReactNode } from "react";
import { FaBed } from "react-icons/fa6";
import { FaBath } from "react-icons/fa";
import { FaRegSnowflake } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa";
import { IoTv } from "react-icons/io5";
import { PiCoffeeFill } from "react-icons/pi";
import { CgGym } from "react-icons/cg";
import { MdPool } from "react-icons/md";
import { FaCocktail } from "react-icons/fa";
import { RiBilliardsFill } from "react-icons/ri";
import { FaTshirt } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";
import { FaParking } from "react-icons/fa";

const DATA_FASILITAS = [
  {
    key: "single bed",
    label: "Single Bed",
    icon: FaBed,
  },
  {
    key: "double beds",
    label: "Double Bed",
    icon: FaBed,
  },
  {
    key: "single bath",
    label: "Single Bath",
    icon: FaBath,
  },
  {
    key: "double bath",
    label: "Double Bath",
    icon: FaBath,
  },
  {
    key: "ac",
    label: "AC",
    icon: FaRegSnowflake,
  },
  {
    key: "wifi",
    label: "WiFi",
    icon: FaWifi,
  },
  {
    key: "tv",
    label: "TV",
    icon: IoTv,
  },
  {
    key: "free breakfast",
    label: "Free Breakfast",
    icon: PiCoffeeFill,
  },
  {
    key: "gym",
    label: "Gym",
    icon: CgGym,
  },
  {
    key: "swimming pool",
    label: "Swimming Pool",
    icon: MdPool,
  },
  {
    key: "laundry",
    label: "Laundry",
    icon: FaTshirt,
  },
  {
    key: "bar",
    label: "Bar",
    icon: FaCocktail,
  },
  {
    key: "billiard",
    label: "Billiard",
    icon: RiBilliardsFill,
  },
  {
    key: "parking",
    label: "Parking",
    icon: FaParking,
  },
  {
    key: "restaurant",
    label: "Restaurant",
    icon: FaUtensils,
  },
  {
    key: "security",
    label: "Security",
    icon: FaShieldAlt,
  },
];

type Props = {
  fasilitas: string[];
};

const CardsFasilitas: FC<Props> = ({ fasilitas }) => {
  return (
    <div className="w-full flex flex-row justify-start items-start gap-5 flex-wrap">
      {/* single bed */}
      {DATA_FASILITAS.filter((item) => fasilitas.includes(item.key)).map(
        (item, index) => (
          <ContainerCardFasilitas
            key={index}
            label={item.label}
            icon={<item.icon className="text-2xl text-primary-skyblue" />}
          />
        )
      )}
    </div>
  );
};

// container card fasilitas
type ContainerCardFasilitasProps = {
  icon: ReactNode;
  label: string;
};
const ContainerCardFasilitas: FC<ContainerCardFasilitasProps> = ({
  icon,
  label,
}) => {
  return (
    <div className="flex flex-row justify-start items-center gap-2">
      {/* icon */}

      {icon}

      {/* label */}
      <p className="text-sm text-black">{label}</p>
    </div>
  );
};

export default CardsFasilitas;
