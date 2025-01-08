import axios from "axios";

const handleUserRegister = async (registerInfo: any) => {
  try {
    const response = await axios.post(
      "https://nazronlinetest.liara.run/user/register/",
       registerInfo 
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return error.message || "مشکلی پیش آمد";
  }
};

export default handleUserRegister;
