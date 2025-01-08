const UserInfoBox = ({
  title,
  value,
  lgInfo,
}: {
  title: string;
  value: string;
  lgInfo?: boolean;
}) => {
  return (
    <div
      className={`w-full ${
        !lgInfo ? "sm:w-2/4 md:w-[45%]  xl:w-[400px] h-20" : " min-h-24 "
      }   border rounded-md p-1 flex items-center mb-2 flex-wrap justify-around`}
    >
      <span className="text-gray-500"> {title}</span>
      <span className="text-gray-900 font-bold">{value} </span>
    </div>
  );
};

export default UserInfoBox;
