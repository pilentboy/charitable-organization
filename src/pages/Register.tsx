import { useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Select, { SingleValue } from "react-select";
import { provinces, ProvinceType } from "../data/provinces";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  // States for form inputs
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [birthdate, setBirthdate] = useState<DateObject | null>(null);
  const [province, setProvince] = useState<SingleValue<ProvinceType>>(null);
  const [city, setCity] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const [address, setAddress] = useState("");
  const [passwordType, setPasswordType] = useState<string>("password");

  // list of the cities when user selectes a province
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    if (province) {
      setCities(province.cities.map((city) => ({ value: city, label: city })));
    }
  }, [province]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="h-full flex items-center justify-center">
      <div className="w-full min-h-[600px] flex items-center justify-between border rounded-2xl overflow-hidden">
        <div className="w-full h-full py-8 px-6 ">
          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-5 mx-auto sm:w-1/2"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">عضویت</h1>

            <label htmlFor="username">نام کاربری</label>
            <input
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
              autoFocus
            />

            <label htmlFor="firstname">نام</label>
            <input
              name="firstname"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <label htmlFor="lastname">نام خانوادگی</label>
            <input
              name="lastname"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <label htmlFor="password">رمز عبور</label>
            <div className="flex justify-between items-center border border-gray-300 bg-gray-100 rounded-2xl h-12 p-2 duration-200 focus:border-gray-800">
              <input
                name="password"
                id="password"
                type={passwordType}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[90%] h-full bg-transparent outline-none border-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (passwordType === "password") {
                    setPasswordType("text");
                  } else {
                    setPasswordType("password");
                  }
                }}
              >
                {passwordType === "text" ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <label htmlFor="phonenumber">شماره تلفن</label>
            <input
              name="phonenumber"
              id="phonenumber"
              type="tel"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800"
            />

            <label htmlFor="birthdate">تاریخ تولد</label>
            <DatePicker
              id="birthdate"
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              value={birthdate}
              onChange={setBirthdate}
              inputClass="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-12 p-2 duration-200 focus:border-gray-800 placeholder:text-sm"
              placeholder="تاریخ تولد"
            />

            <label htmlFor="province">استان</label>
            <Select
              inputId="province"
              value={province}
              onChange={(selectedOption) => setProvince(selectedOption)}
              placeholder="انتخاب استان"
              options={provinces}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: "200px",
                  borderColor: "#ddd",
                  borderRadius: "8px",
                  padding: "0 10px",
                }),
                menu: (provided) => ({
                  ...provided,
                  width: "200px",
                }),
              }}
            />

            <label htmlFor="city">شهر</label>
            <Select
              inputId="city"
              value={city}
              onChange={(selectedOption) => setCity(selectedOption)}
              placeholder="انتخاب شهر"
              options={cities}
              isDisabled={!province}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: "200px",
                  borderColor: "#ddd",
                  borderRadius: "8px",
                  padding: "0 10px",
                }),
                menu: (provided) => ({
                  ...provided,
                  width: "200px",
                }),
              }}
            />

            <label htmlFor="address">آدرس</label>
            <textarea
              name="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 bg-gray-100 outline-none rounded-2xl h-28 p-2 duration-200 focus:border-gray-800"
            ></textarea>

            <button className="w-full h-12 bg-green-600 rounded-2xl duration-200 text-white hover:opacity-90">
              عضویت
            </button>
            <div className="flex gap-2">
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
