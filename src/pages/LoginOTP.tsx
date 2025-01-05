import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const LoginOTP = () => {
  const [OTP, setOTP] = useState("");
  const [otpType, setOTPType] = useState<string>("password");

  const handleOTPLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="h-screen  flex items-center justify-center">
      <div className="w-full h-[400px]  flex items-center justify-center border rounded-2xl overflow-hidden sm:h-[600px]">
        <form
          onSubmit={handleOTPLogin}
          className="w-full  py-8 px-6 flex flex-col gap-8 mx-auto lg:w-1/2 sm:gap-5 "
        >
          <h1 className="text-3xl font-bold mb-2 text-center">ورود</h1>
          <label htmlFor="otp">لطفا رمز ارسال شده را وارد کنید</label>
          <div className="flex justify-between items-center border border-gray-300 bg-gray-100 rounded-2xl h-12 p-2 duration-200 focus:border-gray-800">
            <input
              name="otp"
              id="otp"
              type={otpType}
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              className="w-[90%] h-full bg-transparent outline-none border-none"
            />
            <button
              type="button"
              onClick={() => {
                if (otpType === "password") {
                  setOTPType("text");
                } else {
                  setOTPType("password");
                }
              }}
            >
              {otpType === "text" ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button className="w-full h-12 bg-green-600 rounded-2xl duration-200 text-white hover:opacity-90">
            تایید
          </button>

          <div className="flex flex-col gap-4 items-center justify-between w-full border-t pt-2 sm:flex-row sm:gap-0">
            <Link to="/login" className=" text-blue-700">
              ورود با نام کاربری
            </Link>
            <div className="flex gap-2">
              حساب کاربری ندارید؟
              <Link to="/register" className=" text-blue-700">
                ثبت نام
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginOTP;
