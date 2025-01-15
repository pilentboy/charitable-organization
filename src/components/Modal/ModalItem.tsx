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

const ModalItem = ({
  title,
  fieldName,
  setDisplay,
  editType,
}: {
  title: string;
  fieldName: string | undefined;
  setDisplay: any;
  editType?: "text" | "date" | "select";
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formatedBirthDate, setFormatedBirthDate] = useState<string>("");
  const [locationValue, setLocationValue] = useState<string>("");

  const { accessToken, setPorfileInfo } = useAuth();

  const { register, handleSubmit, control, watch } = useForm();

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

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    if (fieldName) {
      try {
        const detectFiledType =
          editType === "date" ? formatedBirthDate : data.editInput;

        const updatedField = {
          [fieldName]: detectFiledType,
        };


        await axios.patch(
          "https://nazronline.ir/api/user/profile/personal-info/",
          updatedField,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setDisplay(false);
        const updatedPersoalInfo = await handleGetUserProfileInfo(accessToken);
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
    <div className="flex flex-col items-center justify-between p-2  w-[90vw] sm:w-80 h-48 rounded-md bg-white">
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

          {editType === "select" ? (
            <span>select</span>
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
