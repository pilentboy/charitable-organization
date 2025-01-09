import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Select from "react-select";
import { provinces, ProvinceType } from "../data/provinces";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import handleUserRegister from "../utils/api/user/handleUserRegister";
import convertDateToFAEN from "../utils/convertDateToFAEN";
type FormData = {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
  birth_date: DateObject | null;
  province: ProvinceType | null;
  city: { value: string; label: string } | null;
  cities: { value: string; label: string }[];
  address: string;
  passwordType: "password" | "text";
};

const Register = () => {
  const [formatedBirthDate, setFormatedBirthDate] = useState<string>("");

  const navigate = useNavigate();

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

  useEffect(() => {
    document.title = "عضویت";
  }, []);

  const handleRegister = async (data: FormData) => {
    console.log("wait for register");
    await handleUserRegister({
      username: data.username,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      birth_date: formatedBirthDate,
      province: data.province?.value,
      city: data.city?.value,
      address: data.address,
    });
    navigate("/login");
  };

  useEffect(() => {
    const birthdate = watch("birth_date");
    if (birthdate) {
      setFormatedBirthDate(convertDateToFAEN(birthdate.format(), "english"));
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
            <input
              {...register("username")}
              required
              id="username"
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

            <label htmlFor="first_name">نام</label>
            <input
              {...register("first_name")}
              required
              id="first_name"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <label htmlFor="last_name">نام خانوادگی</label>
            <input
              {...register("last_name")}
              id="last_name"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <label htmlFor="phone_number">شماره تلفن</label>
            <input
              {...register("phone_number")}
              id="phone_number"
              placeholder="09XXXXXXXXX"
              required
              type="tel"
              className="border border-gray-300  bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <div className="flex flex-col gap-4 items-center  justify-between md:flex-row">
              <div className="flex flex-col gap-2 w-full md:w-[170px]">
                <label htmlFor="birth_date">تاریخ تولد</label>
                <Controller
                  control={control}
                  name="birth_date"
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      id="birth_date"
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      inputClass="border border-gray-300 w-full bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800 placeholder:text-sm"
                      placeholder="تاریخ تولد"
                      value={value || null}
                      onChange={onChange}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2 w-full md:w-[170px]">
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
                          width: "100%",
                          height: "48px",
                          borderColor: "#d1d5db",
                          borderRadius: "16px",
                          padding: "0 10px",
                          backgroundColor: "#f3f4f6",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          width: "100%",
                        }),
                      }}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2 w-full md:w-[170px]">
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
                          width: "100%",
                          height: "48px",
                          borderColor: "#d1d5db",
                          borderRadius: "16px",
                          padding: "0 10px",
                          backgroundColor: "#f3f4f6",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          width: "100%",
                        }),
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <label htmlFor="address">آدرس</label>
            <textarea
              {...register("address")}
              placeholder="مثال: تهران، خیابان..."
              required
              id="address"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-28 p-2 placeholder:text-sm duration-200 focus:border-gray-800"
            ></textarea>

            <button className="w-full h-12 bg-primary rounded-2xl duration-200 text-white hover:opacity-90">
              عضویت
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


