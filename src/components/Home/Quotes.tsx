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
        console.log(response.data)
      } catch (error: any) {
        console.log(error);
        return error.message || "مشکلی پیش آمد";
      }
    };

    handleGetQuotes();
  }, []);



  if (quitesContent)
    return quitesContent?.map((content: any) => (
      <div className="flex flex-col gap-1 pb-4" key={content.id}>
        <section className="flex flex-col gap-2  w-full h-fit items-center justify-center">
          <div className="w-full   items-center lg:w-[65%] gap-1   flex flex-col ">
            <pre className="sm:w-5/6 text-justify sm:text-start font-bold text-wrap">
              {content.content}
            </pre>
            <span className="text-gray-700   text-sm">{content.title}</span>
          </div>
          {content.media && (
            <img src={`https://nazronline.ir/${content.media}`} className="w-full sm:w-[800px] rounded-md" alt={content.title} />
          )}
        </section>
      </div>
    ));
};

export default Quotes;
