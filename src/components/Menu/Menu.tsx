import { CategoryMenu } from "@/services/interface";
import { generateUniqueId } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { SetStateAction } from "react";

export default function Menu({
  isOpen,
  setIsOpen,
  categories,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  categories: CategoryMenu[];
}) {
  const router = useRouter();

  const currentLanguage = router.query.lang as string;

  return (
    <div
      className={`${
        isOpen ? "top-0 pt-[110px]" : "-top-[100%]"
      } container absolute h-full flex flex-col justify-start md:top-0 md:relative md:flex-row md:h-[70px] md:justify-center items-center gap-[50px] teansition-all duration-500 bg-[#fff] overflow-auto hidden-scrollbar z-[19]`}
    >
      {categories.map((item) => {
        const isActive =
          router.asPath ===
          `/${currentLanguage}/category/${item.category.slug}`;

        return (
          <Link
            href={`/${currentLanguage}/category/${item.category.slug}`}
            key={generateUniqueId()}
            onClick={() => setIsOpen(false)}
            className={`font-Din font-bold text-base capitalize ${
              isActive ? "text-[#0071BC]" : "text-black"
            } transition-all duration-300 hover:text-[#0071BC]`}
          >
            {item.category_name}
          </Link>
        );
      })}
    </div>
  );
}
