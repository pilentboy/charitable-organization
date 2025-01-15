import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const CustomDatePicker = ({
  value,
  onChange,
}: {
  value: any;
  onChange: any;
}) => {
  return (
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
  );
};

export default CustomDatePicker;
