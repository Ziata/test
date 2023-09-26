import FollowBlock from "@/components/FollowBlock/FollowBlock";
import PageSelect from "@/components/PageSelect/PageSelect";
import Pagination from "@/components/Pagination/Pagination";
import Post from "@/components/Post/Post";
import close from "static/img/x.svg";
import { LayoutContext } from "@/context/LayoutContext";
import { SearchContext } from "@/context/SearchContext";
import {
  IFollow,
  IFooter,
  IHeader,
  IPost,
  Page,
  SearchPage,
} from "@/services/interface";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface PageProps {
  data: SearchPage;
  headerData: IHeader;
  footerData: IFooter;
  followData: IFollow;
}

const Search: React.FC<PageProps> = ({
  data,
  footerData,
  headerData,
  followData,
}) => {
  const { setHeaderData, setFooterData } = useContext(LayoutContext);
  const {
    data: searchData,
    isLoading,
    isError,
    searchString,
    setSearchString,
  } = useContext(SearchContext);

  useEffect(() => {
    setHeaderData(headerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerData]);

  useEffect(() => {
    setFooterData(footerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerData]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);
  const [currentPosts, setCurrentPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setCurrentPosts(searchData?.slice(indexOfFirstPost, indexOfLastPost) || []);
  }, [currentPage, postsPerPage, searchData]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearchString(newSearchValue);
  };

  useEffect(() => {
    if (searchString === "" || isError) {
      setCurrentPage(1);
      setCurrentPosts([]);
    }
  }, [searchString, isError]);

  return (
    <>
      <div
        className="w-full h-[200px] md:h-[330px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${data.featured_image.url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[600px] relative w-full px-2 -mt-[50px]">
          <input
            className="font-semibold text-base leading-7 capitalize text-[#040303] font-sans w-full h-[40px] mx-auto px-[20px] py-[7px] rounded-[10px] outline-none border focus:border-none bg-[#EBEBEB]"
            placeholder={`${data.placeholder_for_search_input}`}
            value={searchString}
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
      </div>
      <div className="container">
        <div className="md:p-[30px] bg-white md:-mt-[70px] flex w-full flex-col tb:flex-row">
          <div className="tb:mr-[30px] w-full">
            <div className={`mt-[20px]`}>
              {isLoading ? (
                <Loader customClass="w-20 h-20 mx-auto mt-20" />
              ) : currentPosts?.length > 0 ? (
                currentPosts.map((post) => <Post key={post.ID} post={post} />)
              ) : (
                (currentPosts.length === 0 || isError) && (
                  <div className="w-full h-[300px] justify-center font-light text-2xl leading-7 flex items-center text-gray-900 font-Din">
                    No Data
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center ">
              {searchData && currentPosts.length > 0 && (
                <>
                  <PageSelect setPostsPerPage={setPostsPerPage} />
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={searchData.length}
                    currentPage={currentPage}
                    paginate={paginate}
                  />
                </>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col-reverse md:flex-row justify-between tb:block tb:w-[360px] tb:min-w-[300px]">
            <div className="mt-[30px] tb:mt-[0]">
              <FollowBlock followData={followData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;

export const getStaticPaths: GetStaticPaths = async () => {
  const languages = ["en", "zh"];

  const categoriesResponse = await fetch(
    `${baseUrl}/en/wp-json/nextquestion/v2/header`
  );
  const categoriesData: IHeader = await categoriesResponse.json();
  const categories = categoriesData.category_menu.map(
    (item) => item.category.slug
  );
  categories.push("all");

  const paths = languages.flatMap((lang) =>
    categories.map((category) => ({
      params: { lang, category },
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params?.lang;

  try {
    const response = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion/v2/search-page`
    );

    const data: Page = await response.json();
    const responseHeader = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion/v2/header`
    );
    const headerData: IHeader = await responseHeader.json();

    const responseFooter = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion/v2/footer`
    );
    const footerData: IFooter = await responseFooter.json();

    const responseFollow = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion/v2/follownextquestion`
    );
    const followData: IFooter = await responseFollow.json();

    return {
      props: {
        headerData,
        footerData,
        data,
        followData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: null,
        headerData: null,
        footerData: null,
        followData: null,
      },
    };
  }
};
