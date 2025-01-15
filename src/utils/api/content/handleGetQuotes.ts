import axios from "axios";

const handleGetQuotes = async (apiKey: any) => {
  try {
    const response = await axios.get(
      "https://nazronlinetest.liara.run/content/quotes/",
      { headers: { "Content-Type": "application/json", "X-API-KEY": apiKey } }
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return error.message || "مشکلی پیش آمد";
  }
};

export default handleGetQuotes;
