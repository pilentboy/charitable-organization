import axios from "axios";
const handleGetHomeSliderContent = async () => {
  try {
    const response = await axios.get(
      "https://nazronline.ir/api/content/slider/"
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return error.message || "مشکلی پیش آمد";
  }
};

export default handleGetHomeSliderContent;
