import axios from "axios";
const handleGetSliderSliders = async () => {
  try {
    const response = await axios.get(
      "https://nazronlinetest.liara.run/content/slider/"
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return error.message || "مشکلی پیش آمد";
  }
};

export default handleGetSliderSliders;
