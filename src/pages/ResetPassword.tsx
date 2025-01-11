import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const ResetPassword = () => {
  const phoneForm = useForm();
  const otpForm = useForm();
  const resetPasswordForm = useForm();
  const [OTPSent, setOTPSent] = useState<boolean>(false);
  const [otpConfirmed, setOTPConfirmed] = useState<boolean>(false);
  const [otpType, setOTPType] = useState<string>("password");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // send otp code to phonenumber
  const handleSendPhoneNumber = async (data: any) => {
    setLoading(true);
    try {
      await axios.post(
        "https://nazronlinetest.liara.run/user/password-reset/request/",
        data
      );
      setOTPSent(true);
    } catch (error: any) {
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
      setLoading(false);
    }
  };

  // verify otp
  const handleCheckOTP = async (data: any) => {
    setLoading(true);

    try {
      await axios.post(
        "https://nazronlinetest.liara.run/user/password-reset/verify/",
        { phone_number: phoneForm.getValues("phone_number"), otp: data.otp },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOTPConfirmed(true);
      setOTPSent(false);
    } catch (error: any) {
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
      setLoading(false);
    }
  };

  // confirm new password
  const handleResetPasssword = async (data: any) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://nazronlinetest.liara.run/user/password-reset/confirm/",
        {
          ...data,
          phone_number: phoneForm.getValues("phone_number"),
          otp: otpForm.getValues("otp"),
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message);
      navigate("/login");
    } catch (error: any) {
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
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "بازیابی رمز عبور";
  }, []);

  return (
    <section className="h-screen sm:h-full flex justify-center items-center">
      <div className="w-full min-h-[400px] flex items-center justify-center border rounded-2xl overflow-hidden sm:min-h-[460px] ">
        {OTPSent && (
          <form
            key="otp-form"
            onSubmit={(e) => {
              otpForm.clearErrors();
              otpForm.handleSubmit(handleCheckOTP)(e);
            }}
            className="w-full  py-8 px-6 flex flex-col gap-8 mx-auto lg:w-1/2 sm:gap-5"
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

        {!OTPSent && !otpConfirmed ? (
          <form
            key="phone-form"
            onSubmit={(e) => {
              phoneForm.clearErrors();
              phoneForm.handleSubmit(handleSendPhoneNumber)(e);
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
                placeholder="09XXXXXXXXX"
                required
                type="tel"
                className="w-[95%] h-full bg-transparent outline-none border-none"
              />
            </div>

            <button
              className={`w-full h-12 bg-primary rounded-2xl duration-200 text-white ${
                loading ? "opacity-50" : "hover:opacity-90"
              }`}
              disabled={loading}
            >
              {loading ? "لطفا صبر کنید" : "ارسال کد یک بار مصرف"}
            </button>

            <div className="flex flex-col gap-4 items-center justify-between w-full border-t pt-2 sm:flex-row sm:gap-0">
              <Link to="/login" className=" text-primary">
                ورود با نام کاربری
              </Link>
              <div className="flex gap-2">
                حساب کاربری ندارید؟
                <Link to="/register" className=" text-primary">
                  عضویت
                </Link>
              </div>
            </div>
          </form>
        ) : null}

        {otpConfirmed && (
          <form
            key="resetPassword-form"
            onSubmit={(e) => {
              resetPasswordForm.clearErrors();
              resetPasswordForm.handleSubmit(handleResetPasssword)(e);
            }}
            className="w-full  py-8 px-6 flex flex-col gap-8 mx-auto lg:w-1/2 sm:gap-5"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">
              بازیابی رمز عبور
            </h1>
            <label htmlFor="new_password">لطفا رمز جدید خود را وارد کنید</label>
            {resetPasswordForm.formState.errors.server && (
              <p className="text-red-500">
                {resetPasswordForm.formState.errors.server.message?.toString()}
              </p>
            )}
            <div className="flex justify-between items-center border border-gray-300 bg-gray-100 rounded-2xl h-12 p-2 duration-200 focus:border-gray-800">
              <input
                {...resetPasswordForm.register("new_password")}
                id="new_password"
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

            <button
              className={`w-full h-12 bg-primary rounded-2xl duration-200 text-white ${
                loading ? "opacity-50" : "hover:opacity-90"
              }`}
              disabled={loading}
            >
              {loading ? "لطفا صبر کنید" : " تایید"}
            </button>

            <div className="flex flex-col gap-4 items-center justify-between w-full border-t pt-2 sm:flex-row sm:gap-0">
              <Link to="/login" className=" text-primary">
                ورود با نام کاربری
              </Link>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ResetPassword;
