import { useEffect, useState } from "react";
import Slider from "../components/Home/Slider";
import Select, { components } from "react-select";
import { BiSolidDownArrow } from "react-icons/bi";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [displayFirstOfferingForm, setDisplayFirstOfferingForm] =
    useState<boolean>(true);

  const handleRadioChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    document.title = "خانه";
  }, []);
  return (
    <>
      <header className="mb-10 w-full">{/* {<Slider />} */}</header>

      <main className="w-full h-[500px]  rounded-lg">
        {/* title */}
        {/* <div className="flex flex-col items-center gap-3 font-vazirBold sm:gap-6">
          <h1 className="text-primary font-[900]  text-3xl sm:text-[50px]">
            قربانی آنلاین
          </h1>
          <div className="flex items-center text-[20px] flex-wrap  justify-center sm:text-[22px] font-[900] gap-[3px]">
            <h2> پرداخت نذورات</h2>
            <span className="bg-[#ed1b35] rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm p-1 text-white">
              قربانی گوسفند
            </span>
            ،<h2> بز و مرغ</h2>
          </div>
        </div> */}

        {/* offering form */}
        <div className="w-full md:w-[96%] xl:w-[65%] mx-auto h-fit rounded-2xl bg-[#efeff0c9] flex flex-col items-center py-4 px-6 ">
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
              2 مشخصات فردی
            </span>
          </div>

          <form className="pt-4 w-full px-2">
            {displayFirstOfferingForm ? (
              <>
                {/* offering type */}
                <div className="flex w-full justify-between items-center flex-col gap-4 font-bold md:flex-row">
                  {/* Option 1 */}
                  <label className="flex gap-2 w-full md:w-56 h-14 rounded-2xl border border-primary items-center p-3 cursor-pointer">
                    <input
                      type="radio"
                      name="dynamic"
                      value="option1"
                      checked={selectedOption === "option1"}
                      onChange={handleRadioChange}
                      className="hidden peer"
                    />
                    <div className="w-6 h-6 rounded-lg border border-gray-400 flex items-center justify-center bg-white  ">
                      <span
                        className={`w-3/4 h-3/4 test rounded-md transition-colors ${
                          selectedOption === "option1"
                            ? "bg-primary"
                            : "bg-white"
                        }`}
                      ></span>
                    </div>
                    <span>قربانی گوسفند و بز</span>
                  </label>

                  {/* Option 2 */}
                  <label className="flex gap-2 w-full md:w-56 h-14 rounded-2xl border border-primary items-center p-3 cursor-pointer">
                    <input
                      type="radio"
                      name="dynamic"
                      value="option2"
                      checked={selectedOption === "option2"}
                      onChange={handleRadioChange}
                      className="hidden peer"
                    />
                    <div className="w-6 h-6 rounded-lg border border-gray-400 flex items-center justify-center bg-white ">
                      <span
                        className={`w-3/4 h-3/4 test rounded-md transition-colors ${
                          selectedOption === "option2"
                            ? "bg-primary"
                            : "bg-white"
                        }`}
                      ></span>
                    </div>
                    <span>عتیقه گوسفند و بز</span>
                  </label>

                  {/* Option 3 */}
                  <label className="flex gap-2 w-full md:w-56 h-14 rounded-2xl border border-primary items-center p-3 cursor-pointer">
                    <input
                      type="radio"
                      name="dynamic"
                      value="option3"
                      checked={selectedOption === "option3"}
                      onChange={handleRadioChange}
                      className="hidden peer"
                    />
                    <div className="w-6 h-6 rounded-lg border border-gray-400 flex items-center justify-center bg-white ">
                      <span
                        className={`w-3/4 h-3/4 test rounded-md transition-colors ${
                          selectedOption === "option3"
                            ? "bg-primary"
                            : "bg-white"
                        }`}
                      ></span>
                    </div>
                    <span>قربانی مرغ</span>
                  </label>
                </div>

                {/* selection */}
                <div className="flex flex-col gap-4 mt-10 mb-6 items-center justify-between  w-full md:flex-row">
                  <div className="w-full md:w-5/6 flex flex-col gap-1">
                    <span className="font-bold text-gray-700 pr-1">نوع </span>
                    <Select
                      required
                      inputId="province"
                      placeholder="نوع"
                      options={[{ value: 1, label: 1 }]}
                      defaultInputValue="1"
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
                      placeholder="نوع"
                      options={[{ value: 1, label: 1 }]}
                      defaultInputValue="1"
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
              <h1>test</h1>
            )}

            <div className=" w-full flex-wrap justify-center gap-4 items-center flex py-10 border-y border-dotted font-bold text-gray-700  border-gray-300 text-xl font-vazirBold">
              {/* total cost */}
              <h1>مجموع پرداختی قربانی</h1>
              <span className="text-red-600">۲۶۰,۰۰۰ تومان </span>
            </div>

            <div className="flex items-center pt-2">
              <button
                type="button"
                onClick={() => setDisplayFirstOfferingForm((pre) => !pre)}
                className={`w-40 h-11  rounded-2xl text-white  text-center hover:opacity-80 duration-150 font-vazirBold ${
                  displayFirstOfferingForm ? "bg-primary" : "bg-gray-600"
                }`}
              >
                {displayFirstOfferingForm ? "قبلی" : "برگشت"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;
