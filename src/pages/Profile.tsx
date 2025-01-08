import { useEffect, useState } from "react";
import UserInfoBox from "../components/Profile/UserInfoBox";
import BottomProfileLinks from "../components/Profile/BottomProfileLinks";

const Profile = () => {
  const [profileDisplay, setProfileDisplay] = useState<"profile" | "donations">("profile");

  useEffect(() => {
    document.title = "حساب کاربری";
  }, []);

  return (
    <div className="flex justify-between  mt-10 mb-32 ">
      <BottomProfileLinks setProfileDisplay={setProfileDisplay} profileDisplay={profileDisplay} />

      {profileDisplay === "profile" ? (
        <div className="w-full  h-fit flex flex-wrap gap-2 md:gap-0 items-center justify-center md:justify-between  ">
          <UserInfoBox title="نام و نام خانوادگی" value="علی رضایی" />
          <UserInfoBox title="نام کاربری" value="aliReza2" />
          <UserInfoBox title="ناریخ تولد" value="۱۳۶۰/۱۲/۰۱" />
          <UserInfoBox title="شماره تلفن" value="۰۹۰۰۰۰۰۰۰۰۰" />
          <UserInfoBox title="استان" value="اصفهان" />
          <UserInfoBox title="شهر" value="کاشان" />
          <UserInfoBox
            title="آدرس"
            value="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
            lgInfo
          />
        </div>
      ) : (
        <h1 className="text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          وضعیت نذری ها
        </h1>
      )}
    </div>
  );
};

export default Profile;
