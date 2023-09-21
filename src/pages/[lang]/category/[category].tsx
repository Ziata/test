import FollowBlock from "@/components/FollowBlock/FollowBlock";
import Loader from "@/components/Loader/Loader";
import PageSelect from "@/components/PageSelect/PageSelect";
import Pagination from "@/components/Pagination/Pagination";
import Post from "@/components/Post/Post";
import SmallPostCard from "@/components/SmallPostCard/SmallPostCard";
import Tags from "@/components/Tags/Tags";
import { LayoutContext } from "@/context/LayoutContext";
import { ICategory, IFooter, IHeader } from "@/services/interface";
import { GetStaticPaths, GetStaticProps } from "next";
import { useContext, useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface CategoryProps {
  data: ICategory;
  headerData: IHeader;
  footerData: IFooter;
}

const Category: React.FC<CategoryProps> = ({
  data,
  footerData,
  headerData,
}) => {
  const { setHeaderData, setFooterData } = useContext(LayoutContext);

  useEffect(() => {
    setHeaderData(headerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerData]);

  useEffect(() => {
    setFooterData(footerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerData]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = data?.all_posts?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

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
            <Tags />
            <div className="mt-[20px]">
              {currentPosts &&
                currentPosts.map((post) => <Post key={post.ID} post={post} />)}
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center ">
              {data?.all_posts && (
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
            <div className="mt-[30px] tb:mt-[0]">
              <FollowBlock />
            </div>
            <div>
              <h6 className="font-light text-2xl leading-7 flex items-center text-[#002C47] font-Din mt-[30px] mb-[25px]">
                Recomend
              </h6>
              {/*     <SmallPostCard />
              <SmallPostCard />
              <SmallPostCard /> */}
            </div>
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

    const responseHeader = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion/v2/header`
    );
    const headerData: IHeader = await responseHeader.json();

    const responseFooter = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion/v2/footer`
    );
    const footerData: IFooter = await responseFooter.json();

    return {
      props: {
        data,
        headerData,
        footerData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: null,
        headerData: null,
        footerData: null,
      },
    };
  }
};
