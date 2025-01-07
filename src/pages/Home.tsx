import { useEffect, useState } from "react";
import Slider from "../components/Home/Slider";
import Select, { components } from "react-select";
import { BiSolidDownArrow } from "react-icons/bi";
import { TiTick } from "react-icons/ti";

const Home = () => {
  // offering form inputs states
  const [offeringRadio, setofferingRadio] = useState<string>();
  const [offeringType, setOfferingType] = useState<any>();
  const [offeringTypeCount, setOfferingTypeCount] = useState<number>(1);
  const [socialMedia, setSocialMedia] = useState<string>("خیر تمایلی ندارم");
  const [displayMessageBox, setDisplayMessageBox] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>("");
  const [acceptPP, setAcceptPP] = useState<boolean>(false);
  // end

  // selects values
  const [offeringTypeOptions, setOfferingTypeOptions] = useState([]);

  // select counts
  const [offeringTypeCountOptions, setOfferingTypeCountOptions] = useState([
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
  ]);

  // radio button options
  const [offeringRadioOptions, setofferingRadioOptions] = useState<any>([
    {
      title: "قربانی بز",
      id: 1,
      types: [
        {
          value: "گوسفند 10 میلیونی",
          label: "گوسفند 10 میلیونی",
          count: 5,
        },
        {
          value: "گوسفند 20 میلیونی",
          label: "گوسفند 20 میلیونی",
          count: 5,
        },
      ],
    },
    {
      title: "قربانی مرغ",
      id: 3,
      types: [
        {
          value: "ذبح خروس",
          label: "ذبح خروس",
          count: 10,
        },
        {
          value: "ذبح مرغ",
          label: "ذبح مرغ",
          count: 5,
        },
      ],
    },
  ]);

  const [displayFirstOfferingForm, setDisplayFirstOfferingForm] =
    useState<boolean>(true);

  useEffect(() => {
    if (offeringRadio) {
      const selectedOption = offeringRadioOptions.find(
        (option: any) => option.title === offeringRadio
      );
      const selectedTypes = selectedOption ? selectedOption.types : [];
      setOfferingTypeOptions(selectedTypes);
      setOfferingType(selectedTypes[0]);
    }
    console.log(offeringType);
  }, [offeringRadio]);

  const handleOfferingRadioChange = (e: any) => {
    setofferingRadio(e.target.value);
  };

  const handleSendSocialMediaRadioChange = (e: any) => {
    setSocialMedia(e.target.value);
  };

  useEffect(() => {
    setofferingRadio(offeringRadioOptions[0]?.title);
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
            نذری آنلاین
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
                  {offeringRadioOptions.map((option: any) => (
                    <label
                      key={option.id}
                      className="flex gap-2 w-full md:w-56 h-14 rounded-2xl border border-primary bg-[#13a89e36] items-center p-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={option.title}
                        value={option.title}
                        checked={offeringRadio === option.title}
                        onChange={handleOfferingRadioChange}
                        className="hidden peer"
                      />
                      <div className="w-6 h-6 rounded-lg border border-gray-400 flex items-center justify-center bg-white  ">
                        <span
                          className={`w-3/4 h-3/4 test rounded-md transition-colors ${
                            offeringRadio === option.title
                              ? "bg-primary"
                              : "bg-white"
                          }`}
                        ></span>
                      </div>
                      <span>{option.title}</span>
                    </label>
                  ))}
                  {/* <label className="flex gap-2 w-full md:w-56 h-14 rounded-2xl border border-primary bg-[#13a89e36] items-center p-3 cursor-pointer">
                    <input
                      type="radio"
                      name="dynamic"
                      value="option1"
                      checked={offeringRadio === "option1"}
                      onChange={handleOfferingRadioChange}
                      className="hidden peer"
                    />
                    <div className="w-6 h-6 rounded-lg border border-gray-400 flex items-center justify-center bg-white  ">
                      <span
                        className={`w-3/4 h-3/4 test rounded-md transition-colors ${
                          offeringRadio === "option1"
                            ? "bg-primary"
                            : "bg-white"
                        }`}
                      ></span>
                    </div>
                    <span>قربانی گوسفند و بز</span>
                  </label> */}

                  {/* Option 2 */}
                  {/* <label className="flex gap-2 w-full md:w-56 h-14 rounded-2xl border border-primary bg-[#13a89e36] items-center p-3 cursor-pointer">
                    <input
                      type="radio"
                      name="dynamic"
                      value="option2"
                      checked={offeringRadio === "option2"}
                      onChange={handleOfferingRadioChange}
                      className="hidden peer"
                    />
                    <div className="w-6 h-6 rounded-lg border border-gray-400 flex items-center justify-center bg-white ">
                      <span
                        className={`w-3/4 h-3/4 test rounded-md transition-colors ${
                          offeringRadio === "option2"
                            ? "bg-primary"
                            : "bg-white"
                        }`}
                      ></span>
                    </div>
                    <span>عتیقه گوسفند و بز</span>
                  </label> */}

                  {/* Option 3 */}
                  {/* <label className="flex gap-2 w-full md:w-56 h-14 rounded-2xl border border-primary bg-[#13a89e36] items-center p-3 cursor-pointer">
                    <input
                      type="radio"
                      name="dynamic"
                      value="option3"
                      checked={offeringRadio === "option3"}
                      onChange={handleOfferingRadioChange}
                      className="hidden peer"
                    />
                    <div className="w-6 h-6 rounded-lg border border-gray-400 flex items-center justify-center bg-white ">
                      <span
                        className={`w-3/4 h-3/4 test rounded-md transition-colors ${
                          offeringRadio === "option3"
                            ? "bg-primary"
                            : "bg-white"
                        }`}
                      ></span>
                    </div>
                    <span>قربانی مرغ</span>
                  </label> */}
                </div>

                {/* selection */}
                <div className="flex flex-col gap-4 mt-10 mb-6 items-center justify-between  w-full md:flex-row">
                  <div className="w-full md:w-5/6 flex flex-col gap-1">
                    <span className="font-bold text-gray-700 pr-1">نوع </span>
                    <Select
                      required
                      inputId="province"
                      placeholder="نوع"
                      options={offeringTypeOptions}
                      onChange={(e: any) => {
                        setOfferingType(e);
                        console.log(e);
                      }}
                      value={offeringType}
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

                  <div className="w-full  md:w-5/6 flex flex-col gap-1">
                    <span className="font-bold text-gray-700 pr-1">تعداد </span>
                    <Select
                      required
                      inputId="province"
                      placeholder="تعداد"
                      options={offeringTypeCountOptions}
                      onChange={(e: any) => setOfferingTypeCount(e.value)}
                      value={offeringTypeCountOptions.find(
                        (option) => option.value === offeringTypeCount
                      )} // Set the selected value
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
                </div>

                {/* warning text */}
                <p className="py-2">
                  نکته مهم
                  <br />
                  در عقیقه ، متولیان عقیقه ،فقط دعای عقیقه را می‌خوانند و بقیه
                  آداب آن را انجام نمی‌دهند، اصل هم همین دعاست و پس از ذبح ، بین
                  فقرا توزیع می شود
                </p>
              </>
            ) : (
              <>
                {/* user info in offering form */}
                {/* <div className="flex flex-col  justify-between w-full gap-2 pb-5 md:flex-row">
                  <label
                    htmlFor="fullname"
                    className="font-bold flex flex-col gap-2 w-full lg:w-2/4"
                  >
                    <span className="mr-1 text-gray-700">
                      نام و نام خانوادگی{" "}
                    </span>
                    <input
                      required
                      type="text"
                      name="full_name"
                      id="fullname"
                      className="w-full p-2 font-normal h-9 border rounded-lg outline-none  bg-white text-gray-500"
                    />
                  </label>
                  <label
                    htmlFor="phonenumber"
                    className="font-bold  flex flex-col gap-2 w-full lg:w-2/4"
                  >
                    <span className="mr-1 text-gray-700">شماره تلفن</span>
                    <input
                      required
                      type="tel"
                      name="phone_number"
                      id="phonenumber"
                      className="w-full p-2 font-normal h-9 border rounded-lg outline-none  bg-white text-gray-500"
                    />
                    <span className="text-gray-600 font-normal text-sm">{`جهت اطلاع رسانی (حتما صحیح وارد شود)`}</span>
                  </label>
                </div> */}

                {/* social media */}
                <div className="flex flex-col gap-4 my-2">
                  <span className="font-bold text-gray-700">
                    آیا میخواهید نذر آنلاین برایتان گزارش قربانی را ارسال کند؟
                  </span>

                  <div className="flex gap-2 md:items-center flex-col md:flex-row flex-wrap">
                    <label className="flex gap-2 w-fit h-fit rounded-2xl items-center  cursor-pointer">
                      <input
                        type="radio"
                        value="خیر تمایلی ندارم"
                        checked={socialMedia === "خیر تمایلی ندارم"}
                        onChange={handleSendSocialMediaRadioChange}
                        className="hidden peer"
                      />
                      <div className="w-6 h-6 rounded-lg border border-gray-400 flex items-center justify-center bg-white  ">
                        <span
                          className={`w-3/4 h-3/4 test rounded-md transition-colors ${
                            socialMedia === "خیر تمایلی ندارم"
                              ? "bg-primary"
                              : "bg-white"
                          }`}
                        ></span>
                      </div>
                      <span>خیر نیازی نیست</span>
                    </label>

                    <label className="flex gap-2 w-fit h-fit rounded-2xl items-center  cursor-pointer">
                      <input
                        type="radio"
                        value="تلگرام"
                        checked={socialMedia === "تلگرام"}
                        onChange={handleSendSocialMediaRadioChange}
                        className="hidden peer"
                      />
                      <div className="w-6 h-6 rounded-lg border border-gray-400 flex items-center justify-center bg-white  ">
                        <span
                          className={`w-3/4 h-3/4 test rounded-md transition-colors ${
                            socialMedia === "تلگرام" ? "bg-primary" : "bg-white"
                          }`}
                        ></span>
                      </div>
                      <span>ارسال به تلگرام</span>
                    </label>

                    <label className="flex gap-2 w-fit h-fit rounded-2xl items-center  cursor-pointer">
                      <input
                        type="radio"
                        value="واتساپ"
                        checked={socialMedia === "واتساپ"}
                        onChange={handleSendSocialMediaRadioChange}
                        className="hidden peer"
                      />
                      <div className="w-6 h-6 rounded-lg border border-gray-400 flex items-center justify-center bg-white  ">
                        <span
                          className={`w-3/4 h-3/4 test rounded-md transition-colors ${
                            socialMedia === "واتساپ" ? "bg-primary" : "bg-white"
                          }`}
                        ></span>
                      </div>
                      <span>ارسال به واتساپ</span>
                    </label>

                    <label className="flex gap-2 w-fit h-fit rounded-2xl items-center  cursor-pointer">
                      <input
                        type="radio"
                        value="بله"
                        checked={socialMedia === "بله"}
                        onChange={handleSendSocialMediaRadioChange}
                        className="hidden peer"
                      />
                      <div className="w-6 h-6 rounded-lg border border-gray-400 flex items-center justify-center bg-white  ">
                        <span
                          className={`w-3/4 h-3/4 test rounded-md transition-colors ${
                            socialMedia === "بله" ? "bg-primary" : "bg-white"
                          }`}
                        ></span>
                      </div>
                      <span>ارسال به بله</span>
                    </label>

                    <label className="flex gap-2 w-fit h-fit rounded-2xl items-center  cursor-pointer">
                      <input
                        type="radio"
                        value="ایتا"
                        checked={socialMedia === "ایتا"}
                        onChange={handleSendSocialMediaRadioChange}
                        className="hidden peer"
                      />
                      <div className="w-6 h-6 rounded-lg border border-gray-400 flex items-center justify-center bg-white  ">
                        <span
                          className={`w-3/4 h-3/4 test rounded-md transition-colors ${
                            socialMedia === "ایتا" ? "bg-primary" : "bg-white"
                          }`}
                        ></span>
                      </div>
                      <span>ارسال به ایتا</span>
                    </label>
                  </div>
                  <p className="text-gray-600 font-normal text-sm my-2 text-justify">
                    فقط در قربانی گوسفند و بز کامل و یا مرغ و خروس کامل گزارش
                    قابلیت ارسال را دارد و موارد مشارکت جمعی بصورت عمومی اطلاع
                    رسانی می شود .
                  </p>
                </div>

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
                  onClick={() => alert("test")}
                  className="w-full sm:w-40 h-11  bg-primary  rounded-2xl text-white  text-center hover:opacity-80 duration-150 font-vazirBold "
                >
                  پرداخت
                </button>
              )}
            </div>
          </form>
        </div>

        {/* daily message */}
        <section className="flex  w-full h-fit items-center justify-center">
          <div className="w-full   items-center lg:w-[65%] gap-1   flex flex-col ">
            <p className="sm:w-5/6 text-justify sm:text-start ">
              از امام رضا علیه السلام سوال شد که اگر قرباني در منا براي ما كمياب
              شد، آيا جايز است كه دو نفر، يك گوسفند را قرباني كنند؟ حضرت فرمودند
              : بله، هفتاد نفر هم با هم میتوانند.
            </p>
            <span className="text-gray-700   text-sm">
              استبصار، شيخ طوسي، ج2، ص 267
            </span>
          </div>
        </section>

        <div className="w-full  h-72 bg-gray-200 flex items-center justify-center mt-5"></div>
      </main>
    </>
  );
};

export default Home;
