import { truncateText } from "@/utils";
import Link from "next/link";

function Post({ isInterview = false }: { isInterview?: boolean }) {
  return (
    <div
      className={` ${
        isInterview
          ? "flex-col w-full md:w-[49%]"
          : "flex-row w-full h-[170px] md:h-[200px] border-b-2 border-solid border-[#CECECE] pb-[20px] my-[20px]"
      } flex`}
    >
      <Link
        href="/post/testpost"
        className={`${
          isInterview ? "w-full h-[205px]" : "w-1/3 mr-[10px] md:mr-[20px]"
        } `}
      >
        <div
          style={{
            backgroundImage: `url("../../static/img/test.png")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full h-full"
        />
      </Link>
      <div className="w-2/3 flex flex-col justify-between">
        <span
          className={` ${
            isInterview && "order-2 mb-[5px]"
          } font-light text-base leading-5 flex items-center text-blue-700 font-Din`}
        >
          From the journals
        </span>
        <Link
          href="/post/testpost"
          className={` ${
            isInterview ? "order-1" : "md:mb-[20px]"
          } font-bold text-lg leading-5 flex items-center text-[#002C47] font-Din my-[5px] md:mt-[10px] `}
        >
          How the Brain Distinguishes Memories From Perceptions
        </Link>
        {!isInterview && (
          <div className="h-[70px] relative overflow-hidden">
            <p className="font-light text-[14px] md:text-[18px] leading-[1.3rem] md:leading-6 font-Din text-[#363636]">
              {truncateText(
                "Lorem ipsum dolor sit amet consectetur. Blandit ultricies mauris magnis urna vel. Aliquet at quam arcu viverra. In vitae tristique Lorem ipsum dolor sit amet consectetur. Blandit ultricies mauris magnis urna vel. Aliquet at quam arcu viverra. In vitae tristique Lorem ipsum dolor sit amet consectetur. Blandit ultricies mauris magnis urna vel. Aliquet at quam arcu viverra. In vitae tristique",
                240
              )}
            </p>
          </div>
        )}
        <div
          className={` ${
            isInterview && "order-3"
          } font-light  text-[12px] md:text-sm leading-4 flex items-center font-Din text-[#33566C] gap-[4px] md:gap-[8px]`}
        >
          <span>March 03, 2022</span>
          <span>|</span>
          <span>By James White</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
