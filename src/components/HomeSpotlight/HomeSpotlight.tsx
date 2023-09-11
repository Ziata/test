import Image from "next/image";
import Link from "next/link";
import shevron from "static/img/shevron.svg";
import follow from "static/img/follow.png";
import SmallPostCard from "@/components/SmallPostCard/SmallPostCard";
import FollowBlock from "@/components/FollowBlock/FollowBlock";

function HomeSpotlight() {
  const backgroundImageStyle = {
    backgroundImage: `url(static/img/spotlightBg.png)`,
    backgroundSize: "cover",
    height: "330px",
    width: "100%",
  };

  return (
    <div>
      <div
        style={backgroundImageStyle}
        className="flex items-center justify-center flex-col"
      >
        <h3 className="text-5xl text-white font-Din font-bold">
          NextQuestion Observations
        </h3>
        <span className="font-light text-2xl leading-7 flex items-center text-center text-white font-Din mt-[30px]">
          Why does the brain play a single song on a loop? <br />
          Can listening to more music improve children's cognition?
        </span>
      </div>
      <div className="container">
        <div className="flex w-full gap-[30px] bg-white -mt-[70px] p-[30px] h-[690px]">
          <div className="flex w-full gap-[8px] flex-col">
            <div className="flex justify-between items-center w-full h-12">
              <div className="font-light text-2xl leading-7 flex items-center text-gray-900 font-Din">
                NextQuestion Spotlight
              </div>
              <Link
                href={"/"}
                className="flex items-center leading-0 font-light text-base leading-5 text-gray-900 font-Din"
              >
                More{" "}
                <Image
                  src={shevron}
                  className="ml-4"
                  alt="arrow"
                  width="5"
                  height="10"
                />
              </Link>
            </div>
            <div className="flex w-full gap-[30px] h-full">
              <div className="w-full">
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
              <div className="w-[358px] min-w-[350px] flex flex-col justify-between">
                <SmallPostCard />
                <SmallPostCard />
                <SmallPostCard />
                <SmallPostCard />
                <SmallPostCard isLine={false} />
              </div>
            </div>
          </div>
          <div className="w-[358px] min-w-[350px] bg-[#D0E5F2] flex flex-col h-fit">
            <Image
              src={follow}
              alt="follow"
              className="mt-[20px] mb-[3px] mx-[17px] w-auto"
            />
            <FollowBlock />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSpotlight;
