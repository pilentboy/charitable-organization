import axios from "axios";

const handleUserLoginUsername = async (loginInfo: any) => {
  try {
    const response = await axios.post(
      "https://nazronlinetest.liara.run/user/register/",
      loginInfo 
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return error.message || "مشکلی پیش آمد";
  }
};

export default handleUserLoginUsername;
