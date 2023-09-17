import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import close from "static/img/x.svg";
import shevron from "static/img/shevron.svg";
import { t } from "i18next";

function highlightText(text: string, query: string): React.ReactNode[] {
  const parts = text.split(new RegExp(`(${query})`, "gi"));
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", search);
  };

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
      <div className="bg-[#EBEBEB] mt-[10px] w-full rounded-[10px] p-[20px] overflow-scroll max-h-[85vh] hidden-scrollbar">
        <div>
          <h6 className="text-lg leading-5 font-Din text-[#323232] font-bold mb-[10px]">
            {highlightText(
              "How the Brain Distinguishes Memories From Science",
              search
            )}
          </h6>
          <p className="font-light text-lg leading-6 text-[#323232] font-Din">
            {highlightText(
              "Lorem Science dolor sit amet consectetur. Ultricies euismod dui neque sollicitudin nibh semper sit. Sodales a etiam mi quisque amet. Et ac sed tellus tempus odio turpis nisl nunc vitae. Ut enim morbi in massa netus vestibulum. Donec fames ac lacinia dis ultrices. Ullamcorper elementum nunc suscipit sed dictum posuere sagittis. Egestas faucibus arcu porttitor vitae ullamcorper duis",
              search
            )}
          </p>
        </div>
        <div className="mt-[20px]">
          <h6 className="text-lg leading-5 font-Din text-[#323232] font-bold mb-[10px]">
            {highlightText(
              "How the Brain Distinguishes Memories From Science",
              search
            )}
          </h6>
          <p className="font-light text-lg leading-6 text-[#323232] font-Din">
            {highlightText(
              "Lorem Science dolor sit amet consectetur. Ultricies euismod dui neque sollicitudin nibh semper sit. Sodales a etiam mi quisque amet. Et ac sed tellus tempus odio turpis nisl nunc vitae. Ut enim morbi in massa netus vestibulum. Donec fames ac lacinia dis ultrices. Ullamcorper elementum nunc suscipit sed dictum posuere sagittis. Egestas faucibus arcu porttitor vitae ullamcorper duis",
              search
            )}
          </p>
        </div>
        <div className="mt-[20px]">
          <h6 className="text-lg leading-5 font-Din text-[#323232] font-bold mb-[10px]">
            {highlightText(
              "How the Brain Distinguishes Memories From Science",
              search
            )}
          </h6>
          <p className="font-light text-lg leading-6 text-[#323232] font-Din">
            {highlightText(
              "Lorem Science dolor sit amet consectetur. Ultricies euismod dui neque sollicitudin nibh semper sit. Sodales a etiam mi quisque amet. Et ac sed tellus tempus odio turpis nisl nunc vitae. Ut enim morbi in massa netus vestibulum. Donec fames ac lacinia dis ultrices. Ullamcorper elementum nunc suscipit sed dictum posuere sagittis. Egestas faucibus arcu porttitor vitae ullamcorper duis",
              search
            )}
          </p>
        </div>
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
      </div>
    </div>
  );
}
