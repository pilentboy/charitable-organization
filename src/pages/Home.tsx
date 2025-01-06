import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "خانه";
  }, []);
  return (
    <>
      {/* <header></header> */}
      <main className="w-full h-[500px]  rounded-lg">
        {/* title */}
        <div className="flex flex-col items-center gap-3 font-vazirBold sm:gap-6">
          <h1 className="text-[#007F3D] font-[900]  text-3xl sm:text-[50px]">
            قربانی آنلاین
          </h1>
          <div className="flex items-center text-[20px] flex-wrap  justify-center sm:text-[22px] font-[900] gap-[3px]">
            <h2> پرداخت نذورات</h2>
            <span className="bg-[#ed1b35] rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm p-1 text-white">
              قربانی گوسفند
            </span>
            ،<h2> بز و مرغ</h2>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
