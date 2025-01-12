import axios from "axios";
import { useEffect, useState } from "react";

const Dedications = () => {
  const [dedicationContent, setDedicationContent] = useState<any>();

  useEffect(() => {
    const handleGetDedications = async () => {
      try {
        const response = await axios.get(
          "https://nazronline.ir/api/content/dedications/"
        );
        setDedicationContent(response.data);
      } catch (error: any) {
        console.log(error);
        return error.message || "مشکلی پیش آمد";
      }
    };

    handleGetDedications();
  }, []);


  if (dedicationContent)
    return dedicationContent?.map((content: any) => (
      <div className="flex flex-col gap-1 pb-4" key={content.id}>
        <h3>{content.title}</h3>
        <p className="text-gray-500 text-sm  text-justify"> {content.description}</p>
      </div>
    ));
};

export default Dedications;
