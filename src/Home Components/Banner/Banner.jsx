import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import bannerInfo from "../../Jsons/bannerInfo.json";
import logo from "../../assets/Logo/RedLogo.png";
import Lottie from "lottie-react";
import bloodAnimation from "../../assets/bloodAnimation.json";
import { Link } from "react-router-dom";
import blood2 from "../../assets/slide2.json";
import blood3 from "../../assets/slide3.json";
import "./Banner.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Banner = () => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {bannerInfo?.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative lg:h-[503px]">
              <img
                src={banner.bannerImg}
                className="absolute inset-0 object-cover w-full h-full"
                alt=""
              />
              <div className="relative bg-gray-900 bg-opacity-70 h-full">
                <div className="flex flex-col lg:flex-row items-center text-white h-full lg:px-32 pt-40 lg:pt-0">
                  <div
                    data-aos="zoom-in"
                    data-aos-duration="1400"
                    className="flex-1 space-y-3"
                  >
                    <div className="flex justify-center items-center">
                      <img
                        src={logo}
                        className="w-[220px] block md:hidden pb-5"
                      ></img>
                    </div>

                    <h1 className="text-xl font-medium text-center lg:text-left">
                      {banner.heading_short}
                    </h1>
                    <h1 className="font-bold text-4xl xl:text-5xl max-w-xl mx-6 lg:mx-0 text-center lg:text-left">
                      {banner.heading}
                    </h1>
                    <p className="max-w-xl text-lg text-center lg:text-left">
                      {banner.description}
                    </p>
                    <div className="flex flex-col md:flex-row items-center gap-5 md:justify-center lg:justify-start">
                      <Link to="/login">
                        <button className="bg-[#D60C0C] px-4 py-3 rounded-lg text-white hover:bg-white hover:text-[#D60C0C] hover:outline">
                          Join as a Donor
                        </button>
                      </Link>
                      <Link to="/register">
                        <button className="bg-white outline text-[#D60C0C] hover:bg-[#AB0A0A] px-4 py-3 rounded-lg hover:text-white">
                          Search Donors
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div>
                    {banner.heading_short.endsWith("Lives") ? (
                      <Lottie
                        animationData={bloodAnimation}
                        loop={true}
                        className="w-[420px]"
                      />
                    ) : banner.heading_short.endsWith("Together") ? (
                      <Lottie
                        animationData={blood2}
                        loop={true}
                        className="w-[420px]"
                      />
                    ) : (
                      <Lottie
                        animationData={blood3}
                        loop={true}
                        className="w-[420px]"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
