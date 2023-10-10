import FollowBlock from "@/components/FollowBlock/FollowBlock";
import PageSelect from "@/components/PageSelect/PageSelect";
import Pagination from "@/components/Pagination/Pagination";
import Post from "@/components/Post/Post";
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
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import { t } from "i18next";

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
  const { searchPosts, searchString } = useContext(SearchContext);

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
    setCurrentPosts(
      searchPosts[1]?.slice(indexOfFirstPost, indexOfLastPost) || []
    );
  }, [currentPage, postsPerPage, searchPosts]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          <h2 className="font-bold text-xl md:text-3xl leading-8 flex items-center text-[#cecece] font-Din text-center mt-[10px] md:mt-[40px] mb-[20px] md:mb-[50px]">
            {searchPosts?.[0] && (
              <>
                <span className="text-white">{searchPosts[0]}</span>&nbsp;
                {t("Search result for:")}&nbsp;
                <span className="text-white">{searchString}</span>
              </>
            )}
          </h2>
        </div>
      </div>
      <div className="container">
        <div className="md:p-[30px] bg-white md:-mt-[70px] flex w-full flex-col tb:flex-row">
          <div className="tb:mr-[30px] w-full">
            <div className={`mt-[20px]`}>
              {currentPosts?.length > 0
                ? currentPosts.map((post) => <Post key={post.ID} post={post} />)
                : currentPosts.length === 0 && (
                    <div className="w-full h-[300px] justify-center font-light text-2xl leading-7 flex items-center text-gray-900 font-Din">
                      {t("No Data")}
                    </div>
                  )}
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center ">
              {searchPosts[1]?.length > 0 && currentPosts.length > 0 && (
                <>
                  <PageSelect setPostsPerPage={setPostsPerPage} />
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={searchPosts[1].length}
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const lang = params?.lang;

  try {
    const response = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion${
        lang === "zh" ? lang : ""
      }/v2/search-page`
    );

    const data: Page = await response.json();
    const responseHeader = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion${
        lang === "zh" ? lang : ""
      }/v2/header`
    );
    const headerData: IHeader = await responseHeader.json();

    const responseFooter = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion${
        lang === "zh" ? lang : ""
      }/v2/footer`
    );
    const footerData: IFooter = await responseFooter.json();

    const responseFollow = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion${
        lang === "zh" ? lang : ""
      }/v2/follownextquestion`
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
