import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetFooterQuery } from "@/services/api";
import { generateUniqueId } from "@/utils";
import LanguageContext from "@/context/LanguageContext";

export default function Footer() {
  const { currentLanguage } = useContext(LanguageContext);
  const { data } = useGetFooterQuery({ language: currentLanguage });

  return (
    <footer className="bg-[#fff]">
      <div className="container h-full">
        <div className="py-[20px] flex items-center justify-center gap-y-[10px] gap-x-[40px] tb:gap-0 tb:justify-between min-h-[102px] flex-wrap tb:flex-nowrap">
          {data && (
            <>
              <span className="font-normal text-lg leading-5 font-Din text-[#315469]">
                {data.site_rights}
              </span>
              <span className="hidden md:block font-normal text-lg leading-5 font-Din text-[#315469]">
                |
              </span>
              {data.footer_links.map((link) => (
                <React.Fragment key={generateUniqueId()}>
                  <Link
                    href={link.url}
                    className="font-normal text-lg leading-5 font-Din text-[#315469]  transition-all duration-300 hover:text-[#0071BC]"
                  >
                    {link.name}
                  </Link>
                  <span className="hidden md:block font-normal text-lg leading-5 font-Din text-[#315469]">
                    |
                  </span>
                </React.Fragment>
              ))}
              <div className="flex gap-[15px]">
                {data.footer_social_media.map((link) => (
                  <Link href={link.url} key={generateUniqueId()}>
                    <Image
                      src={link.icon_image.url}
                      alt={link.icon_image.name}
                      width={link.icon_image.width}
                      height={link.icon_image.height}
                    />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
