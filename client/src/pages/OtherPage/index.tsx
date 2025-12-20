import { type FC, type ReactNode } from "react";
import HeaderDashboardData from "../../components/HeaderDashboardData";
import { useQueries } from "@tanstack/react-query";
import { RoomTypeService } from "../../services/roomType.service";
import { FasilitasService } from "../../services/fasilitas.service";
import LoadingBlue from "../../components/LoadingBlue";
import CardLongData from "../../components/CardLongData";
import ButtonAddText from "../../components/ButtonAddText";

const OtherPage: FC = () => {
  // query
  const datas = useQueries({
    queries: [
      // room type
      {
        queryKey: ["roomType"],
        queryFn: () => {
          return RoomTypeService.readAll();
        },
      },

      // fasilitas
      {
        queryKey: ["fasilitas"],
        queryFn: () => {
          return FasilitasService.readAll();
        },
      },
    ],
  });

  // destructure data
  const [dataRoomType, dataFasilitas] = datas;

  // handle delete dummy
  const handleDelete = (id: string) => {
    return console.log(id);
  };

  return (
    <div className="w-full flex flex-col justify-start items-start pt-6 px-4">
      {/* header */}
      <HeaderDashboardData label="other" />

      {/* data room type */}
      <ContainerData
        loading={dataRoomType.isLoading}
        title="room type"
        linkAdd="/dashboard/other/add-room-type"
      >
        {dataRoomType.data?.data && dataRoomType.data?.data.length > 0 ? (
          dataRoomType.data.data.map((item) => (
            <CardLongData
              key={item._id}
              id={item._id}
              label={item.roomType}
              linkUpdate="/"
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-base font-semibold text-black">Tidak ada data</p>
        )}
      </ContainerData>

      {/* data fasilitas */}
      <ContainerData
        loading={dataFasilitas.isLoading}
        title="fasilitas"
        linkAdd="/dashboard/other/add-facility"
      >
        {dataFasilitas.data?.data && dataFasilitas.data?.data.length > 0 ? (
          dataFasilitas.data.data.map((item) => (
            <CardLongData
              key={item._id}
              id={item._id}
              label={item.fasilitas}
              linkUpdate="/"
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-base font-semibold text-black">Tidak ada data</p>
        )}
      </ContainerData>
    </div>
  );
};

// component container data
type ContainerDataProps = {
  children: ReactNode;
  title: string;
  loading: boolean;
  linkAdd: string;
};
const ContainerData: FC<ContainerDataProps> = ({
  children,
  title,
  loading,
  linkAdd,
}) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-4 mt-8">
      <div className="w-full flex flex-row justify-between items-center">
        {/* title */}
        <h2 className="text-lg font-semibold text-black capitalize">{title}</h2>

        {/* navigation add */}
        <ButtonAddText link={linkAdd} />
      </div>

      {/* data */}
      <div className="w-full flex flex-col justify-start items-start gap-2">
        {/* card */}
        {loading ? <LoadingBlue /> : children}
      </div>
    </div>
  );
};

export default OtherPage;
