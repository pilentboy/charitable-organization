import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import useAuth from "../context/AuthProvider";

const LoginOTP = () => {
  const { updateAccessToken } = useAuth();
  const navigate = useNavigate();
  const phoneForm = useForm(); // Form for phone number
  const otpForm = useForm(); // Form for OTP
  const [OTPSent, setOTPSent] = useState<boolean>(false);
  const [otpType, setOTPType] = useState<string>("password");
  const [loading, setLoading] = useState<boolean>(false);

  // send otp code to user phone
  const handleSendOTP = async (data: any) => {
    setLoading(true);
    try {
      console.log(data);
      const response = await axios.post(
        "https://nazronlinetest.liara.run/user/login/phone/",
        data
      );
      console.log(response, "login otp response");
      setOTPSent(true);
    } catch (error: any) {
      alert(error.response.data.error[0]);
    }
    setLoading(false);
  };

  // check otp code and log in
  const handleCheckOTP = async (data: any) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://nazronlinetest.liara.run/user/login/phone/",
        {
          ...data,
          phone_number: phoneForm.getValues("phone_number"),
        }
      );
      console.log(response, "log in successfuly");
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      updateAccessToken();
      navigate("/");
    } catch (error: any) {
      alert(error.response.data.error[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = "ورود";
  }, []);

  return (
    <section className="h-screen sm:h-full flex justify-center items-center">
      <div className="w-full min-h-[400px] flex items-center justify-center border rounded-2xl overflow-hidden sm:min-h-[460px] ">
        {OTPSent ? (
          <form
            key="otp-form"
            onSubmit={otpForm.handleSubmit(handleCheckOTP)}
            className="w-full  py-8 px-6 flex flex-col gap-8 mx-auto lg:w-1/2 sm:gap-5"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">ورود</h1>
            <label htmlFor="otp_input">لطفا رمز ارسال شده را وارد کنید</label>
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
              className={`w-full h-12 bg-primary rounded-2xl duration-200 text-white  ${
                loading ? "opacity-50" : "hover:opacity-90 opacity-100"
              }`}
              disabled={loading}
            >
              {loading ? "بررسی کد وارد شده" : "تایید"}
            </button>

            <button
              className="w-full h-12 bg-gray-600 rounded-2xl duration-200 text-white hover:opacity-90"
              onClick={() => {
                setOTPSent(false);
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
        ) : (
          <form
            key="phone-form"
            onSubmit={phoneForm.handleSubmit(handleSendOTP)}
            className="w-full py-8 px-6 flex flex-col gap-8 mx-auto lg:w-1/2 sm:gap-5"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">ورود</h1>
            <label htmlFor="phone_input">
              لطفا شماره تلفنی که هنگام ثبت نام وارد کردید را وارد نمائید.
            </label>
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
              className={`w-full h-12 bg-primary rounded-2xl duration-200 text-white  ${
                loading ? "opacity-50" : "hover:opacity-90 opacity-100"
              }`}
              disabled={loading}
            >
              {loading ? "بررسی شماره تلفن" : "ارسال کد یک بار مصرف"}
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
        )}
      </div>
    </section>
  );
};

export default LoginOTP;

