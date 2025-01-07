import { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    document.title = "حساب کاربری";
  }, []);
  return (
    <h1 className="bg-primary p-5 rounded-md text-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      حساب کاربری
    </h1>
  );
};

export default Profile;
