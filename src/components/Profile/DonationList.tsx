import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../context/AuthProvider";
import DonationItem from "./DonationItem";

const DonationList = () => {
  const { accessToken } = useAuth();
  const [donationsList, setDonationsList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleDonationList = async () => {
      setLoading(true);
      try {
        const resposne = await axios(
          "https://nazronline.ir/api/sacrifices/orders/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
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

  if (loading) return <h1>درحال دریافت اطلاعات</h1>;

  if (donationsList.length > 0) {
    {
      donationsList.map((donations: any) => (
        <div
          key={donations.id}
          className="w-full lg:w-3/4 min-h-[40px] cursor-pointer border rounded-md flex-col gap-2 flex mx-auto justify-between p-2"
        >
          <DonationItem donationInfo={donations} />
        </div>
      ));
    }
  } else {
    return <h1>موردی یافت نشد</h1>;
  }
};

export default DonationList;
