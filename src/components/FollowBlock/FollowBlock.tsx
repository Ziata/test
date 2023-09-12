import Image from "next/image";
import Link from "next/link";
import weChat from "static/img/weChat.svg";
import Twitter from "static/img/twitter.svg";
import Linkedin from "static/img/Linkedin.svg";
import Rss from "static/img/rss.svg";
import follow from "static/img/follow.png";

function FollowBlock() {
  return (
    <div className="bg-[#D0E5F2] flex flex-col tb:flex-col md:flex-row h-fit w-full py-[20px] px-[18px] gap-[30px] tb:gap-[18px]">
      <div className="w-full md:w-1/2 tb:w-full h-auto">
        <Image src={follow} alt="follow" />
      </div>
      <div className="w-full md:w-1/2 tb:w-full tb:h-full">
        <div className="flex flex-col justify-between bg-[#fff] p-[20px] gap-[18px] h-full">
          <h4 className="font-light text-center text-2xl leading-7 text-gray-900 font-Din w-full">
            Follow NextQuestion
          </h4>
          <Link
            href="/"
            className="font-light text-sm leading-4 flex items-center font-Din text-[#33566C] pb-[20px] border-b-2 border-solid border-[#E5E5E5]"
          >
            <Image src={weChat} alt="WeChat" className="mr-[24px]" /> WeChat
          </Link>
          <Link
            href="/"
            className="font-light text-sm leading-4 flex items-center font-Din text-[#33566C] pb-[20px] border-b-2 border-solid border-[#E5E5E5]"
          >
            <Image src={Twitter} alt="Twitter" className="mr-[24px]" /> Twitter
          </Link>
          <Link
            href="/"
            className="font-light text-sm leading-4 flex items-center font-Din text-[#33566C] pb-[20px] border-b-2 border-solid border-[#E5E5E5]"
          >
            <Image src={Linkedin} alt="Linkedin" className="mr-[24px]" />
            Linkedin
          </Link>
          <Link
            href="/"
            className="font-light text-sm leading-4 flex items-center font-Din text-[#33566C]"
          >
            <Image src={Rss} alt="RSS" className="mr-[24px]" />
            RSS
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FollowBlock;
