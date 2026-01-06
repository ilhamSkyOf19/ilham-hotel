import { useState, type FC } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import ModalImage from "../../../components/ModalImage";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/rootReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GalleryService } from "../../../services/gallery.service";
import ModalComponent from "../../../components/ModalComponent";
import ContentModalDelete from "../../../components/ContentModalDelete";
import CardImgForDisplay from "../../../components/CardImgForDisplay";
// Props
type Props = {
  idHotel: string;
  idGallery: string;
  galleries: string[];
  isLoading: boolean;
};

const SectionGallery: FC<Props> = ({
  idHotel,
  idGallery,
  galleries,
  isLoading,
}) => {
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

  // navigate
  const navigate = useNavigate();

  // state modal active
  const [modalActive, setModalActive] = useState<{
    active: boolean;
    img: string;
  }>({ active: false, img: "" });

  // use mutation for img delete
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (img: string) =>
      GalleryService.deleteById({ idGallery, idHotel, img }),
    onSuccess: (data) => {
      console.log(data);

      // close model
      handleCloseModalDelete();

      // revalidate
      queryClient.invalidateQueries({
        queryKey: ["galleryForThumbnailHotelDetail"],
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
    <div className="w-full flex flex-col justify-start items-start px-4 pt-5">
      {/* header */}
      <div className="w-full flex flex-row justify-between items-center">
        {/* title */}
        <h2 className="text-base font-medium">Gallery (400)</h2>

        {/* button add photo */}
        <div className="flex flex-row justify-end items-center">
          {user.role === "admin" && (
            <Link
              to={`/dashboard/hotel/detail/${idHotel}/add-gallery`}
              className="flex flex-row justify-start items-center gap-1 group"
            >
              <MdAddPhotoAlternate className="text-3xl text-gray-400 group-hover:text-gray-600 transition-all duration-200 ease-in-out" />
              <p className="text-sm text-gray-400 group-hover:text-gray-600 transition-all duration-200 ease-in-out">
                add photo
              </p>
            </Link>
          )}
        </div>
      </div>

      {/* images */}
      <div className="w-full grid grid-cols-2 justify-start items-start gap-2 mt-5">
        {/* card image */}
        {isLoading ? (
          Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="col-span-1 h-48 bg-gray-200 animate-pulse rounded-2xl"
            />
          ))
        ) : galleries.length > 0 ? (
          galleries
            .slice(0, 6)
            .map((image, index) => (
              <CardImgForDisplay
                key={index}
                admin={user.role === "admin"}
                handleDelete={() => handleActiveModalDelete(image)}
                image={image}
                handleModalActive={() =>
                  setModalActive({ active: true, img: image })
                }
              />
            ))
        ) : (
          <div className="col-span-2 flex flex-row justify-center items-center">
            <p className="text-sm text-center">Tidak ada gambar</p>
          </div>
        )}
      </div>
      {/* button more */}
      <div className="w-full h-12 flex flex-row justify-end items-start mt-8">
        {!isLoading && galleries.length > 6 && (
          <button
            type="button"
            onClick={() =>
              navigate(
                user.role === "customer"
                  ? `/hotel/detail/${idHotel}/galleries`
                  : `/dashboard/hotel/detail/${idHotel}/galleries`,
                {
                  state: { from: location.pathname },
                }
              )
            }
            className="py-2 px-4 bg-primary-skyblue/85 transition-all duration-200 hover:bg-primary-skyblue rounded-lg flex flex-row justify-start items-center gap-2"
          >
            <p className=" text-white font-medium">More</p>

            {/* icon */}
            <FaArrowRightLong className="text-white text-lg" />
          </button>
        )}
      </div>

      {/* modal image */}
      <ModalImage
        active={modalActive.active}
        img={modalActive.img}
        handleClose={() => setModalActive({ active: false, img: "" })}
      />

      {/* modal delete */}
      {/* modal delete */}
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

export default SectionGallery;
