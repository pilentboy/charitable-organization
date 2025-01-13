const DonationInfoBox = ({
  title,
  value,
  toolTip,
  boldValue,
}: {
  title: string;
  value: string;
  toolTip?: string;
  boldValue?: boolean;
}) => {
  return (
    <div
      className={`items-center flex-wrap justify-between  gap-2 ${
        boldValue ? "hidden sm:flex" : "flex"
      }`}
      title={toolTip}
    >
      <div
        className={`w-fit p-2  cursor-pointer ${
          boldValue ? "bg-transparent" : "bg-gray-50"
        }  flex items-center justify-between text-sm rounded-lg   gap-2`}
      >
        <span className="text-gray-600">{title}</span>
        <span className={`${boldValue ? "font-bold  text-[15px]" : ""}`}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default DonationInfoBox;
