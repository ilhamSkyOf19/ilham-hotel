import { useState, type FC, type ReactNode } from "react";
import HeaderDashboardData from "../../components/HeaderDashboardData";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { RoomTypeService } from "../../services/roomType.service";
import { FasilitasService } from "../../services/fasilitas.service";
import LoadingBlue from "../../components/LoadingBlue";
import CardLongData from "../../components/CardLongData";
import ButtonAddText from "../../components/ButtonAddText";
import ModalComponent from "../../components/ModalComponent";
import ContentModalDelete from "../../components/ContentModalDelete";

const OtherPage: FC = () => {
  // inisialisi query client
  const queryClient = useQueryClient();
  // state modal active
  const [modalActive, setModalActive] = useState<{
    id: string;
    type: "fasilitas" | "roomType" | "none";
    active: boolean;
  }>({
    id: "",
    type: "none",
    active: false,
  });

  // handle close modal
  const handleModalClose = () => {
    setModalActive({
      id: "",
      type: "none",
      active: false,
    });
  };

  // handle active modal
  const handleModalActive = (
    type: "fasilitas" | "roomType" | "none",
    id: string
  ) => {
    setModalActive({
      id: id,
      type: type,
      active: true,
    });
  };

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

  // use mutation for delete room type
  const deleteRoomTypeMutation = useMutation({
    mutationFn: RoomTypeService.deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roomType"] });
      handleModalClose();
    },
  });

  // use mutation for delete fasilitas

  const deleteFasilitasMutation = useMutation({
    mutationFn: FasilitasService.deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fasilitas"] });
      handleModalClose();
    },
  });

  // handle delete
  const handleDelete = async (id: string) => {
    try {
      // room type
      if (modalActive.type === "roomType") {
        await deleteRoomTypeMutation.mutateAsync(id);
      }

      // fasilitas
      if (modalActive.type === "fasilitas") {
        await deleteFasilitasMutation.mutateAsync(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // destructure data
  const [dataRoomType, dataFasilitas] = datas;

  return (
    <div className="w-full flex flex-col justify-start items-start pt-6 px-4 relative">
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
              linkUpdate={`/dashboard/other/update-room-type`}
              handleDelete={() => handleModalActive("roomType", item._id)}
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
              linkUpdate="/dashboard/other/update-facility"
              handleDelete={() => handleModalActive("fasilitas", item._id)}
            />
          ))
        ) : (
          <p className="text-base font-semibold text-black">Tidak ada data</p>
        )}
      </ContainerData>

      {/* modal delete */}
      <ModalComponent
        active={modalActive.active}
        handleClose={() => handleModalClose()}
      >
        <ContentModalDelete
          handleClose={() => handleModalClose()}
          handleDelete={() => handleDelete(modalActive.id)}
          loading={
            modalActive.type === "roomType"
              ? deleteRoomTypeMutation.isPending
              : deleteFasilitasMutation.isPending
          }
        />
      </ModalComponent>
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
