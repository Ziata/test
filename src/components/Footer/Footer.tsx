import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { generateUniqueId } from "@/utils";
import { LayoutContext } from "@/context/LayoutContext";
import { useRouter } from "next/router";

export default function Footer() {
  const { footerData: data } = useContext(LayoutContext);
  const router = useRouter();

  return (
    <footer className="bg-[#fff]">
      <div className="container h-full">
        <div className="py-[20px] flex items-center justify-center gap-y-[10px] gap-x-[40px] tb:gap-0 tb:justify-between min-h-[102px] flex-wrap">
          {data && (
            <>
              <span className="font-300 text-lg leading-5 font-Din text-[#002c47]">
                {data.site_rights}
              </span>
              <span className="hidden md:block font-normal text-lg leading-5 font-Din text-[#002c47]">
                |
              </span>
              {data.footer_links.map((link) => (
                <React.Fragment key={generateUniqueId()}>
                  <Link
                    href={`${
                      link.url.startsWith("/") ? `/${router.query.lang}` : ""
                    }${link.url}`}
                    className="font-300 text-lg leading-5 font-Din text-[#002c47]  transition-all duration-300 hover:text-[#0071BC]"
                  >
                    {link.name}
                  </Link>
                  <span className="hidden md:block font-normal text-lg leading-5 font-Din text-[#002c47]">
                    |
                  </span>
                </React.Fragment>
              ))}
              <div className="flex gap-[15px]">
                {data.footer_social_media.map((link) => (
                  <Link
                    href={link.url}
                    target={link.open_in_new_tab === "Yes" ? "_blank" : "_self"}
                    key={generateUniqueId()}
                  >
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
