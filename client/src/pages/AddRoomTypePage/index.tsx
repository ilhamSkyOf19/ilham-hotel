import { type FC } from "react";
import HeaderInputPage from "../../components/HeaderInputPage";
import BoxInputAbstrakText from "../../components/BoxInputAbstrakText";
import ButtonSubmitBox from "../../components/ButtonSubmitBox";
import { useForm } from "react-hook-form";
import type { RoomTypeCreateRequestType } from "../../models/roomType-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoomTypeValidation } from "../../validations/roomType-validation";
import { useMutation } from "@tanstack/react-query";
import { RoomTypeService } from "../../services/roomType.service";
import { AxiosError } from "axios";

const AddRoomTypePage: FC = () => {
  // use form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RoomTypeCreateRequestType>({
    resolver: zodResolver(RoomTypeValidation.CREATE),
  });

  // use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: RoomTypeCreateRequestType) => {
      return await RoomTypeService.create(data);
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      // cek error from axios
      if (error instanceof AxiosError) {
        // cek status code
        if (error.response?.status === 409) {
          // set error already exist
          setError("roomType", { message: error.response?.data.message });
        }
      }

      console.log("error");
    },
  });

  // on submit
  const onSubmit = async (data: RoomTypeCreateRequestType) => {
    try {
      // call mutation
      return await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-start pt-6 px-4 gap-12">
      {/* header */}
      <HeaderInputPage label="Add Room Type" />

      {/* input room type */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-start items-center gap-8"
      >
        {/* input room type */}
        <BoxInputAbstrakText
          register={register("roomType")}
          label="Room Type"
          placeholder="Room Type"
          name="roomType"
          errorMessage={errors.roomType?.message}
        />

        {/* button submit */}
        <ButtonSubmitBox label="submit" type="submit" loading={isPending} />
      </form>
    </div>
  );
};

export default AddRoomTypePage;
