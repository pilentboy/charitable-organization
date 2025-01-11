import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Select from "react-select";
import { provinces, ProvinceType } from "../data/provinces";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import moment from "jalali-moment";
import axios from "axios";
import convertDateToFAEN from "../utils/convertDateToFAEN";

// Define form data structure
type FormData = {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
  birth_date: DateObject | null;
  province: ProvinceType | null;
  city: { value: string; label: string } | null;
  cities: { value: string; label: string }[]; // list of cities, populated based on selected province
  address: string;
  passwordType: "password" | "text"; // type for showing/hiding password
};

const Register = () => {
  const [formatedBirthDate, setFormatedBirthDate] = useState<string>(""); // Stores formatted birth date
  const [loading, setLoading] = useState(false); // Handles the loading state of the form submission
  const navigate = useNavigate();

  // React Hook Form setup
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
      passwordType: "password", // Initial state of password visibility
    },
  });

  const province = watch("province"); // Watching the selected province for dynamic city population

  useEffect(() => {
    // When province is selected, populate cities for that province
    if (province) {
      const cities = province.cities.map((city) => ({
        value: city,
        label: city,
      }));
      setValue("city", null); // Reset city value when province changes
      setValue("cities", cities); // Set new cities list
    }
  }, [province, setValue]);

  useEffect(() => {
    document.title = "عضویت"; // Update document title for this page
  }, []);

  const handleRegister = async (data: FormData) => {
    console.log("wait for register", data);
    setLoading(true);
    try {
      // Send registration request
      await axios.post("https://nazronlinetest.liara.run/user/register/", {
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

      navigate("/login"); // Redirect to login page on success
    } catch (error: any) {
      // Handle errors from the registration API
      if (error.response && error.response.status === 400) {
        const errors = error.response.data.errors;
        if (errors) {
          // Set errors from API response on respective fields
          Object.entries(errors).forEach(([field, message]) => {
            setError(field as keyof FormData, {
              type: "server",
              message: message as string,
            });
          });
        } else {
          setError("root", {
            type: "server",
            message: "خطای عمومی رخ داده است", // General error message
          });
        }
      } else {
        setError("root", {
          type: "network",
          message: "مشکل در ارتباط با سرور.", // Network error message
        });
      }
      console.log(error, "خطای ثبت نام");
    }
    setLoading(false);
  };

  useEffect(() => {
    // Convert the selected birth date from Persian to Gregorian and change numbers to English for the API
    const birthdate = watch("birth_date");
    const stringBirthdate = birthdate?.toString();
    const gregorianDate = moment(
      stringBirthdate ? convertDateToFAEN(stringBirthdate, "english") : "",
      "jYYYY/jMM/jDD"
    ).format("YYYY-MM-DD"); // Format the date to the required Gregorian format
    console.log(gregorianDate);
    if (birthdate) {
      setFormatedBirthDate(gregorianDate); // Set the formatted birth date
    }
  }, [watch("birth_date")]);

  return (
    <section className="h-full flex items-center justify-center">
      <div className="w-full min-h-[600px] flex items-center justify-between border rounded-2xl overflow-hidden">
        <div className="w-full h-full py-8 px-6 ">
          <form
            onSubmit={handleSubmit(handleRegister)} // Form submission handler
            className="flex flex-col gap-5 mx-auto sm:w-5/6 lg:w-3/4 xl:w-1/2"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">عضویت</h1>

            {/* Username Input */}
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

            {/* Password Input */}
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
                  setValue("passwordType", currentType); // Toggle password visibility
                }}
              >
                {watch("passwordType") === "text" ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            {/* First Name Input */}
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

            {/* Last Name Input */}
            <label htmlFor="last_name">نام خانوادگی</label>
            {errors.last_name && (
              <p className="text-red-500">{errors.last_name.message}</p>
            )}
            <input
              {...register("last_name")}
              id="last_name"
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            {/* Phone Number Input */}
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
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            {/* Date of Birth */}
            <div className="flex flex-col gap-4 items-center justify-between md:flex-row">
              <div className="flex flex-col gap-2 w-full md:w-[170px]">
                <label htmlFor="birth_date">تاریخ تولد</label>
                {errors.birth_date && (
                  <p className="text-red-500">{errors.birth_date.message}</p>
                )}
                <Controller
                  control={control}
                  name="birth_date"
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      id="birth_date"
                      className="purple"
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

              {/* Province Selector */}
              <div className="w-full md:w-[170px]">
                <label htmlFor="province">استان</label>
                {errors.province && (
                  <p className="text-red-500">{errors.province.message}</p>
                )}
                <Select
                  {...register("province")}
                  id="province"
                  placeholder="انتخاب استان"
                  options={provinces}
                  getOptionLabel={(option: ProvinceType) => option.label}
                  getOptionValue={(option: ProvinceType) => option.value}
                  onChange={(selectedOption) =>
                    setValue("province", selectedOption)
                  }
                />
              </div>
            </div>

            {/* City Selector */}
            <div className="flex flex-col gap-4 items-center justify-between md:flex-row">
              <div className="w-full md:w-[170px]">
                <label htmlFor="city">شهر</label>
                {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
                <Select
                  {...register("city")}
                  id="city"
                  placeholder="انتخاب شهر"
                  options={watch("cities") || []} // Dynamically populate cities based on selected province
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  onChange={(selectedOption) =>
                    setValue("city", selectedOption)
                  }
                />
              </div>
            </div>

            {/* Address Input */}
            <label htmlFor="address">آدرس</label>
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
            <textarea
              {...register("address")}
              id="address"
              rows={4}
              required
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl p-3 duration-200 focus:border-gray-800"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className="w-full h-12 bg-blue-500 text-white rounded-2xl mt-5 disabled:bg-gray-400"
            >
              {loading ? "در حال ارسال..." : "ثبت نام"}
            </button>
            <p className="text-center mt-3">
              <span>قبلا ثبت نام کرده‌اید؟ </span>
              <Link to="/login" className="text-blue-600">
                ورود به حساب
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
