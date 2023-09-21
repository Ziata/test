import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThirdBlock } from "@/services/interface";
import { formatDate, generateUniqueId } from "@/utils";
import { useRouter } from "next/router";
import Link from "next/link";

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
};

function HomeDaily({ data }: { data: ThirdBlock }) {
  const router = useRouter();

  return (
    <div className="w-full py-[50px] overflow-hidden">
      <div className="font-light text-2xl leading-7 flex items-center text-gray-900 font-Din w-full justify-center mb-[30px]">
        {data.title}
      </div>
      <Slider {...settings}>
        {data.thirdBlockPosts.map((post) => (
          <Link
            key={generateUniqueId()}
            href={`/${router.query.lang}/post/${post.post_name}`}
            className="!w-[290px] !h-[416px] md:!w-[350px] mx-[10px]"
          >
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
                  {post.post_title}
                </div>
                <h5 className="text-lg leading-5 flex items-center text-white font-Din font-bold mt-1">
                  {post.post_title}
                </h5>
                <span className="block font-light text-sm leading-4 text-white font-Din mt-2">
                  {formatDate(post.post_date)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default HomeDaily;
