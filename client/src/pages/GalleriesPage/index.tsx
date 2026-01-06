import { useState, type FC } from "react";
import HeaderInputPage from "../../components/HeaderInputPage";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GalleryService } from "../../services/gallery.service";
import { generateUrlImg } from "../../utils/util";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import ModalImage from "../../components/ModalImage";
import type { RootState } from "../../store/rootReducer";
import { useSelector } from "react-redux";
import ModalComponent from "../../components/ModalComponent";
import ContentModalDelete from "../../components/ContentModalDelete";
import CardImgForDisplay from "../../components/CardImgForDisplay";

const GalleriesPage: FC = () => {
  // query client
  const queryClient = useQueryClient();

  // get state user from redux
  const user = useSelector((state: RootState) => state.user);

  // state modal delete
  const [isModalDelete, setIsModalDelete] = useState<{
    img: string;
    active: boolean;
  }>({
    img: "",
    active: false,
  });

  // handle close modal
  const handleCloseModalDelete = () => {
    setIsModalDelete({
      img: "",
      active: false,
    });
  };

  // handle active modal
  const handleActiveModalDelete = (img: string) => {
    setIsModalDelete({
      img,
      active: true,
    });
  };

  // state modal
  const [modalActive, setModalActive] = useState<{
    active: boolean;
    img: string;
  }>({ active: false, img: "" });

  // use location
  const location = useLocation();

  // previousPath
  const previousPath: string | undefined = location.state?.from;

  // state display data
  const [displayImages, setDisplayImages] = useState<{
    start: number;
    end: number;
  }>({
    start: 0,
    end: 10,
  });

  // handle prev
  const handlePrev = () => {
    setDisplayImages((prev) => ({
      start: prev.start - 10,
      end: prev.end - 10,
    }));
  };

  // handle next
  const handleNext = () => {
    setDisplayImages((prev) => ({
      start: prev.start + 10,
      end: prev.end + 10,
    }));
  };

  // get id hotel from params
  const { id: idHotel } = useParams<{ id: string }>();

  // query galleries
  const { data: galleries, isLoading } = useQuery({
    queryKey: ["gallerisForGalleriesPage", idHotel],
    queryFn: () => GalleryService.readByIdHotel(idHotel!),
  });

  // use mutation for img delete
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (img: string) =>
      GalleryService.deleteById({
        idGallery: galleries?.data?._id ?? "",
        idHotel: idHotel!,
        img,
      }),
    onSuccess: (data) => {
      console.log(data);

      // close model
      handleCloseModalDelete();

      // revalidate
      queryClient.invalidateQueries({
        queryKey: ["gallerisForGalleriesPage"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // handle delete
  const handleDelete = async (img: string) => {
    try {
      return mutateAsync(img);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-start pt-5 px-4">
      {/* header */}
      <div className="w-full flex flex-col justify-start items-center relative">
        {/* button back */}
        <HeaderInputPage
          label="Galleries"
          textFullColor={true}
          linkBack={
            user.role === "customer"
              ? `/hotel/detail/${idHotel}`
              : `/dashboard/hotel/detail/${idHotel}`
          }
          locationState={previousPath}
        />
      </div>

      {/* display gallery */}
      <div className="w-full grid grid-cols-2 flex-wrap gap-2 mt-12">
        {isLoading ? (
          Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="col-span-1 h-[20vh] bg-gray-200 animate-pulse rounded-lg"
            />
          ))
        ) : galleries?.data && galleries.data.images.length > 0 ? (
          galleries.data.images
            ?.slice(displayImages.start, displayImages.end)
            .map((item, index) => (
              <CardImgForDisplay
                key={index}
                admin={user.role === "admin"}
                handleDelete={() => handleActiveModalDelete(item)}
                image={item}
                handleModalActive={() =>
                  setModalActive({ active: true, img: item })
                }
              />
            ))
        ) : (
          <div className="col-span-2 h-[50vh] flex flex-col justify-center items-center">
            <p className="text-base text-primary-skyblue text-center">
              Gambar tidak tersedia
            </p>
          </div>
        )}
      </div>

      {/* button prev & next */}
      <div className="w-full flex flex-row justify-between items-center mt-8">
        {!isLoading && (
          <>
            {/* prev */}
            <div className="w-full flex flex-row justify-start items-center">
              {displayImages.start > 0 && (
                <button
                  onClick={() => handlePrev()}
                  type="button"
                  className="flex flex-row justify-start items-center py-1.5 px-2 border-2 border-gray-300 gap-2 rounded-lg hover:bg-black/10"
                >
                  {/* icon */}
                  <GoArrowLeft className="text-2xl text-black" />

                  {/* label */}
                  <p className="text-sm capitalize font-medium">previous</p>
                </button>
              )}
            </div>

            {/* next */}
            <div className="w-full flex flex-row justify-end items-center">
              {(galleries?.data?.images.length ?? 0) > displayImages.end && (
                <button
                  type="button"
                  onClick={() => handleNext()}
                  className="flex flex-row justify-start items-center py-1.5 px-3 border-2 border-transparent gap-2 rounded-lg bg-primary-green overflow-hidden relative before:content-[''] before:absolute before:inset-0 before:bg-black/10 before:opacity-0 hover:before:opacity-100 before:box-border"
                >
                  {/* label */}
                  <p className="text-sm capitalize text-white">next</p>

                  {/* icon */}
                  <GoArrowRight className="text-2xl text-white font-medium" />
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* modal image */}
      <ModalImage
        active={modalActive.active}
        img={modalActive.img}
        handleClose={() => setModalActive({ active: false, img: "" })}
      />

      <ModalComponent
        active={isModalDelete.active}
        handleClose={() => handleCloseModalDelete()}
      >
        <ContentModalDelete
          handleClose={() => handleCloseModalDelete()}
          handleDelete={() => handleDelete(isModalDelete.img)}
          loading={isPending}
        />
      </ModalComponent>
    </div>
  );
};

export default GalleriesPage;
