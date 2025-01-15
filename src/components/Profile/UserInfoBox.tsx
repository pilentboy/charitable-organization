import { useState } from "react";
import ModalContainer from "../Modal/ModalContainer";
import ModalItem from "../Modal/ModalItem";
import { FaEdit } from "react-icons/fa";

const UserInfoBox = ({
  title,
  value,
  lgInfo,
  fieldName,
  editable,
  editType,
  doubleSelects,
}: {
  title: string; // Title prop: The label for the information displayed (e.g., "Name").
  value: string; // Value prop: The actual information to be displayed (e.g., "John Doe").
  lgInfo?: boolean; // Optional prop to adjust the size of the box for large info sections.
  fieldName?: string;
  editable?: true;
  editType?: "text" | "date" | "select" | "double_selectes";
  doubleSelects?: boolean;
}) => {
  const [display, setDisplay] = useState<boolean>(false);

  return (
    <>
      <div
        className={`w-full  ${
          !lgInfo ? "sm:w-2/4 md:w-[45%]  xl:w-[400px] h-28" : "min-h-28"
        }   border rounded-md py-1 px-10 flex items-center text-wrap  mb-2 flex-wrap justify-between `}
      >
        <div className="flex flex-col  justify-evenly   h-full">
          {/* Title of the info box */}
          <span className="text-gray-500"> {title}</span>
          {/* Value of the info box, displayed with a bold font */}
          <span className="text-gray-900 max-w-full break-all font-bold">
            {value}
          </span>
        </div>

        {editable && (
          <button
            className="bg-gray-200  rounded-md p-2 hover:scale-105 duration-150"
            onClick={() => setDisplay(true)}
          >
            <FaEdit color="bkac" />
          </button>
        )}
      </div>

      {display && (
        <ModalContainer display={display} setDisplay={setDisplay}>
          <ModalItem
            title={title}
            fieldName={fieldName}
            setDisplay={setDisplay}
            editType={editType}
          />
        </ModalContainer>
      )}
    </>
  );
};

export default UserInfoBox;
