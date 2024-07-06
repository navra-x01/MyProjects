import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-[44vh] gap-5 text-white justify-center items-center">
        <div className="font-bold text-4xl">Buy me a project!</div>
        <p>
          A crowdfunding platforms for creators. Get funded by your fans and
          followers. Start now!
        </p>
        <div>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Get Started
            </span>
          </button>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Read More
            </span>
          </button>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white flex flex-col gap-7 justify-center items-center mt-10 mb-20">
        <h1 className="font-bold text-2xl ">Your fans can buy you a project</h1>
        <div className="flex gap-36">
          <div className="item  flex flex-col gap-2 justify-center items-center">
            <img className="" src="/coin.svg" alt="" width={70} />
            <p>Fund Yourself</p>
            <p>Your fans are available for you to help</p>
          </div>
          <div className="item  flex flex-col gap-2 justify-center items-center">
            <img className="" src="/coin.svg" alt="" width={70} />
            <p>Fund Yourself</p>
            <p>Your fans are available for you to help</p>
          </div>
          <div className="item  flex flex-col gap-2 justify-center items-center">
            <img className="" src="/coin.svg" alt="" width={70} />
            <p>Fund Yourself</p>
            <p>Your fans are available for you to help</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>


      <div className="text-white flex flex-col gap-7 justify-center items-center py-10">
        <h1 className="text-2xl font-bold">Learn more about us</h1>
        
        <iframe width="560" height="315" src="https://www.youtube.com/embed/Sklc_fQBmcs?si=qJ_sfGTg7fUbq7z3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </>
  );
}
