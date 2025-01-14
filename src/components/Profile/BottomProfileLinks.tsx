import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import BottomProfileLink from "./BottomProfileLink"; // Import the BottomProfileLink component for rendering each individual link
import useAuth from "../../context/AuthProvider"; // Custom hook to manage authentication state
import { useRef, useState } from "react";
import { useNavigate } from "react-router"; // React Router hook to handle navigation
import axios from "axios";

const BottomProfileLinks = ({
  setDisplay,
  setProfileDisplay, // Function to update the profile display state ("profile" or "donations")
  profileDisplay, // State to keep track of the current section displayed ("profile" or "donations")
  display,
}: {
  setProfileDisplay: (display: "profile" | "donations") => void;
  profileDisplay: "donations" | "profile";
  display: string;
  setDisplay: any;
}) => {
  // State to manage the loading status during the logout process
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Hook to navigate between pages

  // Destructure the required state and functions from the AuthProvider context
  const { setLoggedIn, setAccessToken, setPorfileInfo, accessToken } =
    useAuth();

  // handle log out user
  const handleLogOut = async () => {
    setLoading(true); // Set loading to true when starting the logout process
    try {
      // Make a POST request to the logout endpoint with the refresh token
      await axios.post(
        "https://nazronline.ir/api/user/logout/",
        { refresh: localStorage.getItem("refreshToken") },
        {
          headers: {
            Authorization: `Bearer ${accessToken})}`, // Send the access token in the request header
          },
        }
      );
      // Show the logout success message from the API response
      // alert(response.data.message);

      // Clear the tokens from localStorage
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      // Reset authentication state
      setLoggedIn(false);
      setAccessToken(false);
      setPorfileInfo(null);
      // Navigate to the home page after logging out
      navigate("/");
    } catch (error: any) {
      console.log(error); // Log any errors
      alert("خطا در ارتباط با api هنگام خروج از حساب"); // Display an error message in case of failure
    }
    setLoading(false); // Reset loading state after logout is complete
  };

  // Array of links to render in the bottom navigation bar
  const links = [
    {
      title: "مشخصات من", // Title for the profile link
      icon: <FaRegUser />, // Icon for the profile link
      id: "profile", // Unique ID for the link
      action: () => setProfileDisplay("profile"), // Action to set profile display when clicked
    },
    {
      title: "نذری های من", // Title for the donations link
      icon: <FaRegHeart />, // Icon for the donations link
      id: "donations", // Unique ID for the link
      action: () => setProfileDisplay("donations"), // Action to set donations display when clicked
    },
    {
      title: "خروج از حساب", // Title for the logout link
      icon: <CiLogout />, // Icon for the logout link
      id: "logout", // Unique ID for the link
      action: () => handleLogOut(), // Action to trigger logout when clicked
    },
  ];
  const profileLinkRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={`h-fit w-full mb-4 border border-gray-400  bg-white z-[999]  gap-6 items-center justify-start py-2 px-8  rounded-md sm:w-48 sm:mb-0  flex-col  ${display} flex fixed -translate-x-1/2  left-1/2 -bottom-4 sm:translate-x-0 sm:translate-y-0 sm:static sm:left-0 sm:bottom-0  sm:px-2 duration-150`}
      ref={profileLinkRef}
      onClick={(e: any) => {
        if (
          profileLinkRef.current &&
          !profileLinkRef.current.contains(e.target as Node)
        ) {
          setDisplay("translate-y-[100%]");
        }
      }}
    >
      {links.map(({ title, icon, id, action }) => (
        <BottomProfileLink
          setDisplay={setDisplay}
          key={id} // Unique key for each link
          title={title} // Title of the link
          icon={icon} // Icon of the link
          profileDisplay={profileDisplay} // Pass the current profile display state
          id={id} // Unique ID for the link
          action={action} // Action to be executed when the link is clicked
          loading={loading} // Pass the loading state to BottomProfileLink for visual feedback
        />
      ))}
    </div>
  );
};

export default BottomProfileLinks;
