import { CiEdit } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../../context/AuthProvider";
import handleGetUserProfileInfo from "../../utils/api/user/handleGetUserProfileInfo";
import convertDateToFAEN from "../../utils/Date&NumberConvertors/convertDateNumbersToFAEN";
import moment from "jalali-moment";
import CustomDatePicker from "../Custom/CustomDatePicker";
import useApiKey from "../../hooks/useApiKey";
import CustomSelectInput from "../Custom/CustomSelectInput";
import citiesData from "../../data/cities.json";

const ModalItem = ({
  title,
  fieldName,
  setDisplay,
  editType,
  doubleSelects,
}: {
  title: string;
  fieldName: string | undefined;
  setDisplay: any;
  editType?: "text" | "date" | "select";
  doubleSelects?: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formatedBirthDate, setFormatedBirthDate] = useState<string>("");

  const { accessToken, setPorfileInfo } = useAuth();

  const { register, handleSubmit, control, watch, setValue } = useForm();
  const apiKey = useApiKey();

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

  const province = watch("province");

  // only works when using two selects | for example when editinig province because when a user wants to change the province, the city must be edited too.
  useEffect(() => {
    if (province) {
      const provinceInfo = citiesData.filter(
        (cities: any) => cities.id === province.id
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

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    if (fieldName) {
      console.log(data);
      try {
        const detectFiledType = doubleSelects
          ? data
          : editType === "date"
          ? formatedBirthDate
          : editType === "select"
          ? data.provinceOnly.value
          : data.editInput;

        let updatedField = {};

        if (doubleSelects) {
          updatedField = {
            province: detectFiledType.province.value,
            city: detectFiledType.city.value,
          };
        } else {
          updatedField = { [fieldName]: detectFiledType };
        }

        await axios.put(
          "https://nazronline.ir/api/user/profile/personal-info/",
          updatedField,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
              "X-API-KEY": apiKey,
            },
          }
        );

        setDisplay(false);
        const updatedPersoalInfo = await handleGetUserProfileInfo(
          accessToken,
          apiKey
        );
        setPorfileInfo(updatedPersoalInfo?.data);
      } catch (error: any) {
        setError(
          error.response?.data?.[fieldName] ||
            "خطایی در ویرایش اطلاعات رخ داده است."
        );
      }
    } else {
      setError("خطا در دریافت نوع فیلد برای ویرایش");
    }

    setLoading(false);
  };

  return (
    <div
      className={`flex flex-col items-center justify-between p-2  w-[90vw] sm:w-80  rounded-md bg-white ${
        doubleSelects ? "h-60" : "h-48"
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <CiEdit />
        <span className="text-sm">ویرایش اطلاعات</span>
        <IoMdClose
          onClick={() => setDisplay(false)}
          className="cursor-pointer"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col  items-center  gap-2">
          <label htmlFor="editInput" className="text-gray-700 self-start mr-2">
            {title}
          </label>

          {error && <span className="text-red-500 text-sm">{error}</span>}

          {doubleSelects ? (
            <>
              <Controller
                control={control}
                name="province"
                render={({ field }) => (
                  <CustomSelectInput
                    field={field}
                    inputID="province"
                    placeholder={title}
                    width="w-5/6"
                  />
                )}
              />
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <CustomSelectInput
                    field={field}
                    inputID="city"
                    placeholder="شهر"
                    dependOn={watch("cities") || []}
                    width="w-5/6"
                  />
                )}
              />
            </>
          ) : editType === "select" ? (
            <Controller
              control={control}
              name="provinceOnly"
              render={({ field }) => (
                <CustomSelectInput
                  field={field}
                  inputID="provinceOnly"
                  placeholder={title}
                  width="w-5/6"
                />
              )}
            />
          ) : editType === "date" ? (
            <Controller
              control={control}
              name="birth_date"
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker value={value} onChange={onChange} />
              )}
            />
          ) : (
            <input
              id="editInput"
              {...register("editInput", { required: "این فیلد الزامی است" })}
              className="w-full h-9 rounded-md text-gray-800 border-gray-300 border outline-none p-2 placeholder:text-sm"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className={`outline-none h-9 bg-primary rounded-md text-white text-sm w-full  border ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
            }`}
          >
            {loading ? "لطفا صبر کنید" : "ثبت ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalItem;
