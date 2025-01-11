import { useEffect, useState } from "react";
import handleGetContactUs from "../utils/api/content/handleGetContactUs";

const AboutUs = () => {
  const [contactUs, setContactUs] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      const req = await handleGetContactUs();
      console.log(req.data);
      setContactUs(req.data);
    };
    getData();

    document.title = "ارتباط با ما";
  }, []);

  return (
    <div className="w-full flex items-center flex-wrap gap-2">
      {contactUs
        ? contactUs.map((content: any) => (
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
