import { useEffect } from "react";

const AboutUs = () => {
  useEffect(()=>{
    document.title="درباره ما"
  },[])
  return <h1> درباره ما </h1>;
};

export default AboutUs;
