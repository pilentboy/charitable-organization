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
import convertDateNumbersToFAEN from "../utils/Date&NumberConvertors/convertDateNumbersToFAEN";
import addCommasToNumber from "./../utils/Date&NumberConvertors/addCommasToNumber";
import removeCommasFromPersianNumber from "../utils/Date&NumberConvertors/removeCommasFromPersianNumber";
import useApiKey from "../hooks/useApiKey";

const Home = () => {
  const { loggedIn, accessToken } = useAuth(); // Get user authentication status
  const apiKey = useApiKey();

  // Selected offering form input states
  const [selectedofferingRadio, setselectedofferingRadio] = useState<any>(); // Selected radio button value for offerings
  const [selectedOfferingType, setselectedOfferingType] = useState<any>(); // Selected type of offering
  const [selectedOfferingTypeCount, setselectedOfferingTypeCount] =
    useState<any>(); // Selected count for the offering type
  const [selectedSocialMedia, setSelectedSocialMedia] = useState<
    string | undefined
  >(); // Selected social media option
  const [displayMessageBox, setDisplayMessageBox] = useState<boolean>(false); // Controls visibility of the message box
  const [socialMediPhoneNumber, setSocaiMediaPhoneNumber] = useState<
    string | undefined
  >();
  const [userMessage, setUserMessage] = useState<string>(""); // Message entered by the user
  const [acceptPP, setAcceptPP] = useState<boolean>(false); // Tracks if privacy policy is accepted
  // End of offering form input states

  const [totalPrice, setTotalPrice] = useState<any>(""); // Total price for the selected offering type
  const [calculatedTotalPrice, setCalculatedTotalPrice] = useState<any>(""); // Final calculated total price

  // Social media options state
  const [socialMediaOptions, setSocialMediaOptions] = useState<any>(); // List of social media options

  // Dropdown options for offering types
  const [offeringTypeOptionsData, setOfferingTypeOptionsData] = useState<
    { value: number; label: number; price: number; id: number }[] | null
  >();

  // loading
  const [loading, setLoading] = useState<boolean>(false);

  // erros states
  const [reportNumberError, setReportNumberError] = useState<
    string | undefined
  >();
  const [acceptPPError, setAcceptPPError] = useState<string | undefined>();
  // const [payError, setPayError] = useState<string | undefined>();

  // Dropdown options for offering type count
  const [
    selectedOfferingTypeCountOptions,
    setselectedOfferingTypeCountOptions,
  ] = useState<{ value: number; label: number; price: any }[] | null>();

  // Radio button options for offerings
  const [offeringRadioOptinos, setOfferingRadioOptions] = useState<any>([]); // Radio button options

  // Full data of the offering form
  const [offeringFormData, setOfferingFormData] = useState<any>(); // Form data fetched from the API

  // Control visibility of the offering form step
  const [displayFirstOfferingForm, setDisplayFirstOfferingForm] =
    useState<boolean>(true); // Controls form visibility

  // Generate a range of offering type count options
  const handleSetselectedOfferingTypeRange = (count: number) => {
    const result = [];
    for (let i = 1; i <= count; i++) {
      result.push({ value: i, label: i, price: null }); // Add count options
    }
    return result;
  };

  // Fetch offering form data from the API
  useEffect(() => {
    const handleGettingOfferingFormData = async () => {
      const response = await axios(
        "https://nazronline.ir/api/sacrifices/types/",
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
          },
        }
      );
      setOfferingFormData(response.data); // Store form data

      setOfferingRadioOptions(
        response.data.map((options: any) => options.name) // Populate radio button options
      );

      setselectedofferingRadio(response.data[0].name); // Set default radio selection

      if (response.data[0].has_aqiqah) {
        setOfferingTypeOptionsData(
          response.data[0]["aqiqah_types"].map((types: any) => ({
            value: types.name,
            label: types.name,
            price: types.price,
            id: types.id,
          }))
        );
        const firstOfferingType = response.data[0]["aqiqah_types"][0]; // Default selected type
        setselectedOfferingType({
          value: firstOfferingType.name,
          label: firstOfferingType.name,
          price: firstOfferingType.price,
          id: firstOfferingType.id,
        });
        setTotalPrice(firstOfferingType.price); // Set initial price
      } else {
        setTotalPrice(response.data[0].price); // Set price for non-Aqiqah offerings
      }
    };
    handleGettingOfferingFormData();
  }, []);

  // Update form data and related states when selected radio changes
  useEffect(() => {
    if (selectedofferingRadio) {
      const selectedRadioOption = offeringRadioOptinos.find(
        (option: any) => option === selectedofferingRadio
      );

      const selectedRadioOptionData = offeringFormData.find(
        (offering: any) => offering.name === selectedRadioOption // Get full data for the selected radio
      );

      const selectedTypes =
        selectedRadioOption && selectedRadioOptionData.has_aqiqah
          ? selectedRadioOptionData.aqiqah_types.map((aqigahInfo: any) => ({
              value: aqigahInfo.name,
              label: aqigahInfo.name,
              price: aqigahInfo.price,
              id: aqigahInfo.id,
            }))
          : null;

      if (selectedTypes) {
        setOfferingTypeOptionsData(selectedTypes); // Update type options
        setselectedOfferingType(selectedTypes[0]); // Default selected type
        setTotalPrice(selectedRadioOptionData.aqiqah_types[0].price); // Update price
      } else {
        setOfferingTypeOptionsData(null);
        setselectedOfferingType(null);
        setTotalPrice(selectedRadioOptionData.price); // Update price for non-Aqiqah
      }
      const optionTypeOrderRange = handleSetselectedOfferingTypeRange(
        selectedRadioOptionData.max_quantity
      );
      setselectedOfferingTypeCountOptions(optionTypeOrderRange); // Update count options
      setselectedOfferingTypeCount(optionTypeOrderRange[0]); // Default selected count
    }
  }, [selectedofferingRadio]);

  // Update total price when selected offering type changes
  useEffect(() => {
    if (selectedOfferingType) {
      setTotalPrice(selectedOfferingType.price); // Update price based on the selected type
    }
  }, [selectedOfferingType]);

  // Handle changes to the selected offering radio input
  const handleselectedofferingRadioChange = (e: any) => {
    setselectedofferingRadio(e.target.value); // Update selected radio value
  };

  // Fetch social media options from the API
  useEffect(() => {
    const handleGetSocialMedias = async () => {
      try {
        const response = await axios(
          "https://nazronline.ir/api/sacrifices/messaging-apps/",
          {
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": apiKey,
            },
          }
        );
        setSelectedSocialMedia("خیر تمایلی ندارم"); // Default selection
        setSocialMediaOptions(response.data); // Store social media options
      } catch (error) {
        console.log("خطا در دریافت لیست شبکه های اجتماعی"); // Log error message
      }
    };
    handleGetSocialMedias();
  }, []);

  // Fetch quotes (dummy implementation for now)
  const getQuotes = async () => {
    await handleGetQuotes(apiKey);
  };

  // Initialize offering radio options and set the document title
  useEffect(() => {
    getQuotes();
    setselectedofferingRadio(offeringRadioOptinos[0]?.title); // Default selection
    document.title = "نذر آنلاین"; // Set page title
  }, []);

  // Recalculate total price whenever type or count changes
  useEffect(() => {
    if (selectedOfferingType || selectedOfferingTypeCount) {
      const calculatedPrice =
        Number(
          convertDateNumbersToFAEN(
            removeCommasFromPersianNumber(totalPrice.toString()),
            "english"
          )
        ) * selectedOfferingTypeCount?.value;

      setCalculatedTotalPrice(
        convertDateNumbersToFAEN(
          addCommasToNumber(
            convertDateNumbersToFAEN(calculatedPrice.toString(), "english")
          ),
          "persian"
        )
      ); // Update calculated total price
    }
  }, [selectedOfferingType, selectedOfferingTypeCount, totalPrice]);

  const handleSubmitOfferingForm = async (e: any) => {
    // setPayError(undefined);
    setAcceptPPError(undefined);
    setReportNumberError(undefined);
    setLoading(true);

    e.preventDefault();
    if (loggedIn) {
      const selectedOfferingData = offeringFormData.find(
        (offering: any) => offering.name === selectedofferingRadio
      );

      const selectedSocialMediaId =
        selectedSocialMedia === "خیر تمایلی ندارم"
          ? false
          : socialMediaOptions.find(
              (socialMedia: any) => socialMedia.name === selectedSocialMedia
            );

      try {
        const response = await axios.post(
          "https://nazronline.ir/api/sacrifices/orders/",
          {
            sacrifice_type: selectedOfferingData.id,
            aqiqah_type: selectedOfferingType ? selectedOfferingType.id : null,
            quantity: selectedOfferingTypeCount.value,
            want_photo_report:
              selectedSocialMedia === "خیر تمایلی ندارم" ? false : true,
            messaging_app: !selectedSocialMediaId
              ? null
              : selectedSocialMediaId?.id,
            report_phone_number:
              selectedSocialMedia !== "خیر تمایلی ندارم"
                ? socialMediPhoneNumber
                : null,
            order_note: userMessage === "" ? null : userMessage,
            accept_terms: acceptPP,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json", 
              "X-API-KEY":apiKey
            },
          }
        );

        // reset some state values after a successfull submiting
        setDisplayMessageBox(false);
        setUserMessage("");
        setSocaiMediaPhoneNumber(undefined);
        setDisplayFirstOfferingForm(true);
        setSelectedSocialMedia("خیر تمایلی ندارم");

        if (response.status === 201) alert("ثبت شد");
      } catch (error: any) {
        // the resason why I'd to write these conditions for the errors in this form is that the server error fileds are different even for a same input value error!

        const { data } = error.response;
        const non_field_errors = error.response.data.non_field_errors; // erros for AcceptPP && another type of error for phoenumber when the phonenumber input is empty
        const report_phone_number = error.response.data.report_phone_number; // when user's phone entered doesn't start with 09 and it's not a valid phonenumber

        // error.response.data.report_phone_number
        if (non_field_errors) {
          if (data.non_field_errors[0] === "پذیرش قوانین اجباری است") {
            setAcceptPPError(data.non_field_errors[0]);
          } else {
            setReportNumberError(data.non_field_errors[0]);
          }
        } else {
          setReportNumberError(report_phone_number[0]);
        }

        console.log(error, "خطا در خرید");
      }
    } else {
      alert("برای پرداخت باید به حساب کاربری خود وارد شوید");
    }
    setLoading(false);
  };

  {
    /* <p className="text-red-500">
                {errors.server.message?.toString()}
              
              </p> */
  }

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

          <form
            className="pt-4 w-full px-2"
            onSubmit={handleSubmitOfferingForm}
          >
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
                        checked={selectedofferingRadio.value === option}
                        onChange={(e: any) =>
                          handleselectedofferingRadioChange(e)
                        }
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
                  {offeringTypeOptionsData && (
                    <div className="w-full md:w-1/2 flex flex-col gap-1">
                      <span className="font-bold text-gray-700 pr-1">نوع </span>
                      <Select
                        required
                        inputId="type"
                        placeholder="نوع"
                        options={offeringTypeOptionsData}
                        onChange={(e: any) => {
                          setselectedOfferingType(e);
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
                    <div className="w-full  md:w-1/2 flex flex-col gap-1">
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
                  <div className="flex flex-col gap-3 my-6">
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
                    {selectedSocialMedia !== "خیر تمایلی ندارم" && (
                      <>
                        {reportNumberError && (
                          <p className="text-red-500">
                            {reportNumberError.toString()}
                          </p>
                        )}
                        <input
                          className="w-48 h-9 rounded-md text-black border-gray-300 border outline-none p-2 placeholder:text-sm"
                          placeholder="شماره تلفن"
                          type="tell"
                          value={socialMediPhoneNumber}
                          onChange={(e) =>
                            setSocaiMediaPhoneNumber(e.target.value)
                          }
                        />
                      </>
                    )}
                    {/* <p className="text-gray-600 font-normal text-sm my-2 text-justify">
                      فقط در قربانی گوسفند و بز کامل و یا مرغ و خروس کامل گزارش
                      قابلیت ارسال را دارد و موارد مشارکت جمعی بصورت عمومی اطلاع
                      رسانی می شود .
                    </p> */}
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
                  <div className="flex flex-col   gap-2">
                    {acceptPPError && (
                      <p className="text-red-500">{acceptPPError.toString()}</p>
                    )}

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
                </div>
              </>
            )}

            <div className=" w-full flex-wrap justify-center gap-4 items-center flex py-10 border-y border-dotted font-bold text-gray-700  border-gray-300 text-xl font-vazirBold">
              {/* total cost */}
              <h1>مجموع پرداختی قربانی</h1>
              <span className="text-red-600 flex gap-1">
                {totalPrice &&
                  convertDateNumbersToFAEN(
                    addCommasToNumber(
                      convertDateNumbersToFAEN(
                        calculatedTotalPrice.toString(),
                        "english"
                      )
                    ),
                    "persian"
                  )}
                <span> تومان</span>
              </span>
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
                  className={`w-full sm:w-40 h-11  bg-primary  rounded-2xl text-white  text-centerduration-150 font-vazirBold  ${
                    loading ? "opacity-50" : " hover:opacity-80 "
                  }`}
                  disabled={loading}
                >
                  {loading ? "لطفا صبر کنید" : "پرداخت"}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* quotes */}
        <Quotes />
      </main>
    </>
  );
};

export default Home;
