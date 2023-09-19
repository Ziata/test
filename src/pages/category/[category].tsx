import FollowBlock from "@/components/FollowBlock/FollowBlock";
import PageSelect from "@/components/PageSelect/PageSelect";
import Pagination from "@/components/Pagination/Pagination";
import Post from "@/components/Post/Post";
import SmallPostCard from "@/components/SmallPostCard/SmallPostCard";
import Tags from "@/components/Tags/Tags";
import LanguageContext from "@/context/LanguageContext";
import { useGetAllPostQuery } from "@/services/api";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

function Category() {
  const router = useRouter();
  const { category } = router.query;
  const { currentLanguage } = useContext(LanguageContext);
  const { data, isLoading } = useGetAllPostQuery({ language: currentLanguage });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
          {category}
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
              {data && (
                <>
                  <PageSelect setPostsPerPage={setPostsPerPage} />
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={data.length}
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
}

export default Category;
