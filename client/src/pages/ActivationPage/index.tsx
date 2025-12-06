import { useEffect, useState, type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa6";
import OtpInput from "react-otp-input";
import clsx from "clsx";
import ButtonAuth from "../../components/ButtonAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthValidation } from "../../validations/auth-validation";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../../services/auth.service";
import type { ResponseType } from "../../utils/response-type";
import type { UserResponseType } from "../../models/user-model";
import { AxiosError } from "axios";
import Resend from "../../components/Resend";
import type { PayloadType } from "../../models/auth-model";
import { useGetAuthActivation } from "../../hooks/useAuth";

// code length
const CODE_LENGTH: number = 4;

const ActivationPage: FC = () => {
  // state reset
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  // state data
  const [data, setData] = useState<PayloadType | null>(null);

  // loading
  const [loading, setLoading] = useState<boolean>(false);

  // get data
  useEffect(() => {
    const response = async () => {
      try {
        // set loading
        setLoading(true);

        // get auth
        const response = await useGetAuthActivation();

        // cek response
        if (response?.status === "failed") {
          return;
        }

        setData(response?.data as PayloadType);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // call
    response();
  }, [resetTrigger]);

  // navigate
  const navigate = useNavigate();
  // use form
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(AuthValidation.ACTIVATION_CODE),
  });

  // use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: { code: string }) => {
      return (await AuthService.activationCode({
        code: Number(data.code),
      })) as ResponseType<UserResponseType | null>;
    },
    onSuccess: (data: ResponseType<UserResponseType | null>) => {
      if (data.status === "success") {
        navigate("/");
      }
    },
    onError: (error) => {
      // cek error from axios
      if (error instanceof AxiosError) {
        if (error.response?.status === 410) {
          // set error already exist
          setError("code", { message: error.response?.data.message });
        }
      }
      console.log(error);
    },
  });

  // handle submit
  const onSubmit = async (data: { code: string }) => {
    try {
      // call mutation
      return await mutateAsync({ code: String(data.code) });
    } catch (error) {
      console.log(error);
    }
  };

  // handle reset
  const reset = () => setResetTrigger((prev) => prev + 1);

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
            {data?.email || ""}
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
          <div className="w-full min-h-23 flex flex-col justify-center items-center">
            {loading ? null : (
              <Resend
                time={String(data?.updatedAt)}
                reset={reset}
                resetTrigger={resetTrigger}
              />
            )}
          </div>
          {/* verify */}
          <div className="w-full mt-5">
            <ButtonAuth type="submit" label="verify" loading={isPending} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivationPage;
