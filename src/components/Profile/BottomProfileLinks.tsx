import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import BottomProfileLink from "./BottomProfileLink";
import useAuth from "../../context/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const BottomProfileLinks = ({
  setProfileDisplay,
  profileDisplay,
}: {
  setProfileDisplay: (display: "profile" | "donations") => void;
  profileDisplay: "donations" | "profile";
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { setLoggedIn, setAccessToken, setPorfileInfo } = useAuth();

  const handleLogOut = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://nazronlinetest.liara.run/user/logout/",
        { refresh: localStorage.getItem("refreshToken") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert(response.data.message);
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      setLoggedIn(false);
      setAccessToken(false);
      setPorfileInfo(null);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      alert("خطا در ارتباط با api هنگام خروج از حساب");
    }
    setLoading(false);
  };

  const links = [
    {
      title: "مشخصات من",
      icon: <FaRegUser />,
      id: "profile",
      action: () => setProfileDisplay("profile"),
    },
    {
      title: "نذری های من",
      icon: <FaRegHeart />,
      id: "donations",
      action: () => setProfileDisplay("donations"),
    },
    {
      title: "خروج از حساب",
      icon: <CiLogout />,
      id: "logout",
      action: () => handleLogOut(),
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 translate-x-[-50%] w-[90%] h-20 sm:w-96 border bg-white border-gray-300 flex items-center justify-between p-2 rounded-md">
      {links.map(({ title, icon, id, action }) => (
        <BottomProfileLink
          key={id}
          title={title}
          icon={icon}
          profileDisplay={profileDisplay}
          id={id}
          action={action}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default BottomProfileLinks;
