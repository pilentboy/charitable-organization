import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import useApiKey from "../hooks/useApiKey";

const ResetPassword = () => {
  // Setting up multiple forms for different steps: phone input, OTP verification, and password reset.
  const phoneForm = useForm();
  const otpForm = useForm();
  const resetPasswordForm = useForm();
  const apiKey = useApiKey();
  // States to track different stages of the password reset process.
  const [OTPSent, setOTPSent] = useState<boolean>(false);
  const [otpConfirmed, setOTPConfirmed] = useState<boolean>(false);
  const [otpType, setOTPType] = useState<string>("password"); // Determines if the OTP input is visible or hidden.
  const [loading, setLoading] = useState<boolean>(false); // Tracks the loading state for async requests.
  const navigate = useNavigate(); // For navigation after password reset is successful.

  // Function to send OTP to the user's phone number.
  const handleSendPhoneNumber = async (data: any) => {
    setLoading(true); // Set loading state to true while sending the request.
    try {
      await axios.post(
        "https://nazronline.ir/api/user/password-reset/request/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
          },
        }
      );
      setOTPSent(true); // Mark OTP as sent after a successful request.
    } catch (error: any) {
      // Handle errors if any occur during the request.
      if (error.response && error.response.status === 400) {
        const serverErrors =
          error.response.data.error || error.response.data.phone_number;
        if (Array.isArray(serverErrors) && serverErrors.length > 0) {
          phoneForm.setError("server", {
            type: "server",
            message: serverErrors[0],
          });
        } else {
          phoneForm.setError("server", {
            type: "server",
            message: "خطای نامشخص در دریافت شماره تلفن",
          });
        }
      } else {
        phoneForm.setError("server", {
          type: "network",
          message: "مشکل در ارتباط با سرور.",
        });
      }
    } finally {
      setLoading(false); // Reset loading state after request completion.
    }
  };

  // Function to verify the OTP entered by the user.
  const handleCheckOTP = async (data: any) => {
    setLoading(true); // Set loading state to true while verifying OTP.
    try {
      await axios.post(
        "https://nazronline.ir/api/user/password-reset/verify/",
        { phone_number: phoneForm.getValues("phone_number"), otp: data.otp },
        { headers: { "Content-Type": "application/json", "X-API-KEY": apiKey } }
      );
      setOTPConfirmed(true); // Mark OTP as confirmed after a successful verification.
      setOTPSent(false); // Reset OTP sent state.
    } catch (error: any) {
      // Handle errors if any occur during the OTP verification.
      if (error.response && error.response.status === 400) {
        const serverErrors =
          error.response.data.error || error.response.data.non_field_errors;
        if (Array.isArray(serverErrors) && serverErrors.length > 0) {
          otpForm.setError("server", {
            type: "server",
            message: serverErrors[0],
          });
        } else {
          otpForm.setError("server", {
            type: "server",
            message: "خطای نامشخص در دریافت شماره تلفن",
          });
        }
      } else {
        otpForm.setError("server", {
          type: "network",
          message: "مشکل در ارتباط با سرور.",
        });
      }
    } finally {
      setLoading(false); // Reset loading state after request completion.
    }
  };

  // Function to reset the password after verifying OTP.
  const handleResetPasssword = async (data: any) => {
    setLoading(true); // Set loading state to true while resetting password.
    try {
      const response = await axios.post(
        "https://nazronline.ir/api/user/password-reset/confirm/",
        {
          ...data,
          phone_number: phoneForm.getValues("phone_number"),
          otp: otpForm.getValues("otp"),
        },
        { headers: { "Content-Type": "application/json", "X-API-KEY": apiKey } }
      );
      alert(response.data.message); // Show server response message.
      navigate("/login"); // Navigate to login page after successful reset.
    } catch (error: any) {
      // Handle errors if any occur during the password reset.
      if (error.response && error.response.status === 400) {
        const serverErrors =
          error.response.data.error || error.response.data.non_field_errors;
        if (Array.isArray(serverErrors) && serverErrors.length > 0) {
          resetPasswordForm.setError("server", {
            type: "server",
            message: serverErrors[0],
          });
        } else {
          resetPasswordForm.setError("server", {
            type: "server",
            message: "خطای نامشخص در دریافت شماره تلفن",
          });
        }
      } else {
        resetPasswordForm.setError("server", {
          type: "network",
          message: "مشکل در ارتباط با سرور.",
        });
      }
    } finally {
      setLoading(false); // Reset loading state after request completion.
    }
  };

  // Setting the document title when the component is mounted.
  useEffect(() => {
    document.title = "بازیابی رمز عبور";
  }, []);

  return (
    <section className="h-[90vh] sm:h-fulk  xl:h-[80vh] flex justify-center items-center">
      <div className="w-full min-h-[400px] flex items-center justify-center border rounded-2xl overflow-hidden sm:min-h-[460px] ">
        {/* Form for sending OTP */}
        {OTPSent && (
          <form
            key="otp-form"
            onSubmit={(e) => {
              otpForm.clearErrors(); // Clear errors before submitting the form.
              otpForm.handleSubmit(handleCheckOTP)(e); // Handle OTP verification.
            }}
            className="w-full py-8 px-6 flex flex-col gap-8 mx-auto lg:w-1/2 sm:gap-5"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">
              بازیابی رمز عبور
            </h1>
            <label htmlFor="otp_input">لطفا رمز ارسال شده را وارد کنید</label>
            {otpForm.formState.errors.server && (
              <p className="text-red-500">
                {otpForm.formState.errors.server.message?.toString()}
              </p>
            )}
            <div className="flex justify-between items-center border border-gray-300 bg-gray-100 rounded-2xl h-12 p-2 duration-200 focus:border-gray-800">
              <input
                {...otpForm.register("otp")}
                id="otp_input"
                required
                type={otpType}
                className="w-[90%] h-full bg-transparent outline-none border-none"
              />
              <button
                type="button"
                onClick={() =>
                  setOTPType((prev) =>
                    prev === "password" ? "text" : "password"
                  )
                }
              >
                {otpType === "text" ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <span className="text-sm ">
              اگر پس از 2 دقیقه پیامک دریافت نشد، مجددا درخواست کد را ارسال
              کنید.
            </span>
            <button
              className={`w-full h-12 bg-primary rounded-2xl duration-200 text-white ${
                loading ? "opacity-50" : "hover:opacity-90"
              }`}
              disabled={loading}
            >
              {loading ? "لطفا صبر کنید" : "تایید"}
            </button>

            <button
              className="w-full h-12 bg-gray-600 rounded-2xl duration-200 text-white hover:opacity-90"
              onClick={() => {
                setOTPSent(false);
                otpForm.reset();
                phoneForm.reset();
              }}
            >
              اصلاح شماره تلفن
            </button>

            <div className="flex flex-col gap-4 items-center justify-between w-full border-t pt-2 sm:flex-row sm:gap-0">
              <Link to="/login" className=" text-primary">
                ورود با نام کاربری
              </Link>
            </div>
          </form>
        )}

        {/* Form for entering phone number */}
        {!OTPSent && !otpConfirmed ? (
          <form
            key="phone-form"
            onSubmit={(e) => {
              phoneForm.clearErrors(); // Clear errors before submitting the form.
              phoneForm.handleSubmit(handleSendPhoneNumber)(e); // Handle sending OTP.
            }}
            className="w-full py-8 px-6 flex flex-col gap-8 mx-auto lg:w-1/2 sm:gap-5"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">
              بازیابی رمز عبور
            </h1>
            <label htmlFor="phone_input">
              لطفا شماره تلفنی که هنگام ثبت نام وارد کردید را وارد نمائید.
            </label>
            {phoneForm.formState.errors.server && (
              <p className="text-red-500">
                {phoneForm.formState.errors.server.message?.toString()}
              </p>
            )}
            <div className="flex justify-between items-center border border-gray-300 bg-gray-100 rounded-2xl h-12 p-2 duration-200 focus:border-gray-800">
              <input
                {...phoneForm.register("phone_number")}
                id="phone_input"
                required
                className="w-[90%] h-full bg-transparent outline-none border-none"
              />
            </div>

            <button
              className={`w-full h-12 bg-primary rounded-2xl duration-200 text-white ${
                loading ? "opacity-50" : "hover:opacity-90"
              }`}
              disabled={loading}
            >
              {loading ? "لطفا صبر کنید" : "ارسال پیامک"}
            </button>

            <div className="flex flex-col gap-4 items-center justify-between w-full border-t pt-2 sm:flex-row sm:gap-0">
              <Link to="/login" className=" text-primary">
                ورود با نام کاربری
              </Link>
            </div>
          </form>
        ) : null}

        {/* Form for resetting the password */}
        {otpConfirmed && !OTPSent && (
          <form
            key="reset-password-form"
            onSubmit={(e) => {
              resetPasswordForm.clearErrors(); // Clear errors before submitting the form.
              resetPasswordForm.handleSubmit(handleResetPasssword)(e); // Handle password reset.
            }}
            className="w-full py-8 px-6 flex flex-col gap-8 mx-auto lg:w-1/2 sm:gap-5"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">
              بازیابی رمز عبور
            </h1>
            <label htmlFor="new_password_input">
              لطفا رمز عبور جدید خود را وارد کنید
            </label>
            {resetPasswordForm.formState.errors.server && (
              <p className="text-red-500">
                {resetPasswordForm.formState.errors.server.message?.toString()}
              </p>
            )}
            <div className="flex justify-between items-center border border-gray-300 bg-gray-100 rounded-2xl h-12 p-2 duration-200 focus:border-gray-800">
              <input
                {...resetPasswordForm.register("new_password")}
                id="new_password_input"
                required
                type="password"
                className="w-[90%] h-full bg-transparent outline-none border-none"
              />
            </div>

            <button
              className={`w-full h-12 bg-primary rounded-2xl duration-200 text-white ${
                loading ? "opacity-50" : "hover:opacity-90"
              }`}
              disabled={loading}
            >
              {loading ? "لطفا صبر کنید" : "بازیابی رمز عبور"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ResetPassword;
