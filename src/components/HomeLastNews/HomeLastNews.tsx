import Image from "next/image";
import Link from "next/link";
import shevron from "static/img/shevron.svg";
import whiteShevron from "static/img/shevron-white.svg";
import SmallPostCard from "@/components/SmallPostCard/SmallPostCard";

function HomeLastNews() {
  return (
    <div className="container pb-[70px]">
      <div className="flex justify-between items-center py-10">
        <div className="font-light text-2xl leading-7 flex items-center text-gray-900 font-Din">
          Latest News
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
      <div className="flex gap-[30px] tb:h-[440px] w-full">
        <div
          className="hidden md:flex md:w-1/2 tb:w-2/3 tb:h-full px-[17px] py-[28px] items-end justify-start relative border-b-2 border-orange-600 border-solid"
          style={{
            backgroundImage: `url("static/img/test.png")`,
            backgroundSize: "cover",
          }}
        >
          <div className="gradient-background w-full h-1/2 bottom-0 left-0 !absolute" />
          <div className="z-1 relative">
            <div className="font-normal text-lg leading-5 text-orange-600 font-Din">
              Meeting Reports:
            </div>
            <h5 className="text-lg leading-5 flex items-center text-white font-Din font-bold mt-1">
              The 3rd Annual Meeting of the Neurophilosophy of Free Will
            </h5>
            <span className="block font-light text-sm leading-4 text-white font-Din mt-1">
              March 31, 2022
            </span>
            <Link
              href={"/"}
              className="font-normal text-lg flex items-center text-white font-Din mt-2"
            >
              Read the Report{" "}
              <Image
                src={whiteShevron}
                className="ml-4"
                alt="arrow"
                width="5"
                height="10"
              />
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 tb:w-1/3 tb:max-w-[430px] h-full flex flex-col justify-between">
          <SmallPostCard />
          <SmallPostCard />
          <SmallPostCard />
          <SmallPostCard isLine={false} />
        </div>
      </div>
    </div>
  );
}

export default HomeLastNews;
