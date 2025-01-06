import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Select from "react-select";
import { provinces, ProvinceType } from "../data/provinces";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router";

type FormData = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  birthdate: DateObject | null;
  province: ProvinceType | null;
  city: { value: string; label: string } | null;
  cities: { value: string; label: string }[];
  address: string;
  passwordType: "password" | "text";
};

const Register = () => {
  const { register, handleSubmit, control, watch, setValue, getValues } =
    useForm<FormData>({
      defaultValues: {
        passwordType: "password",
      },
    });

  const province = watch("province");

  useEffect(() => {
    if (province) {
      const cities = province.cities.map((city) => ({
        value: city,
        label: city,
      }));
      setValue("city", null);
      setValue("cities", cities);
    }
  }, [province, setValue]);

  const handleRegister = (data: FormData) => {
    console.log(data);
  };

  return (
    <section className="h-full flex items-center justify-center">
      <div className="w-full min-h-[600px] flex items-center justify-between border rounded-2xl overflow-hidden">
        <div className="w-full h-full py-8 px-6 ">
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col gap-5 mx-auto sm:w-1/2"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">عضویت</h1>

            <label htmlFor="username">نام کاربری</label>
            <input
              {...register("username")}
              required
              id="username"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
              autoFocus
            />

            <label htmlFor="firstName">نام</label>
            <input
              {...register("firstName")}
              required
              id="firstName"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <label htmlFor="lastName">نام خانوادگی</label>
            <input
              {...register("lastName")}
              id="lastName"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <label htmlFor="password">رمز عبور</label>
            <div className="flex justify-between items-center border border-gray-300 bg-gray-100 rounded-2xl h-12 p-2 duration-200 focus:border-gray-800">
              <input
                {...register("password")}
                required
                id="password"
                type={watch("passwordType", "password")}
                className="w-[90%] h-full bg-transparent outline-none border-none"
              />
              <button
                type="button"
                onClick={() => {
                  const currentType =
                    getValues("passwordType") === "password"
                      ? "text"
                      : "password";
                  setValue("passwordType", currentType);
                }}
              >
                {watch("passwordType") === "text" ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <label htmlFor="phoneNumber">شماره تلفن</label>
            <input
              {...register("phoneNumber")}
              id="phoneNumber"
              placeholder="09XXXXXXXXX"
              required
              type="tel"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <label htmlFor="birthdate">تاریخ تولد</label>
            <Controller
              control={control}
              name="birthdate"
              render={({ field: { ref, ...field } }) => (
                <DatePicker
                  required
                  {...field}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  inputClass="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800 placeholder:text-sm"
                  placeholder="تاریخ تولد"
                />
              )}
            />

            <label htmlFor="province">استان</label>
            <Controller
              control={control}
              name="province"
              render={({ field }) => (
                <Select
                  required
                  {...field}
                  inputId="province"
                  placeholder="انتخاب استان"
                  options={provinces}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: "200px",
                      height: "48px",
                      borderColor: "#d1d5db",
                      borderRadius: "16px",
                      padding: "0 10px",
                      backgroundColor: "#f3f4f6",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      width: "200px",
                    }),
                  }}
                />
              )}
            />

            <label htmlFor="city">شهر</label>
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <Select
                  required
                  {...field}
                  inputId="city"
                  placeholder="انتخاب شهر"
                  options={watch("cities") || []}
                  isDisabled={!province}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: "200px",
                      height: "48px",
                      borderColor: "#d1d5db",
                      borderRadius: "16px",
                      padding: "0 10px",
                      backgroundColor: "#f3f4f6",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      width: "200px",
                    }),
                  }}
                />
              )}
            />

            <label htmlFor="address">آدرس</label>
            <textarea
              {...register("address")}
              placeholder="مثال: تهران، خیابان..."
              id="address"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-28 p-2 placeholder:text-sm duration-200 focus:border-gray-800"
            ></textarea>

            <button className="w-full h-12 bg-green-600 rounded-2xl duration-200 text-white hover:opacity-90">
              عضویت
            </button>

            <div className="flex gap-2 border-t pt-2">
              حساب کاربری دارید؟
              <Link to="/login" className=" text-blue-700">
                ورود
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
