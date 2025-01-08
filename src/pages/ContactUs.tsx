import { useEffect, useState } from "react";
import handleGetContactUs from "../utils/api/content/handleGetContactUs";

const AboutUs = () => {
  const [contactUs, setContactUs] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      const data = await handleGetContactUs();
      setContactUs(data.status);
    };
    getData();

    document.title = "درباره ما";
  }, []);

  return (
    <h1 className="bg-primary p-5 rounded-md text-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      {contactUs ? contactUs : "در حال دریافت اطلاعات"}
    </h1>
  );
};

export default AboutUs;
