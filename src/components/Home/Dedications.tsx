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
        <pre className="text-gray-500 text-wrap text-sm  text-justify">
          {content.description}
        </pre>
        {content.media && (
          <img
            src={`https://nazronline.ir/${content.media}`}
            className="w-full sm:w-[800px] rounded-md"
            alt={content.title}
          />
        )}
      </div>
    ));
};

export default Dedications;
