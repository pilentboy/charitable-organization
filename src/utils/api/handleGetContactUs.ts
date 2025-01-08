import axios from "axios";
const handleContactUs = async () => {
  try {
    const response = await axios.get(
      "https://nazronlinetest.liara.run/content/about-us/"
    );
    return response;
  } catch (error: any) {
    return error.message || "مشکلی پیش آمد";
  }
};

export default handleContactUs;
