import Image from "next/image";
import Link from "next/link";
import shevron from "static/img/shevron.svg";
import whiteShevron from "static/img/shevron-white.svg";
import SmallPostCard from "@/components/SmallPostCard/SmallPostCard";
import { t } from "i18next";
import { FirstBlock, Post } from "@/services/interface";
import { formatDate, generateUniqueId } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "@/context/PostContext";
import { useRouter } from "next/router";

function HomeLastNews({ data }: { data: FirstBlock }) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { setPost } = useContext(PostContext);
  const router = useRouter();

  const handleClick = (post: Post) => {
    setPost(post);
    router.push({
      pathname: `/post/${post.post_name}`,
    });
  };

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

  const slicedNews = isMobile
    ? data.latestNews.slice(0, 4)
    : data.latestNews.slice(1, 5);

  return (
    <div className="container pb-[70px]">
      <div className="flex justify-between items-center py-10">
        <div className="font-light text-2xl leading-7 flex items-center text-gray-900 font-Din">
          {data.title}
        </div>
        <Link
          href="/category/all"
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
      <div className="flex gap-[30px] tb:h-[440px] w-full">
        <div
          className="hidden md:flex md:w-1/2 tb:w-2/3 tb:h-full px-[17px] py-[28px] items-end justify-start relative lazy-background"
          /* border-b-2 border-orange-600 border-solid */
          style={{
            backgroundImage: `url(${data.latestNews[0].thumbnail})`,
            backgroundSize: "cover",
          }}
        >
          <div className="gradient-background w-full h-1/2 bottom-0 left-0 !absolute" />
          <div className="z-1 relative">
            {/* <div className="font-normal text-lg leading-5 text-orange-600 font-Din">
              Meeting Reports:
            </div> */}
            <h5 className="text-lg leading-5 flex items-center text-white font-Din font-bold mt-1">
              {data.latestNews[0].post_title}
            </h5>
            <span className="block font-light text-sm leading-4 text-white font-Din mt-1">
              {formatDate(data.latestNews[0].post_date)}
            </span>
            <button
              onClick={() => handleClick(data.latestNews[0])}
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
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 tb:w-1/3 tb:max-w-[430px] h-full flex flex-col justify-between">
          {slicedNews.map((post, index) => (
            <SmallPostCard
              post={post}
              key={generateUniqueId()}
              isHiddenLine={index === slicedNews.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeLastNews;
