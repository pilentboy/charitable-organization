import { useEffect, useState } from "react";
import UserInfoBox from "../components/Profile/UserInfoBox";
import BottomProfileLinks from "../components/Profile/BottomProfileLinks";
import useAuth from "../context/AuthProvider";
import convertDateToFAEN from "../utils/convertDateToFAEN";

const Profile = () => {
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
      join_date,
    },
  } = useAuth();
  const [profileDisplay, setProfileDisplay] = useState<"profile" | "donations">(
    "profile"
  );
  useEffect(() => {
    document.title = "حساب کاربری";
  }, []);

  const renderProfileInfo = () => {
    return (
      <div className="w-full h-fit flex flex-wrap gap-2 md:gap-0 items-center justify-center md:justify-between">
        <UserInfoBox title={"نام"} value={first_name} />
        <UserInfoBox title={"نام خانوادگی"} value={last_name} />
        <UserInfoBox title={"نام کاربری"} value={username} />
        <UserInfoBox title={"شماره تلفن"} value={phone_number} />
        <UserInfoBox title={"شهر"} value={city} />
        <UserInfoBox title={"استان"} value={province} />
        <UserInfoBox title={"تاریخ تولد"} value={birth_date} />
        <UserInfoBox
          title={"تاریخ عضویت"}
          value={convertDateToFAEN(join_date.split("T")[0], "persian")}
        />
        <UserInfoBox title={"آدرس"} value={address} />
      </div>
    );
  };

  return (
    <div className="flex justify-between mt-10 mb-32">
      <BottomProfileLinks
        setProfileDisplay={setProfileDisplay}
        profileDisplay={profileDisplay}
      />

      {profileDisplay === "profile" ? (
        renderProfileInfo()
      ) : (
        <h1 className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          وضعیت نذری ها
        </h1>
      )}
    </div>
  );
};

export default Profile;
