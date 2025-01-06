import { useEffect } from "react";

const ContactUs = () => {
    useEffect(()=>{
      document.title="تماس با ما"
    },[])
  return <h1> تماس با ما </h1>;
};

export default ContactUs;
