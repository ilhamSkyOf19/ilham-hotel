import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UserCreateRequestType } from "../../models/user-model";
import { AuthValidation } from "../../validations/auth-validation";
import InputText from "../../components/InputText";
import ButtonAuth from "../../components/ButtonAuth";
import InputPassword from "../../components/InputPassword";

import ButtonAgreement from "../../components/ButtonAgreement";
import AuthLayoutPage from "../../fragments/AuthLayoutPage";

const RegisterPage: FC = () => {
  // state for button agree
  const [isAgree, setIsAgree] = useState(false);

  // state error for button agree
  const [errorAgree, setErrorAgree] = useState<boolean>(false);

  // use form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreateRequestType>({
    resolver: zodResolver(AuthValidation.REGISTER),
  });

  // handle submit
  const onSubmit = async (data: UserCreateRequestType) => {
    try {
      // cek button agree
      if (!isAgree) {
        setErrorAgree(true);
        return;
      }

      console.log(data);
    } catch (error) {}
  };

  return (
    <AuthLayoutPage type="register">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-start items-center gap-4"
      >
        {/* full name */}
        <InputText
          register={register("fullName")}
          label="Full Name"
          error={errors.fullName?.message}
        />

        {/* email */}
        <InputText
          register={register("email")}
          label="Email"
          error={errors.email?.message}
        />

        {/* phone */}
        <InputText
          register={register("phone")}
          label="Phone"
          error={errors.phone?.message}
        />

        {/* password */}
        <InputPassword
          register={register("password")}
          label="Password"
          error={errors.password?.message}
        />

        {/* confirm password */}
        <InputPassword
          register={register("confirmPassword")}
          label="Confirm Password"
          error={errors.confirmPassword?.message}
        />

        {/* button agreement */}
        <ButtonAgreement
          setIsAgree={setIsAgree}
          isAgree={isAgree}
          errorAgree={errorAgree}
          setErrorAgree={setErrorAgree}
        />

        {/* button submit */}
        <div className="w-full px-6 mt-4">
          <ButtonAuth type="submit" label="sign up" />
        </div>
      </form>
    </AuthLayoutPage>
  );
};

export default RegisterPage;
