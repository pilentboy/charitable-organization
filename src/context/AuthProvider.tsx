import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import handleGetUserProfileInfo from "./../utils/api/user/handleGetUserProfileInfo";

// Creating the authContext with default values
const authContext = createContext<{
  loggedIn: boolean;
  loading: boolean;
  accessToken: string | boolean;
  profileInfo: any;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessToken: React.Dispatch<React.SetStateAction<boolean | string>>;
  setPorfileInfo: React.Dispatch<React.SetStateAction<any>>;
  updateAccessToken: () => void;
}>({
  loggedIn: true,
  loading: true,
  accessToken: false,
  profileInfo: undefined,
  setLoggedIn: () => {},
  setLoading: () => {},
  updateAccessToken() {},
  setPorfileInfo: () => {},
  setAccessToken: () => {},
});

// AuthProvider component that will wrap around the app to provide auth state
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // State variables to manage user authentication details
  const [loggedIn, setLoggedIn] = useState<boolean>(false); // Track if the user is logged in
  const [accessToken, setAccessToken] = useState<string | boolean>(false); // Store the access token (if available)
  const [profileInfo, setPorfileInfo] = useState<any>(); // Store the user's profile information
  const [loading, setLoading] = useState<boolean>(false); // Track loading state when fetching data

  // Function to update access token and fetch user profile information
  const updateAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken"); // Get the refresh token from localStorage
    if (refreshToken) {
      try {
        // Send a POST request to refresh the access token using the refresh token
        const response = await axios.post(
          "https://nazronline.ir/api/user/refresh/",
          { refresh: refreshToken }
        );

        const { access } = response.data; // Extract the new access token from the response

        if (access) {
          // Save the new access token in localStorage
          localStorage.setItem("accessToken", access);

          // Fetch the user profile information using the new access token
          const response = await handleGetUserProfileInfo(access);
          setPorfileInfo(response?.data); // Set profile information in state
          setLoggedIn(true); // Mark the user as logged in
          setAccessToken(access); // Store the access token in state
        }
      } catch (error) {
        console.log(error); // Handle errors, if any
      }
    }
  };

  // Call updateAccessToken once when the component mounts
  useEffect(() => {
    updateAccessToken();
  }, []); // Empty dependency array ensures this runs only once

 
  return (
    <authContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        loading,
        setLoading,
        accessToken,
        updateAccessToken,
        profileInfo,
        setPorfileInfo,
        setAccessToken,
      }}
    >
      {children} {/* Render the children components */}
    </authContext.Provider>
  );
};

// Custom hook to access the auth context easily
const useAuth = () => useContext(authContext);

export default useAuth; // Export the custom hook
export { AuthProvider }; // Export the provider so it can be used to wrap the app
