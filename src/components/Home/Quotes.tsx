import axios from "axios";
import { useEffect, useState } from "react";

const Quotes = () => {
  const [quitesContent, setQuitesContent] = useState<any>();

  useEffect(() => {
    const handleGetQuotes = async () => {
      try {
        const response = await axios.get(
          "https://nazronline.ir/api/content/quotes/"
        );
        setQuitesContent(response.data);
      } catch (error: any) {
        console.log(error);
        return error.message || "مشکلی پیش آمد";
      }
    };

    handleGetQuotes();
  }, []);

  if (quitesContent)
    return quitesContent?.map((content: any) => (
      <section
        key={content.id}
        className="flex flex-col gap-2   w-full h-fit items-center justify-center"
      >
        <div className="w-full justify-center  items-center text-center lg:w-[65%] gap-1   flex flex-col ">
          <pre className="text-center sm:text-start font-bold text-wrap">
            {content.content}
          </pre>
          <span className="text-gray-700   text-sm">{content.title}</span>
        </div>
        {content.media && (
          <img
            src={`https://nazronline.ir/${content.media}`}
            className="w-full sm:w-[800px] rounded-md"
            alt={content.title}
          />
        )}
      </section>
    ));
};

export default Quotes;
