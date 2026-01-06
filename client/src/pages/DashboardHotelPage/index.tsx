import { useEffect, useState, type FC } from "react";
import HeaderDashboardData from "../../components/HeaderDashboardData";
import { useForm } from "react-hook-form";
import ModalComponent from "../../components/ModalComponent";
import ModalFilter from "../../fragments/homePage/ModalFilter";
import SearchHotel from "../../components/SearchHotel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HotelService } from "../../services/hotel.service";
import CardMedium from "../../components/CardMedium";
import { Helmet } from "react-helmet-async";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import LoadingPulseCardMedium from "../../components/LoadingPulseCardMedium";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/rootReducer";
import ContentModalDelete from "../../components/ContentModalDelete";
import { IoIosAlert } from "react-icons/io";
import { AxiosError } from "axios";

const DashboardHotelPage: FC = () => {
  // query client
  const queryClient = useQueryClient();

  // get data user from state redux
  const dataUser = useSelector((state: RootState) => state.user);
  // navigate
  const navigate = useNavigate();

  // state modal delete
  const [isModalDelete, setIsModalDelete] = useState<{
    idHotel: string;
    active: boolean;
  }>({
    idHotel: "",
    active: false,
  });

  // handle close modal delete
  const handleCloseModalDelete = () => {
    setIsModalDelete({
      idHotel: "",
      active: false,
    });
  };

  // handle active modal delete
  const handleActiveModalDelete = (idHotel: string) => {
    setIsModalDelete({
      idHotel,
      active: true,
    });
  };

  // state filter
  const [filter, setFilter] = useState<{
    fasilitas?: string;
    minPrice?: string;
    maxPrice?: string;
  }>({});

  // state modal failedDelete
  const [isModalFailedDelete, setIsModalFailedDelete] =
    useState<boolean>(false);

  // handle close modal failed
  const handleCloseModalFailedDelete = () => {
    setIsModalFailedDelete(false);
  };

  // search
  const [search, setSearch] = useState<string>("");

  // state modal
  const [active, setActive] = useState(false);

  // state facility
  const [facility, setFacility] = useState<string[]>([]);

  // state accommodation
  const [accommodation, setAccommodation] = useState<string[]>([]);

  // state range price
  const [rangePrice, setRangePrice] = useState<number[]>([0, 0]);

  // handle close modal
  const handleClose = () => setActive(false);

  // handle set range
  const handleSetRangePrice = (value: number[]) => {
    setRangePrice(value);
  };

  // use form
  const {
    register,
    watch,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<{ search: string }>();

  const searchValue = watch("search");

  useEffect(() => {
    // cek search if max character
    if (searchValue && searchValue.length >= 20) {
      setError("search", {
        message: "max character",
      });

      return;
    }

    // clear errors
    clearErrors("search");

    const timer = setTimeout(() => {
      setSearch(searchValue);
    }, 600);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // handle submit
  const handleSubmit = () => {
    // set timer 1.5 second

    setFilter({
      fasilitas: facility.join(","),
      minPrice: String(rangePrice[0]),
      maxPrice: String(rangePrice[1]),
    });

    // modal close
    handleClose();
  };

  // use query
  const { data: hotel, isLoading } = useQuery({
    queryKey: [
      "dashboardHotel",
      filter.fasilitas,
      filter.maxPrice,
      filter.minPrice,
      search,
    ],
    queryFn: () =>
      HotelService.readByFilter({
        fasilitas: filter.fasilitas,
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        search,
      }),
  });

  // handle reset
  const handleReset = () => {
    setFilter({});
    setFacility([]);
    setAccommodation([]);
    setRangePrice([0, 0]);
    setActive(false);
  };

  // use mutation delete hotel

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (idHotel: string) => HotelService.deleteByIdHotel(idHotel),
    onSuccess: (data) => {
      console.log(data);
      // revalidate
      queryClient.invalidateQueries({ queryKey: ["dashboardHotel"] });

      // modal close
      handleCloseModalDelete();
    },
    onError: (error) => {
      console.log(error);

      // cek error axios
      if (error instanceof AxiosError) {
        if (error.status === 403) {
          // set modal delete
          handleCloseModalDelete();

          // set modal failed
          setIsModalFailedDelete(true);
        }
      }
    },
  });

  // handle delete hotel
  const handleDeleteHotel = async (idHotel: string) => {
    try {
      // mutation
      return mutateAsync(idHotel);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* helmet */}
      <Helmet>
        <title>Dashboard | Hotel</title>
      </Helmet>

      <div className="w-full h-screen flex flex-col justify-start items-center mt-8 relative">
        {/* title */}
        <HeaderDashboardData label="hotels" />

        {/* search component */}
        <SearchHotel
          register={register}
          handleOpenModal={setActive}
          errors={errors?.search?.message}
        />

        {/* container card small hotel */}
        <div className="w-full flex flex-col justify-start items-start gap-6 mt-8 px-4 pb-32">
          {isLoading ? (
            Array.from({ length: 3 }, (_, i) => (
              <LoadingPulseCardMedium key={i} />
            ))
          ) : hotel && hotel.data && hotel.data.length > 0 ? (
            hotel.data.map((item, _) => (
              <CardMedium
                handleDelete={() => handleActiveModalDelete(item._id)}
                admin={dataUser.role === "admin"}
                key={item._id}
                discount={0}
                location={`${item.location.city}, ${item.location.country}`}
                price={item.price}
                rating={item.rating}
                thumbnail={item.thumbnail}
                title={item.name}
                linkDetail={`/dashboard/hotel/detail/${item._id}`}
              />
            ))
          ) : (
            <div className="w-full h-[40vh] flex flex-col justify-center items-center">
              <p className="text-center">
                <span className="text-primary-skyblue font-medium">Hotel</span>{" "}
                tidak tersedia
              </p>
            </div>
          )}
        </div>

        {/* modal filter*/}
        <ModalComponent
          active={active || isModalDelete.active || isModalFailedDelete}
          handleClose={
            active
              ? handleClose
              : isModalDelete.active
              ? handleCloseModalDelete
              : handleCloseModalFailedDelete
          }
        >
          {/* modal filter */}
          {active && (
            <ModalFilter
              filter={filter}
              handleClose={handleClose}
              handleSetRangePrice={handleSetRangePrice}
              handleSubmit={handleSubmit}
              setFacility={setFacility}
              setAccommodation={setAccommodation}
              handleReset={handleReset}
            />
          )}

          {/* modal delete */}
          {isModalDelete.active && (
            <ContentModalDelete
              handleClose={handleCloseModalDelete}
              handleDelete={() => handleDeleteHotel(isModalDelete.idHotel)}
              loading={isPending}
            />
          )}

          {/* modal failed delete */}
          {isModalFailedDelete && (
            <div className="w-full flex flex-col justify-start items-center">
              {/* icon */}
              <IoIosAlert className="text-8xl mb-4 text-primary-skyblue" />
              <span className="text-center text-sm">
                Hotel tidak dapat dihapus karena masih memiliki booking aktif.
              </span>

              {/* button active */}
              <button
                type="button"
                onClick={() => handleCloseModalFailedDelete()}
                className="py-2.5 px-8 bg-gray-400 rounded-full mt-3"
              >
                <span className="text-white">Mengerti</span>
              </button>
            </div>
          )}
        </ModalComponent>

        {/* button add */}
        <button
          type="button"
          onClick={() =>
            navigate("/dashboard/hotel/add", {
              state: { from: "/dashboard/hotel" },
            })
          }
          className="fixed z-30 bottom-24 overflow-hidden right-4 w-12 h-12 rounded-full bg-primary-green flex flex-row justify-center items-center before:content-[''] before:inset-0 before:bg-black/20 before:absolute before:opacity-0 before:transition-opacity before:duration-200 before:ease-in-out hover:before:opacity-100"
        >
          <MdAdd className="text-3xl text-white" />
        </button>
      </div>
    </>
  );
};

export default DashboardHotelPage;
