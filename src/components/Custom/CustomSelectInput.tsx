import Select from "react-select";
import { provinces, ProvinceType } from "../../data/provinces";

const CustomSelectInput = ({
  field,
  inputID,
  placeholder,
  dependOn,
}: {
  field: any;
  inputID: string;
  dependOn?: any;
  placeholder?: string;
}) => {
  return (
    <Select
      required
      {...field}
      inputId={inputID}
      placeholder={placeholder}
      options={!dependOn ? provinces : dependOn}
      getOptionLabel={(option: ProvinceType) => option.label}
      getOptionValue={(option: ProvinceType) => option.value}
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
  );
};

export default CustomSelectInput;
