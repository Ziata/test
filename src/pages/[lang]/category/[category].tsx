import FollowBlock from "@/components/FollowBlock/FollowBlock";
import PageSelect from "@/components/PageSelect/PageSelect";
import Pagination from "@/components/Pagination/Pagination";
import Post from "@/components/Post/Post";
import Recomend from "@/components/Recomend/Recomend";
import SmallPostCard from "@/components/SmallPostCard/SmallPostCard";
import Tabs from "@/components/Tabs/Tabs";
import { LayoutContext } from "@/context/LayoutContext";
import {
  ICategory,
  IFollow,
  IFooter,
  IHeader,
  IPost,
} from "@/services/interface";
import { GetStaticPaths, GetStaticProps } from "next";
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
  const { setHeaderData, setFooterData } = useContext(LayoutContext);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
    data.cat_name
  );

  useEffect(() => {
    setSelectedSubcategory(data.cat_name);
  }, [data.cat_name]);

  useEffect(() => {
    setHeaderData(headerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerData]);

  useEffect(() => {
    setFooterData(footerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerData]);

  const handleSubcategoryClick = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = data?.all_posts?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [data.cat_name]);

  const filteredPosts = selectedSubcategory
    ? currentPosts?.filter((post) =>
        post.categories.some(
          (category) => category.name === selectedSubcategory
        )
      )
    : currentPosts;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div
        className="w-full h-[200px] md:h-[330px] flex items-center justify-center"
        style={{
          backgroundImage: "url(../../static/img/catBg.png)",
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
                <div className="w-full h-[300px] justify-center font-light text-2xl leading-7 flex items-center text-gray-900 font-Din">
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
                    totalPosts={data.all_posts.length}
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
  const slug = params?.category;

  try {
    let data: ICategory | null = null;

    if (slug === "all") {
      const response = await fetch(
        `${baseUrl}/${lang}/wp-json/nextquestion/v2/interview-posts`
      );
      const allPosts = await response.json();
      data = { cat_name: "All", slug: "all", all_posts: allPosts } as ICategory;
    } else {
      const response = await fetch(
        `${baseUrl}/${lang}/wp-json/nextquestion/v2/category/?slug=${slug}`
      );
      data = (await response.json()) as ICategory;
    }

    const responseRecomend = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion/v2/all-posts`
    );
    const recomendData: IPost[] = await responseRecomend.json();

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
