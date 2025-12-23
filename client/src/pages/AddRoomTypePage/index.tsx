import { useEffect, type FC } from "react";
import HeaderInputPage from "../../components/HeaderInputPage";
import BoxInputAbstrakText from "../../components/BoxInputAbstrakText";
import ButtonSubmitBox from "../../components/ButtonSubmitBox";
import { useForm } from "react-hook-form";
import type {
  RoomTypeCreateRequestType,
  RoomTypeResponseType,
  RoomTypeUpdateRequestType,
} from "../../models/roomType-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoomTypeValidation } from "../../validations/roomType-validation";
import { useMutation } from "@tanstack/react-query";
import { RoomTypeService } from "../../services/roomType.service";
import { AxiosError } from "axios";
import { useLoaderData, useNavigate } from "react-router";
import type { ResponseType } from "../../utils/response-type";

const AddRoomTypePage: FC = () => {
  // loader
  const dataUpdate =
    useLoaderData() as ResponseType<RoomTypeResponseType | null>;

  // debug update
  useEffect(() => {
    console.log(dataUpdate);
  }, [dataUpdate]);

  // navigate to login page
  const navigate = useNavigate();

  // use form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RoomTypeCreateRequestType | RoomTypeUpdateRequestType>({
    defaultValues: {
      roomType: dataUpdate?.data?.roomType,
    },
    resolver: zodResolver(
      dataUpdate?.data ? RoomTypeValidation.UPDATE : RoomTypeValidation.CREATE
    ),
  });

  // use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (
      data: RoomTypeCreateRequestType | RoomTypeUpdateRequestType
    ) => {
      if (dataUpdate.data) {
        return RoomTypeService.updateById(dataUpdate.data._id, data);
      } else {
        return RoomTypeService.create(data);
      }
    },
    onSuccess: () => {
      // navigate
      navigate("/dashboard/other");

      console.log("success");
    },
    onError: (error) => {
      // cek error from axios
      if (error instanceof AxiosError) {
        // cek status code
        if (error.response?.status === 409) {
          // set error already exist
          setError("roomType", { message: error.response?.data.message });
        } else if (error.response?.status === 400) {
          // set error already exist
          setError("roomType", { message: error.response?.data.message });
        }
      }

      console.log(error);
    },
  });

  // on submit
  const onSubmit = async (
    data: RoomTypeCreateRequestType | RoomTypeUpdateRequestType
  ) => {
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
