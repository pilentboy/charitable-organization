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
      <div className="flex flex-col gap-1 pb-4" key={content.id}>
        <section className="flex  w-full h-fit items-center justify-center">
          <div className="w-full   items-center lg:w-[65%] gap-1   flex flex-col ">
            <p className="sm:w-5/6 text-justify sm:text-start font-bold ">
              {content.content}
            </p>
            <span className="text-gray-700   text-sm">{content.title}</span>
          </div>
        </section>
      </div>
    ));
};

export default Quotes;
