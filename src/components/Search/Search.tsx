import Image from "next/image";
import { useContext } from "react";
import close from "static/img/x.svg";
import shevron from "static/img/shevron.svg";
import { t } from "i18next";
import { useRouter } from "next/router";
import Loader from "@/components/Loader/Loader";
import { IPost } from "@/services/interface";
import { truncateText } from "@/utils";
import { SearchContext } from "@/context/SearchContext";

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
  const { data, isLoading, isError, searchString, setSearchString } =
    useContext(SearchContext);
  const router = useRouter();
  const currentLanguage = router.query.lang as string;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearchString(newSearchValue);
  };

  const firstThreePost = data?.slice(0, 3) || [];

  const clickMore = () => {
    router.push(`/${currentLanguage}/search`).then(() => {
      closeModal();
    });
  };

  return (
    <div className="md:w-[650px] min-w-[300px] mx-[10px]">
      <div className="relative">
        <input
          className="font-semibold text-base leading-7 capitalize text-[#040303] font-sans w-full h-[40px] mx-auto px-[20px] py-[7px] rounded-[10px] outline-none border focus:border-none bg-[#EBEBEB]"
          placeholder={t("Enter search term")}
          value={searchString}
          autoFocus
          onChange={handleInputChange}
        />
        {searchString && (
          <button
            className="absolute right-[20px] top-1/2 -translate-y-1/2"
            onClick={() => setSearchString("")}
          >
            <Image src={close} alt="close" />
          </button>
        )}
      </div>
      {searchString && (
        <div className="bg-[#EBEBEB] mt-[10px] w-full rounded-[10px] p-[20px] overflow-scroll max-h-[85vh] hidden-scrollbar">
          {isLoading ? (
            <Loader customClass="w-20 h-20 mx-auto" />
          ) : firstThreePost.length > 0 ? (
            firstThreePost.map((post: IPost) => (
              <div key={post.ID} className="mt-[20px]">
                <h6 className="text-lg leading-5 font-Din text-[#323232] font-bold mb-[10px]">
                  {highlightText(post.post_title, searchString)}
                </h6>
                <p className="font-light text-lg leading-6 text-[#323232] font-Din">
                  {highlightText(
                    truncateText(post.post_content, 1500),
                    searchString
                  )}
                </p>
              </div>
            ))
          ) : (
            (!firstThreePost || isError) && (
              <div className="w-full h-[300px] justify-center font-light text-2xl leading-7 flex items-center text-gray-900 font-Din">
                {t("No Data")}
              </div>
            )
          )}
          {firstThreePost.length > 0 && (
            <div className="w-full justify-end flex">
              <button
                onClick={clickMore}
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
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
