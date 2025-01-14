import DonationInfoBox from "./DonationInfoBox";
import convertDateToPersian from "./../../utils/Date&NumberConvertors/convertDateToPersian";
import convertDateNumbersToFAEN from "./../../utils/Date&NumberConvertors/convertDateNumbersToFAEN";
import { useState } from "react";

const DonationItem = ({
  donationInfo: {
    aqiqah_type_name,
    total_price_display,
    sacrifice_type_name,
    status_display,
    report_details: { message, status, messaging_app, phone_number },
    jalali_created_at,
    quantity,
    want_photo_report,
  },
}: {
  donationInfo: any;
}) => {
  const [displayInfo, setDisplayInfo] = useState<boolean>(false);

  return (
    <>
      {displayInfo && (
        <>
          <div
            className="flex flex-col sm:flex-row  justify-around flex-wrap gap-2"
            onClick={() => setDisplayInfo(false)}
          >
            <DonationInfoBox title={"تعداد"} value={quantity} />
            <DonationInfoBox title={"نوع قربانی"} value={sacrifice_type_name} />
            {aqiqah_type_name && (
              <DonationInfoBox title={"نوع عقیقه"} value={aqiqah_type_name} />
            )}
            <DonationInfoBox
              title={"هزینه پرداختی"}
              value={total_price_display}
            />
          </div>
          <div
            className="border-t flex flex-wrap justify-around gap-1 py-1 w-full"
            onClick={() => setDisplayInfo(false)}
          >
            <DonationInfoBox
              title={"درخواست گزارش تصویری"}
              value={want_photo_report ? "دارای گزارش تصویری" : message}
              toolTip={status}
            />
            {messaging_app && (
              <DonationInfoBox title={"پیام رسان"} value={messaging_app} />
            )}
            {phone_number && (
              <DonationInfoBox title={"شماره تلفن"} value={phone_number} />
            )}
          </div>
        </>
      )}

      {/* donation created date and status info */}
      <div
        className={`flex flex-wrappy-1 text-[14px] sm:text-[15px] w-full ${
          displayInfo ? "border-t  justify-center gap-2 " : "border-none  justify-between "
        }`}
        onClick={() => setDisplayInfo((e) => !e)}
      >
        {!displayInfo && (
          <DonationInfoBox
            title={"نوع قربانی"}
            value={sacrifice_type_name}
            boldValue={true}
          />
        )}
        <div className="w-fit p-2 cursor-pointer  flex items-center justify-between  gap-2">
          <span className="text-gray-600">تاریخ ایجاد </span>
          <span className="text-black font-bold ">
            {convertDateNumbersToFAEN(
              convertDateToPersian(jalali_created_at),
              "persian"
            )}
          </span>
        </div>

        <div className="w-fit p-2 cursor-pointer  flex items-center    gap-2">
          <span className="text-gray-600">وضعیت</span>
          <span
            className={`font-bold  ${
              status_display === "تحویل داده شده"
                ? "text-primary"
                : "text-black"
            } `}
          >
            {status_display}
          </span>
        </div>
      </div>
    </>
  );
};

export default DonationItem;
