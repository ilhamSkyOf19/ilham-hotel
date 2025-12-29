import { type FC } from "react";
import HeaderInputPage from "../../components/HeaderInputPage";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GalleryService } from "../../services/gallery.service";
import { generateUrlImg } from "../../utils/util";
import loadingBue from "../../assets/animation/loading-blue.svg";

const GalleriesPage: FC = () => {
  // get id hotel from params
  const { id: idHotel } = useParams<{ id: string }>();

  // query galleries
  const { data: galleries, isLoading } = useQuery({
    queryKey: ["gallerisForGalleriesPage", idHotel],
    queryFn: () => GalleryService.readByIdHotel(idHotel!),
  });

  return (
    <div className="w-full flex flex-col justify-start items-start pt-5 px-4">
      {/* header */}
      <div className="w-full flex flex-col justify-start items-center relative">
        {/* button back */}
        <HeaderInputPage label="Galleries" textFullColor={true} />
      </div>

      {/* display gallery */}
      <div className="w-full grid grid-cols-2 flex-wrap gap-2 mt-12">
        {isLoading ? (
          <div className="w-full col-span-2 justify-center items-center">
            <img src={loadingBue} alt="loading" className="w-12" />
          </div>
        ) : (
          galleries?.data &&
          galleries.data.images.length > 0 &&
          galleries.data.images.map((item, index) => (
            <div
              key={index}
              className="col-span-1 h-[20vh] overflow-hidden rounded-lg"
            >
              <img
                src={generateUrlImg({ path: "galleries", img: item })}
                alt="gallery"
                className="w-full h-full object-cover"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GalleriesPage;
