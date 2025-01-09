import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import handleGetUserProfileInfo from "./../utils/api/user/handleGetUserProfileInfo";
import { useNavigate } from "react-router";

const authContext = createContext<{
  loggedIn: boolean;
  loading: boolean;
  accessToken: string | boolean;
  profileInfo: any;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPorfileInfo: React.Dispatch<React.SetStateAction<string | undefined>>;
  updateAccessToken: () => void;
  handleLogOut: () => void;
}>({
  loggedIn: true,
  loading: true,
  accessToken: false,
  profileInfo: undefined,
  setLoggedIn: () => {},
  setLoading: () => {},
  updateAccessToken() {},
  handleLogOut() {},
  setPorfileInfo: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | boolean>(false);
  const [profileInfo, setPorfileInfo] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // log out
  const handleLogOut = async () => {
    try {
      console.warn("log out...");
      const response = await axios.post(
        "https://nazronlinetest.liara.run/user/logout/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
          },
        }
      );
      console.log(response);
      // localStorage.removeItem("refreshToken");
      // localStorage.removeItem("accessToken");
      // setLoggedIn(false);
      // setAccessToken(false);
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // get access token and user profile info
  const updateAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const response = await axios.post(
          "https://nazronlinetest.liara.run/user/refresh/",
          {
            refresh: refreshToken,
          }
        );

        const { access } = response.data;

        if (access) {
          localStorage.setItem("accessToken", access);
          const response = await handleGetUserProfileInfo(access);
          setPorfileInfo(response?.data);
          setLoggedIn(true);
          setAccessToken(access);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    updateAccessToken();
  }, []);

  useEffect(() => {
    console.log(profileInfo);
  }, [profileInfo]);
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
        handleLogOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => useContext(authContext);

export default useAuth;
export { AuthProvider };
