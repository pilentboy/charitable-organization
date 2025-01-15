import Select from "react-select";
import provincesData from "../../data/provinces.json";
import { useEffect, useState } from "react";

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
  const [provinces, setProvincesx] = useState<any>();

  useEffect(() => {
    setProvincesx(
      provincesData.provinces.map((province: any) => ({
        value: province.name,
        id: province.id,
        label: province.name,
      }))
    );
  }, []);

  return (
    <Select
      required
      {...field}
      inputId={inputID}
      placeholder={placeholder}
      options={!dependOn ? provinces : dependOn}
      getOptionLabel={(option: any) => option.label}
      getOptionValue={(option: any) => option.value}
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
