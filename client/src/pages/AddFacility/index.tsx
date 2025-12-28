import { useEffect, type FC } from "react";
import HeaderInputPage from "../../components/HeaderInputPage";
import BoxInputAbstrakText from "../../components/BoxInputAbstrakText";
import ButtonSubmitBox from "../../components/ButtonSubmitBox";
import { useForm } from "react-hook-form";
import type {
  FasilitasCreateRequestType,
  FasilitasResponseType,
  FasilitasUpdateRequestType,
} from "../../models/fasilitas-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { FasilitasValidation } from "../../validations/fasilitas-validation";
import { useMutation } from "@tanstack/react-query";
import { FasilitasService } from "../../services/fasilitas.service";
import { AxiosError } from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { ResponseType } from "../../utils/response-type";

const AddFacilityPage: FC = () => {
  // navigate
  const navigate = useNavigate();

  // loader
  const dataUpdate =
    useLoaderData() as ResponseType<FasilitasResponseType | null>;

  // use form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<FasilitasCreateRequestType | FasilitasUpdateRequestType>({
    defaultValues: {
      fasilitas: dataUpdate?.data?.fasilitas,
    },
    resolver: zodResolver(
      dataUpdate?.data ? FasilitasValidation.UPDATE : FasilitasValidation.CREATE
    ),
  });

  //   use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (
      data: FasilitasCreateRequestType | FasilitasUpdateRequestType
    ) => {
      if (dataUpdate && dataUpdate.data) {
        return FasilitasService.update({
          id: dataUpdate.data._id,
          fasilitas: data.fasilitas,
        });
      } else {
        return FasilitasService.create(data);
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
          setError("fasilitas", { message: error.response?.data.message });
        }
      }

      console.log("error");
    },
  });

  //   handle submit
  const onSubmit = async (
    data: FasilitasCreateRequestType | FasilitasUpdateRequestType
  ) => {
    try {
      // call mutation
      return await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  // on focus

  useEffect(() => {
    setFocus("fasilitas");
  }, [setFocus]);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-6 pt-6 px-4 relative">
      {/* header */}
      <HeaderInputPage
        label={`${dataUpdate && dataUpdate.data ? "Update" : "Add"} Facility`}
      />

      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-start items-start gap-6"
      >
        {/* input facility */}
        <BoxInputAbstrakText
          name="fasilitas"
          label="Facility"
          placeholder="Enter your facility"
          register={register("fasilitas")}
          errorMessage={errors.fasilitas?.message}
        />

        {/* button submit */}
        <ButtonSubmitBox label="submit" type="submit" loading={isPending} />
      </form>
    </div>
  );
};

export default AddFacilityPage;
