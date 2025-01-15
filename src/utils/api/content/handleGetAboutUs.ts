import axios from "axios";
const handleGetAboutUs = async (apiKey:any) => {
  try {
    const response = await axios.get(
      "https://nazronline.ir/api/content/about-us/",
      {
        headers:{
          "Content-Type": "application/json", 
          "X-API-KEY":apiKey
        }
      }
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return error.message || "مشکلی پیش آمد";
  }
};

export default handleGetAboutUs;
