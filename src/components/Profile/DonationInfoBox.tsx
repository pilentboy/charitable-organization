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
      className="flex items-center flex-wrap justify-between  gap-2"
      title={toolTip}
    >
      <div
        className={`w-fit p-2  cursor-pointer ${
          boldValue ? "bg-transparent" : "bg-gray-50"
        }  flex items-center justify-between text-[14px] rounded-lg   gap-2`}
      >
        <span className="text-gray-600">{title}</span>
        <span className={`${boldValue ? "font-bold text-[12px]" : ""}`}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default DonationInfoBox;
