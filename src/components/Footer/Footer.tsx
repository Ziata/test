import Link from "next/link";
import weChat from "static/img/weChat.svg";
import Twitter from "static/img/twitter.svg";
import Linkedin from "static/img/Linkedin.svg";
import Rss from "static/img/rss.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#fff]">
      <div className="container h-full">
        <div className="py-[20px] flex items-center justify-center gap-y-[10px] gap-x-[40px] tb:gap-0 tb:justify-between min-h-[102px] flex-wrap tb:flex-nowrap">
          <span className="font-normal text-lg leading-5 font-Din text-[#315469]  transition-all duration-300 hover:text-[#0071BC]">
            © 2023 NextQuestion
          </span>
          <span className="hidden md:block font-normal text-lg leading-5 font-Din text-[#315469]">
            |
          </span>
          <Link
            href="/"
            className="font-normal text-lg leading-5 font-Din text-[#315469]  transition-all duration-300 hover:text-[#0071BC]"
          >
            Download NextQuestion Annual report{" "}
          </Link>
          <span className="hidden md:block font-normal text-lg leading-5 font-Din text-[#315469]">
            |
          </span>
          <Link
            href="/"
            className="font-normal text-lg leading-5 font-Din text-[#315469]  transition-all duration-300 hover:text-[#0071BC]"
          >
            About NextQuestion
          </Link>
          <span className="hidden md:block font-normal text-lg leading-5 font-Din text-[#315469]">
            |
          </span>
          <Link
            href="/"
            className="font-normal text-lg leading-5 font-Din text-[#315469]  transition-all duration-300 hover:text-[#0071BC]"
          >
            Subscribe
          </Link>{" "}
          <span className="hidden md:block font-normal text-lg leading-5 font-Din text-[#315469]">
            |
          </span>
          <Link
            href="/"
            className="font-normal text-lg leading-5 font-Din text-[#315469]  transition-all duration-300 hover:text-[#0071BC]"
          >
            Contact Us
          </Link>
          <div className="flex gap-[15px]">
            <Link href={"/"}>
              <Image src={weChat} alt="WeChat" />
            </Link>
            <Link href={"/"}>
              <Image src={Twitter} alt="Twitter" />
            </Link>
            <Link href={"/"}>
              <Image src={Linkedin} alt="Linkedin" />
            </Link>
            <Link href={"/"}>
              <Image src={Rss} alt="Rss" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
