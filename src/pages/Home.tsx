import { useEffect } from "react";
import Slider from "../components/Home/Slider";

const Home = () => {
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
        </div>
      </main>
    </>
  );
};

export default Home;
