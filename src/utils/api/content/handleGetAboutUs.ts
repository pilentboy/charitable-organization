import axios from "axios";
const handleGetAboutUs = async () => {
  try {
    const response = await axios.get(
      "https://nazronline.ir/api/content/about-us/"
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return error.message || "مشکلی پیش آمد";
  }
};

export default handleGetAboutUs;
