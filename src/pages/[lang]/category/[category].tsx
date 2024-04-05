import FollowBlock from "@/components/FollowBlock/FollowBlock";
import PageSelect from "@/components/PageSelect/PageSelect";
import Pagination from "@/components/Pagination/Pagination";
import Post from "@/components/Post/Post";
import Recomend from "@/components/Recomend/Recomend";
import Tabs from "@/components/Tabs/Tabs";
import { LayoutContext } from "@/context/LayoutContext";
import HeadSEO from "@/services/HeadSEO";
import {
  ICategory,
  IFollow,
  IFooter,
  IHeader,
  IPost,
} from "@/services/interface";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface CategoryProps {
  data: ICategory;
  recomendData: IPost[];
  headerData: IHeader;
  footerData: IFooter;
  followData: IFollow;
}

const Category: React.FC<CategoryProps> = ({
  data,
  recomendData,
  footerData,
  headerData,
  followData,
}) => {
  const router = useRouter();
  const { lang, category, page, subCategory } = router.query;
  const { setHeaderData, setFooterData } = useContext(LayoutContext);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
    data.cat_name
  );

  useEffect(() => {
    setSelectedSubcategory(
      subCategory ? (subCategory as string) : data.cat_name
    );
  }, [data.cat_name, subCategory]);

  useEffect(() => {
    setHeaderData(headerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerData]);

  useEffect(() => {
    setFooterData(footerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerData]);

  const handleSubcategoryClick = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    router.push(`/${lang}/category/${category}?page=1`);
  };

  const currentPage = typeof page === "string" ? parseInt(page, 10) || 1 : 1;
  const [postsPerPage, setPostsPerPage] = useState<number>(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.all_posts?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const filteredPosts =
    selectedSubcategory && data.cat_name !== "All"
      ? currentPosts?.filter((post) =>
          post.categories.some(
            (category) => category.name === selectedSubcategory
          )
        )
      : currentPosts;

  const pagesLength =
    selectedSubcategory && data.cat_name !== "All"
      ? data.all_posts?.filter((post) =>
          post.categories.some(
            (category) => category.name === selectedSubcategory
          )
        ).length
      : data.all_posts?.length;

  const paginate = (pageNumber: number) => {
    router.push(`/${lang}/category/${category}?page=${pageNumber}`);
  };

  return (
    <>
      <HeadSEO headerData={headerData} />
      <div
        className="w-full h-[200px] md:h-[330px] flex items-center justify-center"
        style={{
          backgroundImage: `url("${
            data.thumbnail ? data.thumbnail : "../../static/img/catBg.png"
          }")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="md:-mt-[70px] font-bold text-5xl text-white font-Din">
          {data?.cat_name}
        </h2>
      </div>
      <div className="container">
        <div className="md:p-[30px] bg-white md:-mt-[70px] flex w-full flex-col tb:flex-row">
          <div className="tb:mr-[30px] w-full">
            {data?.subcategories && data?.subcategories.length > 0 && (
              <Tabs
                subcategories={[data, ...data.subcategories]}
                selectedSubcategory={selectedSubcategory}
                onSubcategoryClick={handleSubcategoryClick}
              />
            )}
            <div
              className={`${
                data?.slug === "people"
                  ? "flex-col flex justify-between md:flex-row md:flex-wrap gap-x-[1%] gap-y-[30px] pb-[30px]"
                  : ""
              } mt-[20px]`}
            >
              {filteredPosts?.length > 0 ? (
                filteredPosts.map((post) => (
                  <Post
                    key={post.ID}
                    post={post}
                    isInterview={data?.slug === "people"}
                  />
                ))
              ) : (
                <div className="w-full h-[300px] justify-center font-light text-2xl leading-7 flex items-center text-[#002c47] font-Din">
                  No Data
                </div>
              )}
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center ">
              {filteredPosts?.length > 0 && (
                <>
                  <PageSelect setPostsPerPage={setPostsPerPage} />
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={pagesLength}
                    currentPage={currentPage}
                    paginate={paginate}
                  />
                </>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col-reverse md:flex-row justify-between tb:block tb:w-[360px] tb:min-w-[300px]">
            <div className="mt-[30px] min-w-[300px] md:mr-[20px] tb:min-w-auto tb:mt-[0] tb:mr-[0]">
              <FollowBlock followData={followData} />
            </div>
            <Recomend posts={recomendData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const lang = params?.lang;
  const slug = params?.category;

  try {
    let data: ICategory | null = null;

    if (slug === "all") {
      const response = await fetch(
        `${baseUrl}/${lang}/wp-json/nextquestion${
          lang === "zh" ? lang : ""
        }/v2/all-posts`
      );
      const allPosts = await response.json();
      data = { cat_name: "All", slug: "all", all_posts: allPosts } as ICategory;
    } else {
      const response = await fetch(
        `${baseUrl}/${lang}/wp-json/nextquestion${
          lang === "zh" ? lang : ""
        }/v2/category/?slug=${slug}`
      );
      data = (await response.json()) as ICategory;
    }

    const responseRecomend = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion${
        lang === "zh" ? lang : ""
      }/v2/all-posts`
    );
    const recomendData: IPost[] = await responseRecomend.json();

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
        data,
        recomendData,
        headerData,
        footerData,
        followData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: null,
        recomendData: null,
        headerData: null,
        footerData: null,
        followData: null,
      },
    };
  }
};
