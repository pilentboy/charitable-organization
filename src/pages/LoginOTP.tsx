import { useEffect, useState } from "react"; // Importing React hooks: useEffect for side effects, useState for managing state.
import { useForm } from "react-hook-form"; // Importing useForm hook from react-hook-form for managing form state and validation.
import { Link, useNavigate } from "react-router"; // Importing Link for navigation and useNavigate to programmatically navigate after successful login.
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons for showing and hiding OTP input.
import axios from "axios"; // Importing axios for making HTTP requests.
import useAuth from "../context/AuthProvider"; // Importing custom hook to handle authentication context like updating the access token.
// import useApiKey from "../hooks/useApiKey";

const LoginOTP = () => {
  const { updateAccessToken } = useAuth(); // Destructuring updateAccessToken from the authentication context to manage token updates.
  const navigate = useNavigate(); // Using useNavigate to programmatically navigate to other pages after login.
  const phoneForm = useForm(); // Creating a form instance for phone number input.
  const otpForm = useForm(); // Creating a form instance for OTP input.
  const [OTPSent, setOTPSent] = useState<boolean>(false); // State to track if OTP has been sent or not.
  const [otpType, setOTPType] = useState<string>("password"); // State to toggle OTP input type between password (hidden) and text (visible).
  const [loading, setLoading] = useState<boolean>(false); // State to track if a request is being processed (loading state).
  // const apiKey = useApiKey();
  // Function to send OTP to the user's phone
  const handleSendOTP = async (data: any) => {
    setLoading(true); // Set loading state to true when sending OTP.
    try {
      await axios.post(
        "https://nazronline.ir/api/user/login/phone/", // API endpoint for sending OTP.
        data, // Sending phone number data to the backend.
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "7dabe1b7-454b-4801-9890-38270b6121f2",
          },
        }
      );
      setOTPSent(true); // Mark OTP as sent and switch to OTP verification form.
    } catch (error: any) {
      // Handle error responses from the server.
      if (error.response && error.response.status === 400) {
        const serverErrors =
          error.response.data.error || error.response.data.phone_number;
        if (Array.isArray(serverErrors) && serverErrors.length > 0) {
          phoneForm.setError("server", {
            type: "server",
            message: serverErrors[0],
          });
        }
      } else {
        phoneForm.setError("server", {
          type: "network",
          message: "مشکل در ارتباط با سرور.",
        });
      }
    } finally {
      setLoading(false); // Set loading state to false after the request finishes.
    }
  };

  // Function to verify OTP and log in
  const handleVerifyOTP = async (data: any) => {
    setLoading(true); // Set loading state to true when verifying OTP.

    try {
      const response = await axios.post(
        "https://nazronline.ir/api/user/login/phone/", // API endpoint for OTP verification.
        {
          ...data,
          phone_number: phoneForm.getValues("phone_number"), // Include the phone number in the data.
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "7dabe1b7-454b-4801-9890-38270b6121f2",
          },
        }
      );
      // Save the access and refresh tokens to localStorage.
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      updateAccessToken(); // Update the access token using the context function.
      navigate("/"); // Navigate to the home page after successful login.
    } catch (error: any) {
      console.log(error); // Log any error for debugging.
      // Handle error responses from the server.
      if (error.response && error.response.status === 400) {
        const serverErrors =
          error.response.data.error || error.response.data.phone_number;
        if (Array.isArray(serverErrors) && serverErrors.length > 0) {
          otpForm.setError("server", {
            type: "server",
            message: serverErrors[0],
          });
        }
      } else {
        otpForm.setError("server", {
          type: "network",
          message: "مشکل در ارتباط با سرور.",
        });
      }
    } finally {
      setLoading(false); // Set loading state to false after the request finishes.
    }
  };

  useEffect(() => {
    document.title = "ورود"; // Set the document title to "ورود" (Login) when the component mounts or when OTP status changes.
  }, []);

  return (
    <section className="h-[90vh] sm:h-fulk  xl:h-[80vh] flex justify-center items-center">
      <div className="w-full min-h-[400px] flex items-center justify-center border rounded-2xl overflow-hidden sm:min-h-[460px] ">
        {OTPSent ? (
          // Form to enter OTP after it has been sent
          <form
            key="otp-form"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission behavior.
              otpForm.clearErrors(); // Clear any existing errors.
              otpForm.handleSubmit(handleVerifyOTP)(e); // Handle OTP form submission.
            }}
            className="w-full  py-8 px-6 flex flex-col gap-8 mx-auto lg:w-1/2 sm:gap-5"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">ورود</h1>
            <label htmlFor="otp_input">لطفا رمز ارسال شده را وارد کنید</label>
            {otpForm.formState.errors.server && (
              <p className="text-red-500">
                {otpForm.formState.errors.server.message?.toString()}
                {/* Display error message if any. */}
              </p>
            )}
            <div className="flex justify-between items-center border border-gray-300 bg-gray-100 rounded-2xl h-12 p-2 duration-200 focus:border-gray-800">
              <input
                {...otpForm.register("otp")} // Register the OTP input with react-hook-form.
                id="otp_input"
                required
                type={otpType} // OTP input type (either password or text).
                className="w-[90%] h-full bg-transparent outline-none border-none"
              />
              <button
                type="button"
                onClick={
                  () =>
                    setOTPType((prev) =>
                      prev === "password" ? "text" : "password"
                    ) // Toggle between password and text input for OTP visibility.
                }
              >
                {otpType === "text" ? <FaEye /> : <FaEyeSlash />}
                {/* Toggle eye icon based on input type. */}
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
              {/* Button text based on loading state. */}
            </button>

            <button
              className="w-full h-12 bg-gray-600 rounded-2xl duration-200 text-white hover:opacity-90"
              onClick={() => {
                setOTPSent(false); // Reset to phone number form if user wants to change phone number.
                phoneForm.clearErrors();
                otpForm.reset();
              }}
            >
              اصلاح شماره تلفن
            </button>

            <div className="flex flex-col gap-4 items-center justify-between w-full border-t pt-2 sm:flex-row sm:gap-0">
              <Link to="/login" className=" text-primary">
                ورود با نام کاربری {/* Link to login page with username */}
              </Link>
            </div>
          </form>
        ) : (
          // Form to enter phone number before sending OTP
          <form
            key="phone-form"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission.
              phoneForm.clearErrors(); // Clear any existing errors.
              phoneForm.handleSubmit(handleSendOTP)(e); // Handle phone number form submission.
            }}
            className="w-full py-8 px-6 flex flex-col gap-8 mx-auto lg:w-1/2 sm:gap-5"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">ورود</h1>

            <label htmlFor="phone_input">
              لطفا شماره تلفنی که هنگام ثبت نام وارد کردید را وارد نمائید.
            </label>
            {phoneForm.formState.errors.server && (
              <p className="text-red-500">
                {phoneForm.formState.errors.server.message?.toString()}
                {/* Display error message if any. */}
              </p>
            )}

            <div className="flex justify-between items-center border border-gray-300 bg-gray-100 rounded-2xl h-12 p-2 duration-200 focus:border-gray-800">
              <input
                {...phoneForm.register("phone_number")} // Register the phone number input with react-hook-form.
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
              {/* Button text based on loading state. */}
            </button>
            <div className="flex flex-col gap-4 items-center justify-between w-full border-t pt-2 sm:flex-row sm:gap-0">
              <Link to="/login" className=" text-primary">
                ورود با نام کاربری {/* Link to login page with username */}
              </Link>
              <div className="flex gap-2">
                حساب کاربری ندارید؟
                <Link to="/register" className=" text-primary">
                  عضویت {/* Link to registration page */}
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
