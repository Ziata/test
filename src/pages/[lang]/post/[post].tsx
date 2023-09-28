import FollowBlock from "@/components/FollowBlock/FollowBlock";
import { formatDate } from "@/utils";
import Image from "next/image";
import test from "static/img/test.png";
import YouTube from "react-youtube";
import { GetServerSideProps } from "next";
import { IFollow, IFooter, IHeader, IPost } from "@/services/interface";
import { useContext, useEffect, useRef } from "react";
import { LayoutContext } from "@/context/LayoutContext";
import Recomend from "@/components/Recomend/Recomend";
import Typed from "react-typed";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface PostProps {
  data: IPost;
  recomendData: IPost[];
  headerData: IHeader;
  footerData: IFooter;
  followData: IFollow;
}

const Post: React.FC<PostProps> = ({
  data,
  recomendData,
  footerData,
  headerData,
  followData,
}) => {
  const { setHeaderData, setFooterData } = useContext(LayoutContext);
  const typedRef = useRef(null) as any;

  useEffect(() => {
    setHeaderData(headerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerData]);

  useEffect(() => {
    setFooterData(footerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerData]);

  useEffect(() => {
    if (!data) return;
    const sendViewsRequest = async () => {
      await fetch(
        `${baseUrl}/wp-json/nextquestion/v2/views/?postId=${data.ID}`
      );
    };
    sendViewsRequest();
    typedRef.current && typedRef.current.reset();
  }, [data]);

  const extractSrcFromIframe = (iframeString: string) => {
    const regex = /src\s*=\s*["']([^"']+)["']/;
    const match = iframeString.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return "";
  };

  return (
    <>
      {data?.youtube_url ? (
        <YouTube
          videoId={data.youtube_url}
          iframeClassName={"w-full h-[250px] md:h-[600px]"}
        />
      ) : (
        data?.interview_audio && (
          <div className="w-full flex items-center justify-center container">
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              height="175"
              style={{
                width: "100%",
                overflow: "hidden",
                borderRadius: "10px",
                height: "200px",
              }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src={extractSrcFromIframe(data.interview_audio)}
            />
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
              <div className="font-light text-[12px] md:text-[18px] leading-4 flex items-center font-Din text-[#33566C] gap-[4px] md:gap-[10px] mb-[20px]">
                <span>{formatDate(data.post_date)}</span>
                {data.interviewer && (
                  <>
                    <span>Interviewer - </span>
                    <span>{data.interviewer}</span>
                  </>
                )}
                {data.reporter && (
                  <>
                    <span>Reporter - </span>
                    <span>{data.reporter}</span>
                  </>
                )}
              </div>
            ) : (
              data && (
                <>
                  <h2 className="font-bold text-3xl leading-8 flex items-center text-[#002C47] font-Din">
                    <Typed
                      showCursor={false}
                      strings={[data.post_title]}
                      typeSpeed={70}
                      typedRef={(typed: any) => {
                        typedRef.current = typed;
                      }}
                    />
                  </h2>
                  <span className="font-light text-base leading-5 flex items-center text-blue-700 font-Din my-[15px]">
                    {data.categories[1]?.cat_name ||
                      data.categories[0]?.cat_name}
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
            <div className="mt-[30px] min-w-[300px] md:mr-[20px] tb:min-w-auto tb:mt-[0] tb:mr-[0]">
              <FollowBlock followData={followData} />
            </div>
            <div>
              <Recomend posts={recomendData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const lang = params?.lang;
  const slug = params?.post;

  try {
    const response = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion/v2/post/?slug=${slug}`
    );
    const data = await response.json();

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
        headerData,
        recomendData,
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
