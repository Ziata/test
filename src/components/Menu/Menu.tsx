import Link from "next/link";
import React, { SetStateAction } from "react";

export default function Menu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`${
        isOpen ? "top-0 pt-[110px]" : "-top-[100%]"
      } container absolute h-full flex flex-col justify-start md:top-0 md:relative md:flex-row md:h-[70px] md:justify-center items-center gap-[50px] teansition-all duration-500 bg-[#fff] overflow-auto hidden-scrollbar z-[19]`}
    >
      <Link
        onClick={() => setIsOpen(false)}
        href={"/category/test"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        href={"/category/test"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        href={"/category/test"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        href={"/category/test"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        href={"/category/test"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        href={"/category/test"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        href={"/category/test"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        href={"/category/test"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        href={"/category/test"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        href={"/category/test"}
        className="font-Din font-bold text-base capitalize text-black transition-all duration-300 hover:text-[#0071BC]"
      >
        test
      </Link>
    </div>
  );
}
