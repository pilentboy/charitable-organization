import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import BottomProfileLink from "./BottomProfileLink";
// import { useNavigate } from "react-router";
import useAuth from "../../context/AuthProvider";

const BottomProfileLinks = ({
  setProfileDisplay,
  profileDisplay,
}: {
  setProfileDisplay: (display: "profile" | "donations") => void;
  profileDisplay: "donations" | "profile";
}) => {
  // const navigate = useNavigate();
  const { handleLogOut } = useAuth();

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
        />
      ))}
    </div>
  );
};

export default BottomProfileLinks;
