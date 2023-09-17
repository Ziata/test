import Image from "next/image";
import Link from "next/link";
import shevron from "static/img/shevron.svg";
import SmallPostCard from "@/components/SmallPostCard/SmallPostCard";
import FollowBlock from "@/components/FollowBlock/FollowBlock";
import { useEffect, useState } from "react";
import { t } from "i18next";

function HomeSpotlight() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const backgroundImageStyle = {
    backgroundImage: `url(${
      isMobile ? "static/img/spotlightBgMob.png" : "static/img/spotlightBg.png"
    })`,
    backgroundSize: "cover",
    height: isMobile ? "260px" : "330px",
    width: "100%",
    padding: "30px",
  };

  return (
    <div>
      <div
        style={backgroundImageStyle}
        className="flex items-center justify-center flex-col"
      >
        <h3 className="text-[26px] md:text-5xl text-white font-Din font-bold text-center">
          NextQuestion Observations
        </h3>
        <span className="font-[200] text-[24px] md:text-2xl leading-7 flex items-center text-center text-white font-Din mt-[30px] md:mb-[50px]">
          Why does the brain play a single song on a loop? <br />
          Can listening to more music improve children&apos;s cognition?
        </span>
      </div>
      <div className="container bg-[#fff] md:bg-transperent">
        <div className="flex flex-col tb:flex-row w-full gap-[30px] bg-white md:-mt-[70px] py-[10px] md:px-0 md:p-[30px] tb:h-[690px]">
          <div className="flex w-full gap-[8px] flex-col">
            <div className="flex justify-between items-center w-full h-12">
              <div className="font-light text-2xl leading-7 flex items-center text-gray-900 font-Din">
                {t("NextQuestion Spotlight")}
              </div>
              <Link
                href={"/"}
                className="flex items-center leading-0 font-light text-base leading-5 text-gray-900 font-Din"
              >
                {t("More")}{" "}
                <Image
                  src={shevron}
                  className="ml-4"
                  alt="arrow"
                  width="5"
                  height="10"
                />
              </Link>
            </div>
            <div className="flex flex-col md:flex-row w-full gap-[30px] h-full">
              <div className="hidden md:block md:w-1/2 tb:w-full">
                <div
                  className="w-full h-full p-[30px] flex items-end justify-start relative"
                  style={{
                    backgroundImage: `url("static/img/test.png")`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="gradient-background w-full h-1/2 bottom-0 left-0 !absolute" />
                  <div className="z-1 relative">
                    <div className="font-normal text-lg leading-5 text-white font-Din">
                      Cosmology
                    </div>
                    <h5 className="text-lg leading-5 flex items-center text-white font-Din font-bold mt-1">
                      Lorem ipsum dolor sit amet consectetur suspendisse Lorem
                    </h5>
                    <span className="block font-light text-sm leading-4 text-white font-Din mt-1">
                      March 31, 2022
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 tb:w-[358px] tb:min-w-[300px] flex flex-col justify-between">
                <SmallPostCard />
                <SmallPostCard />
                <SmallPostCard />
                <SmallPostCard />
                <SmallPostCard isLine={false} />
              </div>
            </div>
          </div>
          <div className="tb:w-[358px] tb:min-w-[320px] w-full">
            <FollowBlock />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSpotlight;
