import Link from "next/link";

export default function Menu({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={`${
        isOpen ? "bottom-0 pt-[110px]" : "-bottom-[100%]"
      } container absolute h-full flex flex-col justify-start md:top-0 md:relative md:flex-row md:h-[70px] md:justify-center items-center gap-[50px] teansition-all duration-500 bg-[#fff] overflow-auto hidden-scrollbar`}
    >
      <Link
        href={"/"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        href={"/"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        href={"/"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        href={"/"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        href={"/"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        href={"/"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        href={"/"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        href={"/"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        href={"/"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        href={"/"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        href={"/"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        href={"/"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
    </div>
  );
}
