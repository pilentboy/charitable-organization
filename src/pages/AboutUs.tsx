import { useEffect, useState } from "react";
import handleGetAboutUs from "../utils/api/content/handleGetAboutUs";

const AboutUs = () => {
  const [aboutUs, setAboutUs] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      const req = await handleGetAboutUs();
      console.log(req.data);
      setAboutUs(req.data);
    };
    getData();

    document.title = "درباره ما";
  }, []);

  return (
    <div className="w-full flex items-center flex-wrap gap-2">
      {aboutUs
        ? aboutUs.map((content: any) => (
            <div key={content.id} className="flex flex-col ">
              <span>{content.title}</span>
              <span>{content.content}</span>
            </div>
          ))
        : "در حال دریافت اطلاعات"}
    </div>
  );
};

export default AboutUs;
