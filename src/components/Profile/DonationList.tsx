import axios from "axios";
import { useEffect } from "react";

const DonationList = () => {
  useEffect(() => {
    const handleDonationList = async () => {
      try {
        const resposne = await axios(
          "https://nazronline.ir/api/sacrifices/orders/"
        );
        console.log(resposne);
      } catch (error) {
        console.log(error);
      }
    };
    handleDonationList();
  }, []);
  return <div className="w-full min-h-screen bg-gray-300"> </div>;
};

export default DonationList;
