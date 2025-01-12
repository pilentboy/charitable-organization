import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import BottomProfileLink from "./BottomProfileLink"; // Import the BottomProfileLink component for rendering each individual link
import useAuth from "../../context/AuthProvider"; // Custom hook to manage authentication state
import { useState } from "react";
import { useNavigate } from "react-router"; // React Router hook to handle navigation
import axios from "axios";

const BottomProfileLinks = ({
  setProfileDisplay, // Function to update the profile display state ("profile" or "donations")
  profileDisplay, // State to keep track of the current section displayed ("profile" or "donations")
}: {
  setProfileDisplay: (display: "profile" | "donations") => void;
  profileDisplay: "donations" | "profile";
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
      const response = await axios.post(
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

  return (
    <div className="fixed bottom-6 left-1/2 translate-x-[-50%] w-[90%] h-20 sm:w-96 border bg-white border-gray-300 flex items-center justify-between p-2 rounded-md">
      {links.map(({ title, icon, id, action }) => (
        <BottomProfileLink
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
