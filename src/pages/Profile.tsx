import { useEffect, useState } from "react";
import UserInfoBox from "../components/Profile/UserInfoBox";
import BottomProfileLinks from "../components/Profile/BottomProfileLinks";

const Profile = () => {
  const [profileDisplay, setProfileDisplay] = useState<"profile" | "donations">(
    "profile"
  );

  useEffect(() => {
    document.title = "حساب کاربری";
  }, []);

  const renderProfileInfo = () => (
    <div className="w-full h-fit flex flex-wrap gap-2 md:gap-0 items-center justify-center md:justify-between">
      {profileInfo.map(({ title, value, lgInfo }, index) => (
        <UserInfoBox key={index} title={title} value={value} lgInfo={lgInfo} />
      ))}
    </div>
  );

  const profileInfo = [
    { title: "نام و نام خانوادگی", value: "علی رضایی" },
    { title: "نام کاربری", value: "aliReza2" },
    { title: "تاریخ تولد", value: "۱۳۶۰/۱۲/۰۱" },
    { title: "شماره تلفن", value: "۰۹۰۰۰۰۰۰۰۰۰" },
    { title: "استان", value: "اصفهان" },
    { title: "شهر", value: "کاشان" },
    { title: "تاریخ عضویت", value: "1403/05/10" },
    {
      title: "آدرس",
      value: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
      lgInfo: true,
    },
  ];

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
