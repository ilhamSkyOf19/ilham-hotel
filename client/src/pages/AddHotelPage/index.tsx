import { useEffect, type FC } from "react";
import HeaderInputPage from "../../components/HeaderInputPage";
import BoxInputAbstrakText from "../../components/BoxInputAbstrakText";
import BoxInputAbstrakTextArea from "../../components/BoxInputAbstrakTextArea";
import BoxInputImgSmall from "../../components/BoxInputImgSmall";
import BoxInputChoose from "../../components/BoxInputChoose";
import ButtonSubmitBox from "../../components/ButtonSubmitBox";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { FasilitasService } from "../../services/fasilitas.service";
import { Controller, useForm } from "react-hook-form";
import {
  type HotelCreateServiceRequestType,
  type HotelUpdateServiceRequestType,
} from "../../models/hotel-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { HotelValidation } from "../../validations/hotel-validation";
import { HotelService } from "../../services/hotel.service";
import BoxInputAbstrakCurrency from "../../components/BoxInputAbstrakCurrency";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BoxInputAbstrakChoose from "../../components/BoxInputAbstrakChoose";
import LoadingInputAbstrakPulse from "../../components/LoadingInputAbstrakPulse";

const AddHotelPage: FC = () => {
  // get id from params
  const { id: idHotel } = useParams() as { id: string };

  // use query

  // location
  const location = useLocation();

  // get state from location
  const locationState = location.state?.from;

  // navigate
  const navigate = useNavigate();
  // query client for display fasilitas
  const data = useQueries({
    queries: [
      {
        queryKey: ["hotel", "detail", "update", idHotel],
        queryFn: () => HotelService.readDetail(idHotel),
        enabled: !!idHotel,
      },
    ],
  });

  // destruc data
  const [dataHotel] = data;

  // use form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    control,
    reset,
  } = useForm<HotelCreateServiceRequestType | HotelUpdateServiceRequestType>({
    resolver: zodResolver(
      idHotel ? HotelValidation.UPDATE : HotelValidation.CREATE
    ),
  });

  // set value if id hotel is existing
  useEffect(() => {
    if (idHotel && dataHotel?.data) {
      reset({
        name: dataHotel.data?.data?.name,
        description: dataHotel.data?.data?.description,
        location: dataHotel.data?.data?.location._id,
        linkMaps: dataHotel.data?.data?.linkMaps,
        price: dataHotel.data?.data?.price.toString(),
        taxAndFees: dataHotel.data?.data?.taxAndFees.toString(),
        totalRoom: dataHotel.data?.data?.totalRoom.toString(),
      });
    }
  }, [idHotel, dataHotel?.data]);

  // use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: FormData) => {
      if (idHotel && dataHotel.data) {
        return HotelService.update(idHotel, data);
      } else {
        return HotelService.create(data);
      }
    },
    onSuccess: (data) => {
      console.log("success", data);
      // reset form
      reset();

      // navigate
      navigate(
        idHotel ? `/dashboard/hotel/detail/${idHotel}` : "/dashboard/hotel"
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // on submit
  const onSubmit = async (
    data: HotelCreateServiceRequestType | HotelUpdateServiceRequestType
  ) => {
    try {
      // format currency to number
      data.price = data.price && data.price.replace(/[^0-9]+/g, "");

      // form data
      const formData = new FormData();

      // cek file thumbnail
      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail);
      }

      // append data
      formData.append("name", data.name || "");
      formData.append("description", data.description || "");
      formData.append("price", data.price || "");
      formData.append("linkMaps", data.linkMaps || "");
      formData.append("location", data.location || "");
      formData.append("totalRoom", data.totalRoom || "");
      formData.append("taxAndFees", data.taxAndFees || "");
      formData.append("fasilitas", JSON.stringify(data.fasilitas));

      // call mutation
      return await mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-full flex flex-col justify-start items-center pt-6 px-4">
      {/* header */}
      <HeaderInputPage
        label="Add Hotel"
        linkBack="/dashboard/hotel"
        locationState={locationState}
      />

      {/* content input */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col justify-start items-start mt-8 gap-5"
      >
        {dataHotel.isLoading ? (
          <>
            {/* component loading pulse input */}
            <div className="w-full h-full flex flex-col justify-start items-start gap-5">
              <LoadingInputAbstrakPulse label="Name Hotel" />
              <LoadingInputAbstrakPulse label="Price" />
              <LoadingInputAbstrakPulse label="Description" type={"textarea"} />
              <LoadingInputAbstrakPulse label="Total Room" />
              <LoadingInputAbstrakPulse label="Link Maps" />
              <LoadingInputAbstrakPulse label="Choose Location" />
              <LoadingInputAbstrakPulse label="Tax & Fees" />
            </div>
          </>
        ) : (
          <>
            {/* name */}
            <BoxInputAbstrakText
              name="name"
              label="name hotel"
              placeholder="Enter name"
              register={register("name")}
              errorMessage={errors.name?.message}
            />

            {/* price */}
            <BoxInputAbstrakCurrency
              name="price"
              label="price"
              placeholder="Enter price"
              register={register("price")}
              errorMessage={errors.price?.message}
              setValue={setValue}
            />

            {/* description */}
            <BoxInputAbstrakTextArea
              label="description"
              name="description"
              placeholder="Enter description"
              register={register("description")}
              errorMessage={errors.description?.message}
            />

            {/* total room */}
            <BoxInputAbstrakText
              name="totalRoom"
              label="total room"
              placeholder="Enter total room"
              register={register("totalRoom")}
              errorMessage={errors.totalRoom?.message}
            />

            {/* country */}
            <BoxInputAbstrakText
              name="linkMaps"
              label="link maps"
              placeholder="Enter link maps"
              register={register("linkMaps")}
              errorMessage={errors.linkMaps?.message}
            />

            {/* choose location */}
            <BoxInputAbstrakChoose
              defaultValue={`${dataHotel.data?.data?.location.city}, ${dataHotel.data?.data?.location.country}`}
              setValue={setValue}
              errorMessage={errors.location?.message}
            />

            {/* tax and fees */}
            <BoxInputAbstrakCurrency
              name="taxAndFees"
              label="Tax & Fees"
              placeholder="Enter tax & fees"
              register={register("taxAndFees")}
              errorMessage={errors.taxAndFees?.message}
              setValue={setValue}
            />

            {/* input thumbnail */}
            <Controller
              control={control}
              name="thumbnail"
              render={({ fieldState }) => (
                <BoxInputImgSmall
                  setValue={setValue}
                  errorMessage={fieldState.error?.message}
                  clearError={clearErrors}
                  defaultValue={dataHotel.data?.data?.thumbnail}
                />
              )}
            />

            {/* input fasilitas */}
            <BoxInputChoose
              label="fasilitas"
              name="fasilitas"
              errorMessage={errors.fasilitas?.message}
              setValue={setValue}
              defaultValue={dataHotel.data?.data?.fasilitas}
            />

            {/* button submit */}
            <div className="w-full mt-4">
              <ButtonSubmitBox
                label="submit"
                type="submit"
                loading={isPending}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AddHotelPage;
