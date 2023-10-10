import Image from "next/image";
import { useContext } from "react";
import close from "static/img/x.svg";
import shevron from "static/img/shevron.svg";
import { t } from "i18next";
import { useRouter } from "next/router";
import Loader from "@/components/Loader/Loader";
import { IPost } from "@/services/interface";
import {
  findFirstCategory,
  generateUniqueId,
  truncateTexSearch,
} from "@/utils";
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
  const { data, isLoading, searchString, setSearchString, setSearchPosts } =
    useContext(SearchContext);

  const router = useRouter();
  const currentLanguage = router.query.lang as string;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearchString(newSearchValue);
  };

  const clickMore = (item: [string, IPost[]]) => {
    setSearchPosts(item);
    router.push(`/${currentLanguage}/searchresult`).then(() => {
      closeModal();
    });
  };

  const redirect = (post: IPost) => {
    router.push(`/${currentLanguage}/post/${post.post_name}`).then(() => {
      closeModal();
    });
  };

  const categorizedPosts: { [key: string]: IPost[] } | undefined = data?.reduce(
    (acc, post) => {
      const category = findFirstCategory(post.categories);
      if (!category) return acc;

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(post);
      return acc;
    },
    {} as { [key: string]: IPost[] }
  );

  return (
    <div className="md:w-[650px] min-w-[300px] mx-[10px]">
      <div className="relative">
        <input
          className="font-semibold text-base leading-7 capitalize text-[#002c47] font-sans w-full h-[40px] mx-auto px-[20px] py-[7px] rounded-[10px] outline-none border focus:border-none bg-[#EBEBEB]"
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
          ) : categorizedPosts && Object.keys(categorizedPosts).length > 0 ? (
            Object.entries(categorizedPosts).map((item) => (
              <div key={generateUniqueId()} className="mt-[20px] mb-[50px]">
                <h2 className="text-3xl leading-5 font-Din text-[#002c47] font-bold mb-[20px]">
                  {item[0]}
                </h2>
                {item[1].slice(0, 3).map((post: IPost) => (
                  <div
                    onClick={() => redirect(post)}
                    key={post.ID}
                    className="mt-[10px] block cursor-pointer mb-[20px]"
                  >
                    <h6 className="text-lg leading-5 font-Din text-[#002c47] font-bold mb-[10px]">
                      {highlightText(post.post_title, searchString)}
                    </h6>
                    <p className="font-light text-lg leading-6 text-[#002c47] font-Din">
                      {highlightText(
                        truncateTexSearch(post.post_content, 250, searchString),
                        searchString
                      )}
                    </p>
                  </div>
                ))}
                <div className="w-full justify-end flex">
                  <button
                    onClick={() => clickMore(item)}
                    className="flex items-center leading-0 font-light text-base leading-5 text-[#002c47] font-Din mt-[20px]"
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
              </div>
            ))
          ) : (
            <div className="w-full h-[300px] justify-center font-light text-2xl leading-7 flex items-center text-[#002c47] font-Din">
              {t("No Data")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
