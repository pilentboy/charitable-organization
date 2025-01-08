import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import BottomProfileLink from "./BottomProfileLink";
import { useNavigate } from "react-router";

const BottomProfileLinks = ({
  setProfileDisplay,
  profileDisplay,
}: {
  setProfileDisplay: any;
  profileDisplay: "donations" | "profile";
}) => {
  const navigate = useNavigate();

  return (
    <div className=" fixed bottom-6 left-1/2 translate-x-[-50%] w-[90%] h-20  sm:w-96 border bg-white border-gray-300 flex items-center justify-between p-2 rounded-md">
      <BottomProfileLink
        title="مشخصات من"
        icon={<FaRegUser />}
        profileDisplay={profileDisplay}
        id="profile"
        action={() => setProfileDisplay("profile")}
      />
      <BottomProfileLink
        title="نذری های من"
        icon={<FaRegHeart />}
        id="donations"
        profileDisplay={profileDisplay}
        action={() => setProfileDisplay("donations")}
      />
      <BottomProfileLink
        title="خروج از حساب"
        icon={<CiLogout />}
        profileDisplay={profileDisplay}
        action={() => navigate("/")}
      />
    </div>
  );
};

export default BottomProfileLinks;
