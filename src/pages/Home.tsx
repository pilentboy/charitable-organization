import { useEffect, useState } from "react";
import Slider from "../components/Home/Slider";
import Select, { components } from "react-select";
import { BiSolidDownArrow } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import useAuth from "../context/AuthProvider";
import handleGetQuotes from "../utils/api/content/handleGetQuotes";
import SocialMediaRadioBTN from "../components/Home/SocialMediaRadioBTN";
import axios from "axios";
import Dedications from "../components/Home/Dedications";
import Quotes from "../components/Home/Quotes";

const Home = () => {
  const { loggedIn } = useAuth();

  // selected offering form inputs states
  const [selectedofferingRadio, setselectedofferingRadio] = useState<string>();
  const [selectedOfferingType, setselectedOfferingType] = useState<any>();
  const [selectedOfferingTypeCount, setselectedOfferingTypeCount] =
    useState<any>();
  const [selectedSocialMedia, setSelectedSocialMedia] = useState<
    string | undefined
  >();
  const [displayMessageBox, setDisplayMessageBox] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>("");
  const [acceptPP, setAcceptPP] = useState<boolean>(false);
  // end

  // social media list
  const [socialMediaOptions, setSocialMediaOptions] = useState<any>();

  // selects values
  const [selectedOfferingTypeOptions, setselectedOfferingTypeOptions] =
    useState<{ value: number; label: number }[] | null>();

  // select counts
  const [
    selectedOfferingTypeCountOptions,
    setselectedOfferingTypeCountOptions,
  ] = useState<{ value: number; label: number }[] | null>();

  // radio button options
  const [offeringRadioOptinos, setOfferingRadioOptions] = useState<any>([]);

  // offering form data
  const [offeringFormData, setOfferingFormData] = useState<any>();

  // control form step change from selecting offering to pay
  const [displayFirstOfferingForm, setDisplayFirstOfferingForm] =
    useState<boolean>(true);

  const handleSetselectedOfferingTypeRange = (count: number) => {
    const result = [];

    for (let i = 1; i <= count; i++) {
      result.push({ value: i, label: i });
    }
    return result;
  };

  // get offering form data
  useEffect(() => {
    const handleGettingOfferingFormData = async () => {
      const response = await axios(
        "https://nazronline.ir/api/sacrifices/types/"
      );
      setOfferingFormData(response.data);
      setselectedofferingRadio(response.data[0].name);
      setOfferingRadioOptions(
        response.data.map((options: any) => options.name)
      );
    };
    handleGettingOfferingFormData();
  }, []);
  useEffect(() => {
    console.log(offeringFormData, "xx");
    console.log(selectedofferingRadio, "offering radio selected");
    console.log(offeringRadioOptinos, "offering radio options");
  }, [offeringFormData, selectedofferingRadio, offeringRadioOptinos]);

  useEffect(() => {
    if (selectedofferingRadio) {
      const selectedOption = offeringRadioOptinos.find(
        (option: any) => option.title === selectedofferingRadio
      );
      const selectedTypes =
        selectedOption && selectedOption.types
          ? selectedOption.aqigah_types
          : null;

      if (selectedTypes) {
        setselectedOfferingTypeOptions(selectedTypes);
        setselectedOfferingType(selectedTypes[0]);
        const optionTypeOrderRange = handleSetselectedOfferingTypeRange(
          selectedTypes[0].count
        );
        setselectedOfferingTypeCountOptions(optionTypeOrderRange);
        setselectedOfferingTypeCount(optionTypeOrderRange[0]);
      } else {
        setselectedOfferingTypeOptions(null);
        setselectedOfferingTypeCountOptions(null);
      }
    }
  }, [selectedofferingRadio]);

  // useEffect(() => {
  //   if (selectedOfferingType) {
  //     const optionTypeOrderRange = handleSetselectedOfferingTypeRange(
  //       selectedOfferingType.count
  //     );
  //     setselectedOfferingTypeCountOptions(optionTypeOrderRange);
  //     setselectedOfferingTypeCount(optionTypeOrderRange[0]);
  //   }
  // }, [selectedOfferingType]);

  const handleselectedofferingRadioChange = (e: any) => {
    setselectedofferingRadio(e.target.value);
  };

  // getting social media
  useEffect(() => {
    const handleGetSocialMedias = async () => {
      try {
        const response = await axios(
          "https://nazronline.ir/api/sacrifices/messaging-apps/"
        );
        setSelectedSocialMedia("خیر تمایلی ندارم");
        setSocialMediaOptions(response.data);
      } catch (error) {
        console.log("خطا در دریافت لیست شبکه های اجتماعی");
      }
    };
    handleGetSocialMedias();
  }, []);

  const getQuotes = async () => {
    const res = await handleGetQuotes();
  };

  useEffect(() => {
    getQuotes();
    setselectedofferingRadio(offeringRadioOptinos[0]?.title);
    document.title = "نذر آنلاین";
  }, []);

  return (
    <>
      <header className="mb-10 w-full">
        <Slider />
      </header>

      <main className="w-full h-full pb-6  rounded-lg">
        {/* title */}
        <div className="flex flex-col items-center gap-3 font-vazirBold sm:gap-6">
          <h1 className="text-primary font-[900]  text-3xl sm:text-[50px]">
            نذر آنلاین
          </h1>
          <div className="flex items-center text-[20px] flex-wrap  justify-center sm:text-[22px] font-[900] gap-[3px]">
            <h2> پرداخت نذورات</h2>
            <span className="bg-[#ed1b35] rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm p-1 text-white">
              قربانی گوسفند
            </span>
            ،<h2> بز و مرغ</h2>
          </div>
        </div>

        {/* offering form */}
        <div className="w-full md:w-[96%] xl:w-[65%] my-6 mx-auto h-fit rounded-2xl bg-[#efeff0c9] flex flex-col items-center py-4 px-6 ">
          {/* form parts */}
          <div className="text-sm gap-2 font-medium  w-full flex items-center border-b border-dotted pb-4 border-gray-300">
            <span
              onClick={() => setDisplayFirstOfferingForm(true)}
              className={`cursor-pointer ${
                displayFirstOfferingForm ? "text-black" : "text-gray-400"
              }`}
            >
              1 نوع قربانی
            </span>
            <span
              onClick={() => setDisplayFirstOfferingForm(false)}
              className={` cursor-pointer ${
                !displayFirstOfferingForm ? "text-black" : "text-gray-400"
              }`}
            >
              2 ثبت سفارش
            </span>
          </div>

          <form className="pt-4 w-full px-2">
            {displayFirstOfferingForm ? (
              <>
                {/* offering type */}
                <div className="flex w-full  items-center flex-col gap-4 font-bold md:flex-row md:flex-wrap">
                  {offeringRadioOptinos.map((option: any, index: any) => (
                    <label
                      key={index}
                      className="flex gap-2 w-full md:w-56 h-14 rounded-2xl border border-primary bg-[#13a89e36] items-center p-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={option}
                        value={option}
                        checked={selectedofferingRadio === option}
                        onChange={handleselectedofferingRadioChange}
                        className="hidden peer"
                      />
                      <div className="w-6 h-6 rounded-lg border border-gray-400 flex items-center justify-center bg-white  ">
                        <span
                          className={`w-3/4 h-3/4 test rounded-md transition-colors ${
                            selectedofferingRadio === option
                              ? "bg-primary"
                              : "bg-white"
                          }`}
                        ></span>
                      </div>
                      <span>{option}</span>
                    </label>
                  ))}
                </div>

                {/* selection */}
                <div className="flex flex-col gap-4 mt-10 mb-6 items-center justify-between  w-full md:flex-row">
                  {/* type */}
                  {selectedOfferingTypeOptions && (
                    <div className="w-full md:w-5/6 flex flex-col gap-1">
                      <span className="font-bold text-gray-700 pr-1">نوع </span>
                      <Select
                        required
                        inputId="type"
                        placeholder="نوع"
                        options={selectedOfferingTypeOptions}
                        onChange={(e: any) => {
                          setselectedOfferingType(e);
                          console.log(e);
                        }}
                        value={selectedOfferingType}
                        components={{
                          DropdownIndicator: (props) => (
                            <components.DropdownIndicator {...props}>
                              <BiSolidDownArrow color="#13A89E" size="20px" />
                            </components.DropdownIndicator>
                          ),
                        }}
                        className="w-full text-black"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            height: "52px",
                            borderRadius: "8px",
                            padding: "0 10px",
                            backgroundColor: "white",
                          }),
                          menu: (provided) => ({
                            ...provided,
                            backgroundColor: "white",
                          }),
                          dropdownIndicator: (provided) => ({
                            ...provided,
                            color: "#13A89E",
                          }),
                          option: (provided) => ({
                            ...provided,
                            padding: "12px 20px",
                            backgroundColor: "white",
                            cursor: "pointer",
                            color: "black",
                          }),
                        }}
                      />
                    </div>
                  )}
                  {/* count */}
                  {selectedOfferingTypeCountOptions && (
                    <div className="w-full  md:w-5/6 flex flex-col gap-1">
                      <span className="font-bold text-gray-700 pr-1">
                        تعداد
                      </span>
                      <Select
                        required
                        inputId="count"
                        placeholder="تعداد"
                        options={selectedOfferingTypeCountOptions}
                        onChange={(e: any) => setselectedOfferingTypeCount(e)}
                        value={selectedOfferingTypeCount}
                        components={{
                          DropdownIndicator: (props) => (
                            <components.DropdownIndicator {...props}>
                              <BiSolidDownArrow color="#13A89E" size="20px" />
                            </components.DropdownIndicator>
                          ),
                        }}
                        className="w-full text-black"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            height: "52px",
                            borderRadius: "8px",
                            padding: "0 10px",
                            backgroundColor: "white",
                          }),
                          menu: (provided) => ({
                            ...provided,
                            backgroundColor: "white",
                          }),
                          dropdownIndicator: (provided) => ({
                            ...provided,
                            color: "#13A89E",
                          }),
                          option: (provided) => ({
                            ...provided,
                            padding: "12px 20px",
                            backgroundColor: "white",
                            cursor: "pointer",
                            color: "black",
                          }),
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* dedication text */}
                <Dedications />
              </>
            ) : (
              <>
                {/* social media */}

                {socialMediaOptions?.length > 0 && (
                  <div className="flex flex-col gap-4 my-2">
                    <span className="font-bold text-gray-700">
                      آیا میخواهید نذر آنلاین برایتان گزارش قربانی را ارسال کند؟
                    </span>
                    <div className="flex gap-2 md:items-center flex-col md:flex-row flex-wrap">
                      <SocialMediaRadioBTN
                        setSelectedSocialMedia={setSelectedSocialMedia}
                        value={"خیر تمایلی ندارم"}
                        selectedSocialMedia={selectedSocialMedia}
                      />
                      {socialMediaOptions.map((socialMedia: any) => (
                        <SocialMediaRadioBTN
                          key={socialMedia.id}
                          setSelectedSocialMedia={setSelectedSocialMedia}
                          value={socialMedia.name}
                          title={socialMedia.display_text}
                          selectedSocialMedia={selectedSocialMedia}
                          logo={socialMedia.logo}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 font-normal text-sm my-2 text-justify">
                      فقط در قربانی گوسفند و بز کامل و یا مرغ و خروس کامل گزارش
                      قابلیت ارسال را دارد و موارد مشارکت جمعی بصورت عمومی اطلاع
                      رسانی می شود .
                    </p>
                  </div>
                )}

                {/* user message */}
                <div className="flex gap-3 flex-col">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDisplayMessageBox((pre) => !pre)}
                      type="button"
                      className={`w-6 h-6 flex  items-center  justify-center  ${
                        displayMessageBox
                          ? "bg-primary border-none"
                          : "bg-white border border-gray-600"
                      }`}
                    >
                      {displayMessageBox && (
                        <TiTick color="white" size={"20px"} />
                      )}
                    </button>
                    <span
                      onClick={() => setDisplayMessageBox((pre) => !pre)}
                      className="text-gray-950  text-[15px] font-medium cursor-pointer"
                    >
                      توضیحاتی دارم که مایل به درج هستم !
                    </span>
                  </div>
                  {displayMessageBox && (
                    <textarea
                      value={userMessage}
                      onChange={(e: any) => setUserMessage(e.target.value)}
                      name="usermessage"
                      id="usermmessage"
                      className="border border-gray-400 h-28 rounded-md overflow-y-auto  text-gray-700 outline-none p-2 focus:border-gray-600"
                    ></textarea>
                  )}
                </div>

                {/* accept P&P */}
                <div className="flex gap-3 flex-col  my-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAcceptPP((pre) => !pre)}
                      type="button"
                      className={`w-6 h-6 flex  items-center  justify-center  ${
                        acceptPP
                          ? "bg-primary border-none"
                          : "bg-white border border-gray-600"
                      }`}
                    >
                      {acceptPP && <TiTick color="white" size={"20px"} />}
                    </button>
                    <span
                      onClick={() => setAcceptPP((pre) => !pre)}
                      className="text-gray-950  text-[15px]  font-medium cursor-pointer"
                    >
                      با قوانین و شرایط نذر آنلاین موافق هستم.
                    </span>
                  </div>
                </div>
              </>
            )}

            <div className=" w-full flex-wrap justify-center gap-4 items-center flex py-10 border-y border-dotted font-bold text-gray-700  border-gray-300 text-xl font-vazirBold">
              {/* total cost */}
              <h1>مجموع پرداختی قربانی</h1>
              <span className="text-red-600">۲۶۰,۰۰۰ تومان </span>
            </div>

            <div className="flex items-center flex-col sm:flex-row pt-2 gap-2">
              <button
                type="button"
                onClick={() => setDisplayFirstOfferingForm((pre) => !pre)}
                className={`w-full sm:w-40 h-11  rounded-2xl text-white  text-center hover:opacity-80 duration-150 font-vazirBold ${
                  displayFirstOfferingForm ? "bg-primary" : "bg-gray-600"
                }`}
              >
                {displayFirstOfferingForm ? "ادامه" : "قبلی"}
              </button>
              {!displayFirstOfferingForm && (
                <button
                  type={loggedIn ? "submit" : "button"}
                  onClick={() => {
                    loggedIn
                      ? alert("پرداخت")
                      : alert(
                          "لطفا جهت پرداخت ابتدا به حساب کاربری خود وارد شوید"
                        );
                  }}
                  className="w-full sm:w-40 h-11  bg-primary  rounded-2xl text-white  text-center hover:opacity-80 duration-150 font-vazirBold "
                >
                  پرداخت
                </button>
              )}
            </div>
          </form>
        </div>

        {/* quotes */}
        <Quotes />
        <div className="w-full  h-72 bg-gray-200 flex items-center justify-center mt-5"></div>
      </main>
    </>
  );
};

export default Home;
