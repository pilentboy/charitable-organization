import { useEffect, useState } from "react"; // Importing React hooks: useEffect for side effects and useState for managing state.
import UserInfoBox from "../components/Profile/UserInfoBox"; // Importing UserInfoBox component for displaying individual user info.
import BottomProfileLinks from "../components/Profile/BottomProfileLinks"; // Importing BottomProfileLinks component for navigation between profile sections.
import useAuth from "../context/AuthProvider"; // Importing custom hook to access the authenticated user's information.
import convertDateToFAEN from "../utils/Date&NumberConvertors/convertDateNumbersToFAEN"; // Importing utility function to convert dates to Persian format.
import convertDateToPersian from "../utils/Date&NumberConvertors/convertDateToPersian";
import convertDateYearToPersian from "../utils/Date&NumberConvertors/convertDateYearToPersian";
import DonationList from "../components/Profile/DonationList";
import { IoMdMenu } from "react-icons/io";

const Profile = () => {
  // Destructuring user information (first_name, last_name, etc.) from the context.
  const {
    profileInfo: {
      first_name,
      last_name,
      address,
      phone_number,
      username,
      birth_date,
      city,
      province,
      date_joined,
    },
  } = useAuth(); // Using useAuth to access the authenticated user's profile data.

  const [profileDisplay, setProfileDisplay] = useState<"profile" | "donations">(
    "profile"
  ); // State to track which section to display: 'profile' or 'donations'.

  useEffect(() => {
    document.title = "حساب کاربری"; // Set the document title to "حساب کاربری" (User Account) when the component is mounted.
  }, []); // Empty dependency array means this effect runs once when the component is mounted.

  // Function to render the user's profile information in a series of UserInfoBox components.
  const renderProfileInfo = () => {
    return (
      <div className="w-full sm:w-3/4 h-fit flex flex-wrap gap-2 md:gap-0 items-center justify-center md:justify-between">
        {/* Displaying various pieces of user information like first name, last name, username, etc. */}
        <UserInfoBox
          title={"نام"}
          value={first_name}
          fieldName="first_name"
          editable
        />
        <UserInfoBox
          title={"نام خانوادگی"}
          value={last_name}
          editable
          fieldName="last_name"
        />
        <UserInfoBox title={"نام کاربری"} value={username} />
        <UserInfoBox
          title={"شماره تلفن"}
          value={convertDateToFAEN(phone_number, "persian")}
        />
        <UserInfoBox
          title={"شهر"}
          value={city}
          editable
          editType="select"
          fieldName="city"
        />
        <UserInfoBox
          title={"استان"}
          value={province}
          fieldName="province"
          editable
          editType="double_selectes"
        />
        <UserInfoBox
          title={"تاریخ تولد"}
          value={convertDateToFAEN(
            convertDateYearToPersian(birth_date),
            "persian"
          )}
          fieldName="birth_date"
          editable
          editType="date"
        />
        {/* Formatting the join date to Persian and displaying it. */}
        <UserInfoBox
          title={"تاریخ عضویت"}
          value={convertDateToFAEN(
            convertDateToPersian(date_joined),
            "persian"
          )}
        />
        <UserInfoBox
          title={"آدرس"}
          value={address}
          fieldName="address"
          editable
          lgInfo
        />
      </div>
    );
  };
  const [display, setDisplay] = useState<
    "translate-y-[100%]" | "translate-y-[0]"
  >("translate-y-[100%]");

  return (
    <div className="flex flex-col justify-between mt-6 mb-32 sm:flex-row">
      <button
        type="button"
        className="flex items-center justify-center gap-2 mb-4 font-bold text-black hover:text-primary sm:hidden"
        onClick={() =>
          setDisplay((pre) =>
            pre === "translate-y-[0]" ? "translate-y-[100%]" : "translate-y-[0]"
          )
        }
      >
        <IoMdMenu />
        منوی پروفایل
      </button>

      {/* Rendering the BottomProfileLinks component for navigating between profile sections. */}
      <BottomProfileLinks
        display={display}
        setDisplay={setDisplay}
        // Passing the state updater function to allow navigation between sections.
        setProfileDisplay={setProfileDisplay}
        // Passing the current display state (profile or donations).
        profileDisplay={profileDisplay}
      />

      {/* Conditionally rendering the profile or donations section based on profileDisplay state. */}
      {profileDisplay === "profile" ? (
        // If profileDisplay is "profile", render the user's profile information.
        renderProfileInfo()
      ) : (
        // user donations
        <DonationList />
      )}
    </div>
  );
};

export default Profile;
