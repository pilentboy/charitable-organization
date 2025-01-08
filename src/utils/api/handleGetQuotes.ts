import axios from "axios";

const handleGetQuotes = async () => {
  try {
    const response = await axios.get(
      "https://nazronlinetest.liara.run/content/quotes/"
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return error.message || "مشکلی پیش آمد";
  }
};

export default handleGetQuotes;
