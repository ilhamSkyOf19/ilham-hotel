import { type FC } from "react";
import HeaderInputPage from "../../components/HeaderInputPage";
import BoxInputAbstrakText from "../../components/BoxInputAbstrakText";
import BoxInputAbstrakTextArea from "../../components/BoxInputAbstrakTextArea";
import BoxInputImgSmall from "../../components/BoxInputImgSmall";
import BoxInputChoose from "../../components/BoxInputChoose";
import ButtonSubmitBox from "../../components/ButtonSubmitBox";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FasilitasService } from "../../services/fasilitas.service";
import { Controller, useForm } from "react-hook-form";
import { type HotelCreateServiceRequestType } from "../../models/hotel-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { HotelValidation } from "../../validations/hotel-validation";
import { HotelService } from "../../services/hotel.service";
import BoxInputAbstrakCurrency from "../../components/BoxInputAbstrakCurrency";
import { useLocation, useNavigate } from "react-router-dom";

const AddHotelPage: FC = () => {
  // location
  const location = useLocation();

  // get state from location
  const locationState = location.state?.from;

  // navigate
  const navigate = useNavigate();
  // query client for display fasilitas
  const { data: fasilitas } = useQuery({
    queryKey: ["fasilitas"],
    queryFn: () => {
      return FasilitasService.readAll();
    },
  });

  // use form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    control,
    reset,
  } = useForm<HotelCreateServiceRequestType>({
    resolver: zodResolver(HotelValidation.CREATE),
  });

  // use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      return await HotelService.create(data);
    },
    onSuccess: (data) => {
      console.log("success", data);
      // reset form
      reset();

      // navigate
      navigate("/dashboard/hotel");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // on submit
  const onSubmit = async (data: HotelCreateServiceRequestType) => {
    try {
      // format currency to number
      data.price = data.price.replace(/[^0-9]+/g, "");

      // form data
      const formData = new FormData();

      // cek file thumbnail
      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail);
      }

      // append data
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("city", data.city);
      formData.append("country", data.country);
      formData.append("price", data.price);
      formData.append("linkMaps", data.linkMaps);
      formData.append("totalRoom", data.totalRoom);
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

        {/* city */}
        <BoxInputAbstrakText
          name="city"
          label="city"
          placeholder="Enter city"
          register={register("city")}
          errorMessage={errors.city?.message}
        />

        {/* country */}
        <BoxInputAbstrakText
          name="country"
          label="country"
          placeholder="Enter country"
          register={register("country")}
          errorMessage={errors.country?.message}
        />

        {/* country */}
        <BoxInputAbstrakText
          name="linkMaps"
          label="link maps"
          placeholder="Enter link maps"
          register={register("linkMaps")}
          errorMessage={errors.linkMaps?.message}
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
            />
          )}
        />

        {/* input fasilitas */}
        <BoxInputChoose
          label="fasilitas"
          name="fasilitas"
          errorMessage={errors.fasilitas?.message}
          setValue={setValue}
          chooseList={fasilitas?.data || []}
        />

        {/* button submit */}
        <div className="w-full mt-4">
          <ButtonSubmitBox label="submit" type="submit" loading={isPending} />
        </div>
      </form>
    </div>
  );
};

export default AddHotelPage;
