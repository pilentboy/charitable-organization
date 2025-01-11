const UserInfoBox = ({
  title,
  value,
  lgInfo,
}: {
  title: string; // Title prop: The label for the information displayed (e.g., "Name").
  value: string; // Value prop: The actual information to be displayed (e.g., "John Doe").
  lgInfo?: boolean; // Optional prop to adjust the size of the box for large info sections.
}) => {
  return (
    <div
      className={`w-full ${
        !lgInfo ? "sm:w-2/4 md:w-[45%]  xl:w-[400px] h-20" : " min-h-24 "
      }   border rounded-md p-1 flex items-center mb-2 flex-wrap justify-around`}
    >
      {/* Title of the info box */}
      <span className="text-gray-500"> {title}</span>
      {/* Value of the info box, displayed with a bold font */}
      <span className="text-gray-900 font-bold">{value} </span>
    </div>
  );
};

export default UserInfoBox;
