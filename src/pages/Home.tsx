const Home = () => {
  return (
    <>
      {/* <header></header> */}
      <main className="w-full h-[500px]  rounded-lg">
        {/* title */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[#007F3D] font-[900] text-[50px]">
            قربانی آنلاین
          </h1>
          <h2 className=" text-[22px] font-[900] ">
            پرداخت نذورات{" "}
            <span className="bg-[#ed1b35] rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm p-1 text-white">
              قربانی گوسفند
            </span>
            ، بز و مرغ
          </h2>
        </div>
      </main>
    </>
  );
};

export default Home;
