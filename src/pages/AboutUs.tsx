import { useEffect, useState } from "react";
import handleGetAboutUs from "../utils/api/content/handleGetAboutUs";

const AboutUs = () => {
  const [aboutUs, setAboutUs] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      const req = await handleGetAboutUs();
      setAboutUs(req.status);
    };
    getData();

    document.title = "درباره ما";
  }, []);

  return (
    <h1 className="bg-primary p-5 rounded-md text-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      {aboutUs ? aboutUs : "در حال دریافت اطلاعات"}
    </h1>
  );
};

export default AboutUs;
