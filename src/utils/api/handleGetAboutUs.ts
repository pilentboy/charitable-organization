import axios from "axios";
const handleGetAboutUs = async () => {
  try {
    const response = await axios.get(
      "https://nazronlinetest.liara.run/content/about-us/"
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return error.message || "مشکلی پیش آمد";
  }
};

export default handleGetAboutUs;
