import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <section className="h-screen sm:h-full flex justify-center items-center">
      <div className="w-full min-h-[400px] flex items-center justify-between border rounded-2xl overflow-hidden">
        <div className="w-full h-full py-8 px-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mx-auto md:w-1/2"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">ورود</h1>

            <label htmlFor="username">نام کاربری</label>
            <input
              {...register("username")}
              required
              id="username"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
              autoFocus
            />

            <label htmlFor="password">رمز عبور</label>
            <input
              {...register("password")}
              type="password"
              required
              id="password"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <button className="w-full h-12 bg-green-600 rounded-2xl duration-200 text-white hover:opacity-90">
              ورود
            </button>

            <div className="flex flex-col gap-4 items-center justify-between w-full border-t pt-2 sm:flex-row sm:gap-0">
              <Link to="/login-otp" className=" text-blue-700">
                ورود با شماره تلفن
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
      </div>
    </section>
  );
};

export default Login;
