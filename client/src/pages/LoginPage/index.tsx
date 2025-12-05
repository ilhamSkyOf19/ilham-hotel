import { type FC } from "react";
import AuthLayoutPage from "../../fragments/AuthLayoutPage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type AuthLoginRequestType } from "../../models/auth-model";
import { AuthValidation } from "../../validations/auth-validation";
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import ButtonAuth from "../../components/ButtonAuth";

const LoginPage: FC = () => {
  // use form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthLoginRequestType>({
    resolver: zodResolver(AuthValidation.LOGIN),
  });

  // handle submit
  const onSubmit = async (data: AuthLoginRequestType) => {
    try {
      console.log(data);
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
          <ButtonAuth type="submit" label="sign up" />
        </div>
      </form>
    </AuthLayoutPage>
  );
};

export default LoginPage;
