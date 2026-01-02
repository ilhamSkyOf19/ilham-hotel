import { type FC } from "react";
import AuthLayoutPage from "../../fragments/AuthLayoutPage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type AuthLoginRequestType,
  type PayloadType,
} from "../../models/auth-model";
import { AuthValidation } from "../../validations/auth-validation";
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import ButtonSubmitBox from "../../components/ButtonSubmitBox";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../../services/auth.service";
import type { ResponseType } from "../../utils/response-type";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage: FC = () => {
  // navigate
  const navigate = useNavigate();

  // use form
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<AuthLoginRequestType>({
    resolver: zodResolver(AuthValidation.LOGIN),
  });

  // use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: AuthLoginRequestType) => {
      return (await AuthService.login(
        data
      )) as ResponseType<PayloadType | null>;
    },
    onSuccess: (data) => {
      // cek role
      if (data.data?.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

      console.log(data);
    },
    onError: (error) => {
      // cek error from axios error
      if (error instanceof AxiosError) {
        // cek status code
        if (error.response?.status === 400) {
          // set error
          setError("email", { message: error.response?.data.message });
          setError("password", { message: error.response?.data.message });
        }
      }
    },
  });

  // handle submit
  const onSubmit = async (data: AuthLoginRequestType) => {
    try {
      console.log(data);

      // call mutation
      return await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthLayoutPage type="login">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-start items-center gap-4"
      >
        {/* email */}
        <InputText
          register={register("email")}
          label="Email"
          error={errors.email?.message}
        />

        {/* password */}
        <InputPassword
          register={register("password")}
          label="Password"
          error={errors.password?.message}
        />

        {/* button submit */}
        <div className="w-full px-6 mt-4">
          <ButtonSubmitBox type="submit" label="sign up" loading={isPending} />
        </div>
      </form>
    </AuthLayoutPage>
  );
};

export default LoginPage;
