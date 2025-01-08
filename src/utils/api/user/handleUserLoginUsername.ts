import axios from "axios";

const handleUserLogin = async (loginInfo: any) => {
  try {
    const response = await axios.post(
      "https://nazronlinetest.liara.run/user/login/username/",
      loginInfo
    );

    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);

    console.log("Login successful!");
    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error.message || "مشکلی پیش آمد");
    return null;
  }
};

export default handleUserLogin