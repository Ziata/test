import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import close from "static/img/x.svg";
import shevron from "static/img/shevron.svg";
import { t } from "i18next";
import { useGetSearchQuery } from "@/services/api";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/router";
import Loader from "@/components/Loader/Loader";
import { IPost } from "@/services/interface";
import { truncateText } from "@/utils";

function stripHTMLTags(text: string): string {
  return text.replace(/(<([^>]+)>)/gi, "");
}

function highlightText(text: string, query: string): React.ReactNode[] {
  const textWithoutHtml = stripHTMLTags(text);
  const parts = textWithoutHtml.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="bg-[#FCFF6A]">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function Search({ closeModal }: { closeModal: () => void }) {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const currentLanguage = router.query.lang as string;

  const { data, isLoading } = useGetSearchQuery(
    search ? { slug: search, language: currentLanguage } : skipToken
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearch(newSearchValue);
  };

  const firstThreePost = data?.slice(0, 3) || [];

  return (
    <div className="md:w-[650px] min-w-[300px] mx-[10px]">
      <div className="relative">
        <input
          className="font-semibold text-base leading-7 capitalize text-[#040303] font-sans w-full h-[40px] mx-auto px-[20px] py-[7px] rounded-[10px] outline-none border focus:border-none bg-[#EBEBEB]"
          placeholder="Enter search term"
          value={search}
          onChange={handleInputChange}
        />
        {search && (
          <button
            className="absolute right-[20px] top-1/2 -translate-y-1/2"
            onClick={() => setSearch("")}
          >
            <Image src={close} alt="close" />
          </button>
        )}
      </div>
      {search && (
        <div className="bg-[#EBEBEB] mt-[10px] w-full rounded-[10px] p-[20px] overflow-scroll max-h-[85vh] hidden-scrollbar">
          {isLoading ? (
            <Loader customClass="w-20 h-20 mx-auto" />
          ) : firstThreePost.length > 0 ? (
            firstThreePost.map((post: IPost) => (
              <div key={post.ID} className="mt-[20px]">
                <h6 className="text-lg leading-5 font-Din text-[#323232] font-bold mb-[10px]">
                  {highlightText(post.post_title, search)}
                </h6>
                <p className="font-light text-lg leading-6 text-[#323232] font-Din">
                  {highlightText(truncateText(post.post_content, 1500), search)}
                </p>
              </div>
            ))
          ) : (
            <div className="w-full h-[300px] justify-center font-light text-2xl leading-7 flex items-center text-gray-900 font-Din">
              No Data
            </div>
          )}
          {firstThreePost.length > 0 && (
            <div className="w-full justify-end flex">
              <Link
                href={"/"}
                onClick={closeModal}
                className="flex items-center leading-0 font-light text-base leading-5 text-[#323232] font-Din mt-[20px]"
              >
                {t("More")}{" "}
                <Image
                  src={shevron}
                  className="ml-4"
                  alt="arrow"
                  width="5"
                  height="10"
                />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
