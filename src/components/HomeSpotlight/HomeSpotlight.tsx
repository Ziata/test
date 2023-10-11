import Image from "next/image";
import Link from "next/link";
import shevron from "static/img/shevron.svg";
import SmallPostCard from "@/components/SmallPostCard/SmallPostCard";
import FollowBlock from "@/components/FollowBlock/FollowBlock";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { IFollow, SecondBlock } from "@/services/interface";
import { findFirstCategory, formatDate, generateUniqueId } from "@/utils";
import { useRouter } from "next/router";

function HomeSpotlight({
  data,
  followData,
}: {
  data: SecondBlock;
  followData: IFollow;
}) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const router = useRouter();

  const currentLanguage = router.query.lang as string;

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
    backgroundImage: `url(${data.background_image.url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: isMobile ? "260px" : "330px",
    width: "100%",
    padding: "30px",
  };

  const slicedNews = isMobile
    ? data.secondBlockPosts.slice(0, 5)
    : data.secondBlockPosts.slice(1, 6);

  return (
    <div>
      <div
        style={backgroundImageStyle}
        className="flex items-center justify-center flex-col relative"
      >
        <div
          className={`bg-[#000] absolute w-full h-full`}
          style={{ opacity: data.background_image_opacity }}
        />
        <h3 className="text-[26px] md:text-5xl text-white font-Din font-bold text-center relative">
          {data.title}
        </h3>
        <span
          className="font-[200] text-[24px] md:text-2xl leading-7 flex items-center text-center text-white font-Din mt-[30px] md:mb-[50px] relative"
          dangerouslySetInnerHTML={{ __html: data.subtitle }}
        ></span>{" "}
      </div>
      <div className="container bg-[#fff] md:bg-transperent">
        <div className="flex flex-col tb:flex-row w-full gap-[30px] bg-white md:-mt-[70px] py-[10px] md:p-[30px] tb:h-[690px] relative z-1 ">
          <div className="flex w-full gap-[8px] flex-col">
            <div className="flex justify-between items-center w-full h-12">
              <div className="font-light text-2xl leading-7 flex items-center text-[#002c47] font-Din">
                {data.category_title}
              </div>
              <Link
                href={`/${currentLanguage}/category/nextquestion-spotlight`}
                className="flex items-center leading-0 font-light text-base leading-5 text-[#002c47] font-Din group hover:scale-[1.1] transition-all duration-300"
              >
                {t("More")}{" "}
                <Image
                  src={shevron}
                  className="ml-4 group-hover:rotate-[360deg] transition-all duration-300 group-hover:scale-[2]"
                  alt="arrow"
                  width="5"
                  height="10"
                />
              </Link>
            </div>
            <div className="flex flex-col md:flex-row w-full gap-[30px] h-full">
              <div className="hidden md:block md:w-1/2 tb:w-full">
                <Link
                  href={`/${router.query.lang}/post/${data?.secondBlockPosts?.[0]?.post_name}`}
                  className="w-full h-full p-[30px] flex items-end justify-start relative cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundImage: `url("${data?.secondBlockPosts?.[0]?.thumbnail}")`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="gradient-background w-full h-1/2 bottom-0 left-0 !absolute" />
                  <div className="gradient-background opacity-0 w-full h-full bottom-0 left-0 !absolute bg-[#4e4e4e33] group-hover:opacity-100 group-hover:h-full transition-all duration-300" />
                  <div className="z-1 relative">
                    <div className="font-normal text-lg leading-5 text-white font-Din">
                      {data?.secondBlockPosts?.[0]?.categories &&
                        findFirstCategory(data.secondBlockPosts[0].categories)}
                    </div>
                    <h5 className="text-lg leading-5 flex items-center text-white font-Din font-bold mt-1 ">
                      {data?.secondBlockPosts?.[0]?.post_title}
                    </h5>
                    <span className="block font-light text-sm leading-4 text-white font-Din mt-1">
                      {formatDate(data?.secondBlockPosts?.[0]?.post_date)}
                    </span>
                  </div>
                </Link>
              </div>
              <div className="w-full md:w-1/2 tb:w-[358px] tb:min-w-[300px] flex flex-col justify-start">
                {slicedNews.map((post, index) => (
                  <SmallPostCard
                    post={post}
                    key={generateUniqueId()}
                    isHiddenLine={index === 4}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="tb:w-[358px] tb:min-w-[320px] w-full">
            <FollowBlock followData={followData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSpotlight;
