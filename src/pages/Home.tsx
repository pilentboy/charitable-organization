import { useEffect, useState } from "react";
// import Slider from "../components/Home/Slider";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState("option1");

  const optionsMap = {
    option1: ["Apple", "Banana", "Cherry"],
    option2: ["Carrot", "Broccoli", "Spinach"],
    option3: ["Dog", "Cat", "Rabbit"],
  };

  const handleRadioChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    document.title = "خانه";
  }, []);
  return (
    <>
      {/* <header></header> */}
      {/* <header className="mb-10 w-full">
        <Slider />
      </header> */}

      <main className="w-full h-[500px]   rounded-lg">
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
        <div className="w-full sm:w-[78%] mx-auto min-h-[450px] my-5  rounded-lg bg-gray-100 flex flex-col items-center p-6 ">
          {/* form parts */}

          <div className="text-sm gap-2 font-medium  w-full flex items-center border-b border-dotted pb-4 border-gray-300">
            <span>1 نوع قربانی</span>
            <span className="text-gray-400">2 مشخصات فردی</span>
          </div>

          <form className="py-4">
            {/* offering type */}
            <div className="flex gap-4">
              {/* Option 1 */}
              <label className="flex gap-2 w-56 h-14 rounded-2xl border border-primary items-center p-3">
                <input
                  type="radio"
                  name="dynamic"
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={handleRadioChange}
                  className="hidden peer"
                />
                <div className="w-6 h-6 rounded-lg border border-gray-400 flex items-center justify-center bg-white ">
                  <span
                    className={`w-3/4 h-3/4 test rounded-md transition-colors ${
                      selectedOption === "option1" ? "bg-primary" : "bg-white"
                    }`}
                  ></span>
                </div>
                <span>قربانی گوسفند و بز</span>
              </label>

              {/* Option 2 */}
              <label className="flex gap-2 w-56 h-14 rounded-2xl border border-primary items-center p-3">
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
                      selectedOption === "option2" ? "bg-primary" : "bg-white"
                    }`}
                  ></span>
                </div>
                <span>عتیقه گوسفند و بزن</span>
              </label>

              {/* Option 3 */}
              <label className="flex gap-2 w-56 h-14 rounded-2xl border border-primary items-center p-3">
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
                      selectedOption === "option3" ? "bg-primary" : "bg-white"
                    }`}
                  ></span>
                </div>
                <span>قربانی مرغ</span>
              </label>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;
