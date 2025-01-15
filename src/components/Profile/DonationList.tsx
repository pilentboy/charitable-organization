import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../context/AuthProvider";
import DonationItem from "./DonationItem";
import useApiKey from "../../hooks/useApiKey";

const DonationList = () => {
  const { accessToken } = useAuth();
  const [donationsList, setDonationsList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const apiKey = useApiKey();
  
  useEffect(() => {
    const handleDonationList = async () => {
      setLoading(true);
      try {
        const resposne = await axios(
          "https://nazronline.ir/api/sacrifices/orders/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
              "X-API-KEY": apiKey,
            },
          }
        );

        setDonationsList(resposne.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    handleDonationList();
  }, []);

  if (loading)
    return <h1 className="text-center w-3/4">درحال دریافت اطلاعات</h1>;

  if (donationsList.length > 0) {
    return (
      <div className="w-full sm:w-3/4 flex-col gap-2 flex   rounded-md   min-h-[70vh] ">
        {donationsList.map((donations: any) => (
          <div
            key={donations.id}
            className="w-full    min-h-[40px] cursor-pointer border rounded-md flex-col gap-2 flex mx-auto justify-between p-2"
          >
            <DonationItem donationInfo={donations} />
          </div>
        ))}
      </div>
    );
  } else {
    return <h1 className="text-center w-3/4 ">موردی یافت نشد</h1>;
  }
};

export default DonationList;
