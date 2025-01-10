import axios from "axios";
const handleContactUs = async () => {
  try {
    const response = await axios.get(
      "https://nazronlinetest.liara.run/content/contact-us/"
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return error.message || "مشکلی پیش آمد";
  }
};

export default handleContactUs;
