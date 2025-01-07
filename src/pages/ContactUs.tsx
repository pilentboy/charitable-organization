import { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    document.title = "ارتباط با ما";
  }, []);
  return (
    <h1 className="bg-primary p-5 rounded-md text-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
  
      ارتباط با ما
    </h1>
  );
};

export default ContactUs;
