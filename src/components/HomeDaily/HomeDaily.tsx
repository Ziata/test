import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThirdBlock } from "@/services/interface";
import { findFirstCategory, formatDate, generateUniqueId } from "@/utils";
import { useRouter } from "next/router";
import { useState } from "react";

function HomeDaily({ data }: { data: ThirdBlock }) {
  const router = useRouter();
  const currentLanguage = router.query.lang as string;

  const [allowLinkClick, setAllowLinkClick] = useState(true);

  const handleBeforeChange = () => {
    setAllowLinkClick(false);
  };

  const handleAfterChange = () => {
    setAllowLinkClick(true);
  };

  const handleDragStart = () => {
    setAllowLinkClick(false);
  };

  const handleSlideClick = (event: React.MouseEvent, post_name: string) => {
    if (!allowLinkClick) {
      event.stopPropagation();
      return;
    }

    router.push(`/${router.query.lang}/post/${post_name}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
    centerMode: true,
    variableWidth: true,
    adaptiveHeight: true,
    autoplay: true,
    swipe: true,
    draggable: true,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    onDragStart: handleDragStart,
  };

  return (
    <div className="w-full py-[50px] overflow-hidden">
      <div className="font-light text-2xl leading-7 flex items-center text-[#002c47] font-Din w-full justify-center mb-[30px]">
        {data.title}
      </div>
      <Slider {...settings}>
        {data.thirdBlockPosts.map((post) => (
          <div
            key={generateUniqueId()}
            className="!w-[290px] !h-[416px] md:!w-[350px] mx-[10px]"
          >
            <div
              className="w-full h-full p-[30px] flex items-end justify-start relative hover:scale-[1.03] transition-all duration-300 cursor-pointer"
              onClick={(event) => handleSlideClick(event, post.post_name)}
              style={{
                pointerEvents: allowLinkClick ? "auto" : "none",
                backgroundImage: `url("${post.thumbnail}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="gradient-background w-full h-1/2 bottom-0 left-0 !absolute" />
              <div className="z-1 relative">
                <div className="font-normal text-lg leading-5 text-white font-Din">
                  {findFirstCategory(post.categories)}
                </div>
                <h5 className="text-lg leading-5 flex items-center text-white font-Din font-bold mt-1">
                  {post.post_title}
                </h5>
                <span className="block font-light text-sm leading-4 text-white font-Din mt-2">
                  {formatDate(post.post_date, currentLanguage)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HomeDaily;
