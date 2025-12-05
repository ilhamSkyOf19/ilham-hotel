import { type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa6";
import OtpInput from "react-otp-input";
import clsx from "clsx";
import ButtonAuth from "../../components/ButtonAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthValidation } from "../../validations/auth-validation";
import { useNavigate } from "react-router";

// code length
const CODE_LENGTH: number = 4;

const ActivationPage: FC = () => {
  // navigate
  const navigate = useNavigate();
  // use form
  const { control, handleSubmit } = useForm({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(AuthValidation.ACTIVATION_CODE),
  });

  // handle submit
  const onSubmit = (data: { code: string }) => {
    console.log(data);
  };

  // get from session
  const email = sessionStorage.getItem("email");
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center py-10 px-4">
      {/* button back */}
      <button
        type="button"
        className="absolute top-10 left-4"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="text-2xl text-black" />
      </button>

      {/* content */}
      <div className="w-full flex flex-col justify-center items-center">
        {/* title */}
        <h3 className="text-black text-2xl font-semibold">Verify Code</h3>

        <div className="w-full flex flex-col justify-start items-center mt-2">
          {/* description */}
          <p className="text-black text-sm">
            Please enter the code we just sent to email
          </p>

          {/* email */}
          <p className="text-primary-skyblue text-sm font-medium ">
            {email || "default@gmail.com"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <Controller
            name="code"
            control={control}
            render={({ field, fieldState }) => (
              <div className="w-full flex flex-col justify-center items-center gap-2 mt-2">
                <div className="w-full flex flex-row justify-center items-center">
                  <OtpInput
                    value={field.value}
                    onChange={field.onChange}
                    numInputs={CODE_LENGTH}
                    shouldAutoFocus
                    inputType="number"
                    inputStyle={{
                      width: "60px",
                      height: "45px",
                      borderRadius: "10px",
                      backgroundColor: "#f3f3f3",
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "700",
                    }}
                    renderSeparator={() => <span className="mx-2"></span>}
                    renderInput={(props, index) => (
                      <input
                        {...props}
                        key={index}
                        className={clsx(
                          "rounded-md duration-300 ease-in-out",
                          fieldState.error
                            ? "border-red-500"
                            : "border-[#f3f3f3] focus:ring-2 focus:ring-primary-skyblue transition "
                        )}
                      />
                    )}
                  />
                </div>

                {/* error message */}
                <p
                  className={clsx(
                    "text-xs text-red-500 transition-opacity duration-300 ease-in-out h-4",
                    fieldState.error ? "opacity-100" : "opacity-0"
                  )}
                >
                  {fieldState.error?.message}
                </p>
              </div>
            )}
          />
          {/* resend */}
          <div className="w-full flex flex-col justify-start items-center">
            <p className="text-black text-sm">Didn't receive the code?</p>

            {/* button resend */}
            <button
              type="button"
              className="text-black underline text-sm font-semibold"
            >
              Resend code
            </button>
          </div>
          {/* verify */}
          <div className="w-full mt-5">
            <ButtonAuth type="submit" label="verify" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivationPage;
