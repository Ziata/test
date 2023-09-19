import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import FollowBlock from "@/components/FollowBlock/FollowBlock";
import Loader from "@/components/Loader/Loader";
import LanguageContext from "@/context/LanguageContext";
import { PostContext } from "@/context/PostContext";
import { useGetPostQuery } from "@/services/api";
import { formatDate } from "@/utils";
import { skipToken } from "@reduxjs/toolkit/dist/query";
/* import SmallPostCard from "@/components/SmallPostCard/SmallPostCard"; */
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import test from "static/img/test.png";
import YouTube from "react-youtube";

function Post() {
  const { post: contextPost } = useContext(PostContext);

  const router = useRouter();

  const { currentLanguage } = useContext(LanguageContext);

  const { data, isLoading } = useGetPostQuery(
    contextPost || !router.query.post
      ? skipToken
      : {
          language: currentLanguage,
          slug: router.query.post as string,
        }
  );

  let post = contextPost || data;

  if (isLoading)
    return (
      <div className="flex w-full h-[70vh] items-center justify-center">
        <Loader customClass="w-[200px] h-[200px] mx-auto" />
      </div>
    );

  return (
    <>
      {post?.youtube_url ? (
        <YouTube
          videoId={post.youtube_url}
          iframeClassName={"w-full h-[250px] md:h-[600px]"}
        />
      ) : (
        post?.interview_audio && (
          <div
            className="w-full h-[200px] md:h-[600px] flex items-center justify-center"
            style={{
              backgroundImage: `url('${post.thumbnail}')`,
              backgroundColor: "#d7d6d6",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex flex-col items-center">
              <span className="font-light text-2xl leading-7 flex items-center text-white font-Din">
                {post?.interview_audio.title}
              </span>
              <h2 className="font-bold text-white font-Din text-[40px] mt-[20px] mb-[30px]">
                {post.post_title}
              </h2>
              <AudioPlayer src={post?.interview_audio.url} />
            </div>
          </div>
        )
      )}
      <div className="container">
        <div
          className={`${
            !post?.interview_audio && !post?.youtube_url
              ? "border-t-2 border-solid border-[#B3B3B3]"
              : ""
          } flex w-full flex-col tb:flex-row bg-white  pt-[25px]`}
        >
          <div className="tb:mr-[30px] w-full">
            {post?.interview_audio || post?.youtube_url ? (
              <div className="font-light text-[12px] md:text-sm leading-4 flex items-center font-Din text-[#33566C] gap-[4px] md:gap-[8px] mb-[20px]">
                <span>{formatDate(post.post_date)}</span>
                <span>|</span>
                <span>By {post.post_author}</span>
              </div>
            ) : (
              post && (
                <>
                  <h2 className="font-bold text-3xl leading-8 flex items-center text-[#002C47] font-Din">
                    {post.post_title}
                  </h2>
                  <span className="font-light text-base leading-5 flex items-center text-blue-700 font-Din my-[15px]">
                    From the journals
                  </span>
                  <div className="font-light text-[12px] md:text-sm leading-4 flex items-center font-Din text-[#33566C] gap-[4px] md:gap-[8px]">
                    <span>{formatDate(post.post_date)}</span>
                    <span>|</span>
                    <span>By {post.post_author}</span>
                  </div>
                  <Image src={test} alt="banner" className="w-full my-[20px]" />
                </>
              )
            )}
            {post && (
              <div
                className="font-light text-lg leading-6 items-center font-Din text-[#363636] text-content"
                dangerouslySetInnerHTML={{ __html: post.post_content }}
              />
            )}
          </div>
          <div className="w-full flex flex-col-reverse md:flex-row justify-between tb:block tb:w-[360px] tb:min-w-[300px]">
            <div className="mt-[30px] tb:mt-[0]">
              <FollowBlock />
            </div>
            <div>
              <h6 className="font-light text-2xl leading-7 flex items-center text-[#002C47] font-Din mt-[30px] mb-[25px]">
                Recomend
              </h6>
              {/*   <SmallPostCard />
            <SmallPostCard />
            <SmallPostCard /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
