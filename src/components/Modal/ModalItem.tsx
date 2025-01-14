import { CiEdit } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../context/AuthProvider";
import handleGetUserProfileInfo from "../../utils/api/user/handleGetUserProfileInfo";

const ModalItem = ({
  title,
  fieldName,
  setDisplay,
}: {
  title: string;
  fieldName: string | undefined;
  setDisplay: any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { accessToken, setPorfileInfo } = useAuth();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    if (fieldName) {
      try {
        const updatedField = {
          [fieldName]: data.editInput,
        };


        const response = await axios.patch(
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
        console.error(error);
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

          <input
            id="editInput"
            {...register("editInput", { required: "این فیلد الزامی است" })}
            className="w-full h-9 rounded-md text-gray-800 border-gray-300 border outline-none p-2 placeholder:text-sm"
          />

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
