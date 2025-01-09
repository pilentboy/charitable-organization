import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../context/AuthProvider";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const { updateAccessToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    console.log("wait for login response...");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://nazronlinetest.liara.run/user/login/username/",
        data
      );

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      alert("ورود با موفقیت");
      updateAccessToken();
      navigate("/");
    } catch (error: any) {
      console.log(error);

      if (error.response && error.response.status === 400) {
        const serverErrors = error.response.data.error;
        if (Array.isArray(serverErrors) && serverErrors.length > 0) {
          setError("server", { type: "server", message: serverErrors[0] });
        } else {
          setError("server", {
            type: "server",
            message: "مشکل عمومی در ورود.",
          });
        }
      } else {
        setError("server", {
          type: "network",
          message: "مشکل در ارتباط با سرور.",
        });
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    document.title = "ورود";
  }, []);
  return (
    <section className="h-screen sm:h-full flex justify-center items-center">
      <div className="w-full min-h-[400px] flex items-center justify-between border rounded-2xl overflow-hidden">
        <div className="w-full h-full py-8 px-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mx-auto md:w-1/2"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">ورود</h1>

            {errors.server && (
              <p className="text-red-500">
                {errors.server.message?.toString()}
              </p>
            )}

            <label htmlFor="username">نام کاربری</label>

            <input
              {...register("username")}
              required
              id="username"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <label htmlFor="password">رمز عبور</label>
            <input
              {...register("password")}
              type="password"
              required
              id="password"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <button
              className={`w-full h-12 bg-primary rounded-2xl duration-200 text-white ${
                loading ? "opacity-50" : "hover:opacity-90"
              }`}
              disabled={loading}
            >
              {loading ? "لطفا صبر کنید" : "ورود"}
            </button>

            <div className="flex flex-col gap-4 items-center justify-between w-full border-t pt-2 sm:flex-row sm:gap-2 sm:flex-wrap ">
              <Link to="/login-otp" className=" text-primary">
                ورود با شماره تلفن
              </Link>
              <Link to="/reset-password" className=" text-primary">
                بازیابی رمز عبور
              </Link>
              <div className="flex gap-2">
                حساب کاربری ندارید؟
                <Link to="/register" className=" text-primary">
                  عضویت
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
