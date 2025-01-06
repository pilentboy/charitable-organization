import { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    document.title = "حساب کاربری";
  }, []);
  return <h1> پروفایل </h1>;
};

export default Profile;
