import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import FollowBlock from "@/components/FollowBlock/FollowBlock";
import { formatDate } from "@/utils";
/* import SmallPostCard from "@/components/SmallPostCard/SmallPostCard"; */
import Image from "next/image";
import test from "static/img/test.png";
import YouTube from "react-youtube";
import { GetStaticPaths, GetStaticProps } from "next";
import { IFooter, IHeader, IPost } from "@/services/interface";
import { useContext, useEffect } from "react";
import { LayoutContext } from "@/context/LayoutContext";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface PostProps {
  data: IPost;
  headerData: IHeader;
  footerData: IFooter;
}

const Post: React.FC<PostProps> = ({ data, footerData, headerData }) => {
  const { setHeaderData, setFooterData } = useContext(LayoutContext);

  useEffect(() => {
    setHeaderData(headerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerData]);

  useEffect(() => {
    setFooterData(footerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerData]);

  return (
    <>
      {data?.youtube_url ? (
        <YouTube
          videoId={data.youtube_url}
          iframeClassName={"w-full h-[250px] md:h-[600px]"}
        />
      ) : (
        data?.interview_audio && (
          <div
            className="w-full h-[200px] md:h-[600px] flex items-center justify-center"
            style={{
              backgroundImage: `url('${data.thumbnail}')`,
              backgroundColor: "#d7d6d6",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex flex-col items-center">
              <span className="font-light text-2xl leading-7 flex items-center text-white font-Din">
                {data?.interview_audio.title}
              </span>
              <h2 className="font-bold text-white font-Din text-[40px] mt-[20px] mb-[30px]">
                {data.post_title}
              </h2>
              <AudioPlayer src={data?.interview_audio.url} />
            </div>
          </div>
        )
      )}
      <div className="container">
        <div
          className={`${
            !data?.interview_audio && !data?.youtube_url
              ? "border-t-2 border-solid border-[#B3B3B3]"
              : ""
          } flex w-full flex-col tb:flex-row bg-white  pt-[25px]`}
        >
          <div className="tb:mr-[30px] w-full">
            {data?.interview_audio || data?.youtube_url ? (
              <div className="font-light text-[12px] md:text-sm leading-4 flex items-center font-Din text-[#33566C] gap-[4px] md:gap-[8px] mb-[20px]">
                <span>{formatDate(data.post_date)}</span>
                <span>|</span>
                <span>By {data.post_author}</span>
              </div>
            ) : (
              data && (
                <>
                  <h2 className="font-bold text-3xl leading-8 flex items-center text-[#002C47] font-Din">
                    {data.post_title}
                  </h2>
                  <span className="font-light text-base leading-5 flex items-center text-blue-700 font-Din my-[15px]">
                    From the journals
                  </span>
                  <div className="font-light text-[12px] md:text-sm leading-4 flex items-center font-Din text-[#33566C] gap-[4px] md:gap-[8px]">
                    <span>{formatDate(data.post_date)}</span>
                    <span>|</span>
                    <span>By {data.post_author}</span>
                  </div>
                  <Image src={test} alt="banner" className="w-full my-[20px]" />
                </>
              )
            )}
            {data && (
              <div
                className="font-light text-lg leading-6 items-center font-Din text-[#363636] text-content"
                dangerouslySetInnerHTML={{ __html: data.post_content }}
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
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const languages = ["en", "zh"];

  const postsResponse = await fetch(
    `${baseUrl}/en/wp-json/nextquestion/v2/all-posts`
  );
  const postsData: IPost[] = await postsResponse.json();
  const posts = postsData.map((post) => post.post_name);

  const paths = languages.flatMap((lang) =>
    posts.map((post) => ({
      params: { lang, post },
    }))
  );

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params?.lang;
  const slug = params?.category;

  try {
    const response = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion/v2/post/?slug=${slug}`
    );
    const data = await response.json();

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
