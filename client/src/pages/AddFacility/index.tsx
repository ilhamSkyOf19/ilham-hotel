import { type FC } from "react";
import HeaderInputPage from "../../components/HeaderInputPage";
import BoxInputAbstrakText from "../../components/BoxInputAbstrakText";
import ButtonSubmitBox from "../../components/ButtonSubmitBox";
import { useForm } from "react-hook-form";
import type { FasilitasCreateRequestType } from "../../models/fasilitas-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { FasilitasValidation } from "../../validations/fasilitas-validation";
import { useMutation } from "@tanstack/react-query";
import { FasilitasService } from "../../services/fasilitas.service";
import { AxiosError } from "axios";

const AddFacilityPage: FC = () => {
  // use form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FasilitasCreateRequestType>({
    resolver: zodResolver(FasilitasValidation.CREATE),
  });

  //   use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: FasilitasCreateRequestType) => {
      return await FasilitasService.create(data);
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
          setError("fasilitas", { message: error.response?.data.message });
        }
      }

      console.log("error");
    },
  });

  //   handle submit
  const onSubmit = async (data: FasilitasCreateRequestType) => {
    try {
      // call mutation
      return await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col justify-start items-start gap-6 pt-6 px-4">
      {/* header */}
      <HeaderInputPage label="Add Facility" />

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
