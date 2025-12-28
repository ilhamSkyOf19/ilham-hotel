import { useState, type FC, type ReactNode } from "react";
import HeaderDashboardData from "../../components/HeaderDashboardData";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { FasilitasService } from "../../services/fasilitas.service";
import LoadingBlue from "../../components/LoadingBlue";
import CardLongData from "../../components/CardLongData";
import ButtonAddText from "../../components/ButtonAddText";
import ModalComponent from "../../components/ModalComponent";
import ContentModalDelete from "../../components/ContentModalDelete";

const DashboardOtherPage: FC = () => {
  // inisialisi query client
  const queryClient = useQueryClient();
  // state modal active
  const [modalActive, setModalActive] = useState<{
    id: string;
    active: boolean;
  }>({
    id: "",
    active: false,
  });

  // handle close modal
  const handleModalClose = () => {
    setModalActive({
      id: "",
      active: false,
    });
  };

  // handle active modal
  const handleModalActive = (id: string) => {
    setModalActive({
      id: id,
      active: true,
    });
  };

  // query
  const datas = useQueries({
    queries: [
      // fasilitas
      {
        queryKey: ["fasilitas"],
        queryFn: () => {
          return FasilitasService.readAll();
        },
      },
    ],
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
      // fasilitas
      await deleteFasilitasMutation.mutateAsync(id);
    } catch (error) {
      console.log(error);
    }
  };

  // destructure data
  const [dataFasilitas] = datas;

  return (
    <div className="w-full flex flex-col justify-start items-start pt-6 px-4 relative">
      {/* header */}
      <HeaderDashboardData label="other" />

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
              handleDelete={() => handleModalActive(item._id)}
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
          loading={deleteFasilitasMutation.isPending}
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

export default DashboardOtherPage;
