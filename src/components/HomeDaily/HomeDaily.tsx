import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

function HomeDaily() {
  return (
    <div className="w-full py-[50px] overflow-hidden">
      <div className="font-light text-2xl leading-7 flex items-center text-gray-900 font-Din w-full justify-center mb-[30px]">
        NextQuestion Spotlight
      </div>
      <Slider {...settings}>
        <div className="!w-[290px] !h-[416px] md:!w-[350px]  mx-[10px]">
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
              <span className="block font-light text-sm leading-4 text-white font-Din mt-2">
                March 31, 2022
              </span>
            </div>
          </div>
        </div>
        <div className="!w-[290px] !h-[416px] md:!w-[350px]  mx-[10px]">
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
              <span className="block font-light text-sm leading-4 text-white font-Din mt-2">
                March 31, 2022
              </span>
            </div>
          </div>
        </div>
        <div className="!w-[290px] !h-[416px] md:!w-[350px]  mx-[10px]">
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
              <span className="block font-light text-sm leading-4 text-white font-Din mt-2">
                March 31, 2022
              </span>
            </div>
          </div>
        </div>
        <div className="!w-[290px] !h-[416px] md:!w-[350px] mx-[10px]">
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
              <span className="block font-light text-sm leading-4 text-white font-Din mt-2">
                March 31, 2022
              </span>
            </div>
          </div>
        </div>
        <div className="!w-[290px] !h-[416px] md:!w-[350px]  mx-[10px]">
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
              <span className="block font-light text-sm leading-4 text-white font-Din mt-2">
                March 31, 2022
              </span>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default HomeDaily;
