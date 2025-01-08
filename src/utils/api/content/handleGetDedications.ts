import axios from "axios";
const handleGetDedications = async () => {
  try {
    const response = await axios.get(
      "https://nazronlinetest.liara.run/content/dedications/"
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return error.message || "مشکلی پیش آمد";
  }
};

export default handleGetDedications;
