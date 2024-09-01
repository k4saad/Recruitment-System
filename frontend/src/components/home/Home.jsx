import React from "react";
import { Link } from "react-router-dom";
import BackImg from "../../assets/images/background.png";
import handShake from "../../assets/images/handShake.jpg";

const Home = () => {
  
    return (
      <>
        <section className="relative h-screen w-full mt-[-4rem] z-10">
          <div className="absolute inset-0 overflow-clip">
            <img
              src={BackImg}
              className="w-full h-full object-cover lg:object-fill"
              alt="Background"
            />
          </div>
          <div className="relative z-20 container mx-auto text-center pt-64">
            <p className=" md:text-xl lg:text-2xl mx-auto font-LakesNeueRegular text-[#EFEDE7]">
              WELCOME TO
            </p>
            <h2 className="mb-7 z-20 text-4xl md:text-7xl lg:text-8xl font-bold text-[#EFEDE7] font-CinzelRegular">
              Global Manpower
            </h2>
            <Link
              to="/about"
              className="hover:text-[#EFEDE7] hover:ring-[#EFEDE7] text-xs md:text-sm lg:text ring-1 text-[#EFEDE7] ring-[#EFEDE7] font-LakesNeueRegular rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              LEARN MORE
            </Link>
          </div>
        </section>

        <section className="flex justify-around relative h-screen w-full bg-[#032B22]">
          <div className="relative w-full">
            <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
              <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
                <h1 className="text-center font-CinzelRegular  mt-8 text-3xl font-bold tracking-tight text-[#40FFB5] md:text-4xl lg:text-6xl">
                Your Trusted Partner in Global Manpower
                </h1>
                <p className="mt-8 text-lg text-[#EFEDE7] font-TypewcondRegular text-center">
                Discover a reliable source for skilled labor across various industries. 
                Whether you need experienced chefs, dedicated masons, talented carpenters, 
                or professional house staff, we connect you with top talent from India, 
                ready to serve in Gulf countries and beyond. Our commitment to excellence ensures 
                that you receive dependable, qualified workers who contribute to your success, 
                providing a seamless experience from recruitment to deployment.
                </p>
              </div>
              <div className="relative my-auto lg:col-span-5 lg:-mr-8 xl:col-span-6">
                <img
                  className="aspect-[3/2] h-52 mx-auto rounded-xl bg-gray-50 object-cover lg:h-[460px] lg:w-[307px]"
                  src={handShake}
                  alt="Resort"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-around relative h-fit  w-full bg-[#EFEDE7]">
          <div className="relative w-full">
            <div className="mx-0 flex flex-col">
              <div>
                <h1 className="text-center font-CinzelRegular  mt-8 text-3xl font-bold tracking-tight text-[#00634D] md:text-4xl lg:text-6xl">
                  Service
                </h1>
              </div>
                <div className="flex flex-col lg:flex-row justify-around">
                  various service
                </div>
            </div>
          </div>
        </section>
      </>
    );
}

export default Home;