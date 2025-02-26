import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DateObject } from "react-multi-date-picker";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import moment from "jalali-moment";
import axios from "axios";
import convertDateToFAEN from "../utils/Date&NumberConvertors/convertDateNumbersToFAEN";
import CustomDatePicker from "../components/Custom/CustomDatePicker";
import CustomSelectInput from "../components/Custom/CustomSelectInput";
import citiesData from "../data/cities.json";
import useApiKey from "../hooks/useApiKey";

type FormData = {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
  birth_date: DateObject | null;
  province: any | null;
  city: { value: string; label: string } | null;
  cities: { value: string; label: string }[];
  address: string;
  passwordType: "password" | "text";
};

const Register = () => {
  const [formatedBirthDate, setFormatedBirthDate] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiKey = useApiKey();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      passwordType: "password",
    },
  });

  const province = watch("province");

  useEffect(() => {
    if (province) {
      const provinceInfo = citiesData.filter(
        (cities) => cities.id === province.id
      );
      const provinceCities = provinceInfo[0].cities;

      const cities = provinceCities.map((city: any) => ({
        value: city.name,
        label: city.name,
        id: city.id,
      }));
      setValue("city", null);
      setValue("cities", cities);
    }
  }, [province, setValue]);

  useEffect(() => {
    document.title = "عضویت";
  }, []);

  const handleRegister = async (data: FormData) => {
    setLoading(true);
    try {
      await axios.post(
        "https://nazronline.ir/api/user/register/",
        {
          username: data.username,
          password: data.password,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number,
          birth_date: formatedBirthDate,
          province: data.province?.value,
          city: data.city?.value,
          address: data.address,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
          },
        }
      );
      alert("ثبت نام شما با موفقیت انجام شد");
      navigate("/login");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errors = error.response.data.errors;
        if (errors) {
          Object.entries(errors).forEach(([field, message]) => {
            setError(field as keyof FormData, {
              type: "server",
              message: message as string,
            });
          });
        } else {
          setError("root", {
            type: "server",
            message: "خطای عمومی رخ داده است",
          });
        }
      } else {
        setError("root", {
          type: "network",
          message: "مشکل در ارتباط با سرور.",
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    // convert date picker calender to Christian calendar and also cahnge numbers to English because the api only accepts english numbers in this format: yyyy-mm-dd
    const birthdate = watch("birth_date");
    const stringBirthdate = birthdate?.toString();
    const gregorianDate = moment(
      stringBirthdate ? convertDateToFAEN(stringBirthdate, "english") : "",
      "jYYYY/jMM/jDD"
    ).format("YYYY-MM-DD");
    if (birthdate) {
      setFormatedBirthDate(gregorianDate);
    }
  }, [watch("birth_date")]);

  return (
    <section className="h-full flex items-center justify-center">
      <div className="w-full min-h-[600px] flex items-center justify-between border rounded-2xl overflow-hidden">
        <div className="w-full h-full py-8 px-6 ">
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex  flex-col gap-5 mx-auto sm:w-5/6  lg:w-3/4 xl:w-1/2"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">عضویت</h1>

            <label htmlFor="username">نام کاربری</label>
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
            <input
              {...register("username")}
              required
              id="username"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <label htmlFor="password">رمز عبور</label>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
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

            <label htmlFor="first_name">نام</label>
            {errors.first_name && (
              <p className="text-red-500">{errors.first_name.message}</p>
            )}
            <input
              {...register("first_name")}
              required
              id="first_name"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <label htmlFor="last_name">نام خانوادگی</label>
            {errors.last_name && (
              <p className="text-red-500">{errors.last_name.message}</p>
            )}
            <input
              {...register("last_name")}
              id="last_name"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <label htmlFor="phone_number">شماره تلفن</label>
            {errors.phone_number && (
              <p className="text-red-500">{errors.phone_number.message}</p>
            )}
            <input
              {...register("phone_number")}
              id="phone_number"
              placeholder="09XXXXXXXXX"
              required
              type="tel"
              className="border border-gray-300  bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <div className="flex flex-col gap-4 items-center  justify-between md:flex-row ">
              <div className="flex flex-col gap-2 w-full md:w-[170px]">
                {errors.birth_date && (
                  <p className="text-red-500 text-sm">
                    {errors.birth_date.message}
                  </p>
                )}
                <label htmlFor="birth_date">تاریخ تولد</label>

                <Controller
                  control={control}
                  name="birth_date"
                  render={({ field: { onChange, value } }) => (
                    <CustomDatePicker value={value} onChange={onChange} />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2 w-full md:w-[170px]">
                <label htmlFor="province">استان</label>
                {errors.province && (
                  <p className="text-red-500">
                    {errors.province.message?.toString()}
                  </p>
                )}
                <Controller
                  control={control}
                  name="province"
                  render={({ field }) => (
                    <CustomSelectInput
                      field={field}
                      inputID="province"
                      placeholder="استان"
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2 w-full md:w-[170px]">
                <label htmlFor="city">شهر</label>
                {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
                <Controller
                  control={control}
                  name="city"
                  render={({ field }) => (
                    <CustomSelectInput
                      field={field}
                      inputID="city"
                      placeholder="شهر"
                      dependOn={watch("cities") || []}
                    />
                  )}
                />
              </div>
            </div>

            <label htmlFor="address">آدرس</label>
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
            <textarea
              {...register("address")}
              placeholder="مثال: تهران، خیابان..."
              required
              id="address"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-28 p-2 placeholder:text-sm duration-200 focus:border-gray-800"
            ></textarea>

            <button
              className={`w-full h-12 bg-primary rounded-2xl duration-200 text-white  ${
                loading ? "opacity-50" : "hover:opacity-90"
              }`}
              disabled={loading}
            >
              {loading ? "لطفا صبر کنید" : "عضویت"}
            </button>

            <div className="flex gap-2 border-t pt-2">
              حساب کاربری دارید؟
              <Link to="/login" className=" text-primary">
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
