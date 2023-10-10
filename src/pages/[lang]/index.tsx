import React, { useContext, useEffect } from "react";
import HomeDaily from "@/components/HomeDaily/HomeDaily";
import HomeInterviews from "@/components/HomeInterviews/HomeInterviews";
import HomeLastNews from "@/components/HomeLastNews/HomeLastNews";
import HomeSpotlight from "@/components/HomeSpotlight/HomeSpotlight";
import { IFollow, IFooter, IHeader, IHome } from "@/services/interface";
import { GetServerSideProps } from "next";
import { LayoutContext } from "@/context/LayoutContext";

interface HomeProps {
  data: IHome;
  headerData: IHeader;
  footerData: IFooter;
  followData: IFollow;
}

const Home: React.FC<HomeProps> = ({
  data,
  footerData,
  headerData,
  followData,
}) => {
  const { setHeaderData, setFooterData } = useContext(LayoutContext);

  useEffect(() => {
    setHeaderData(headerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerData]);

  useEffect(() => {
    setFooterData(footerData); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerData]);

  return (
    data && (
      <>
        {data.firstBlock.latestNews.length > 0 && (
          <HomeLastNews data={data.firstBlock} />
        )}
        {data.secondBlock.secondBlockPosts.length > 0 && (
          <HomeSpotlight data={data.secondBlock} followData={followData} />
        )}
        {data.thirdBlock?.thirdBlockPosts.length > 0 && (
          <HomeDaily data={data.thirdBlock} />
        )}
        {data.fourthBlock?.fourthBlockPosts.length > 0 && (
          <HomeInterviews data={data.fourthBlock} />
        )}
      </>
    )
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const lang = params?.lang;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion${
        lang === "zh" ? lang : ""
      }/v2/home-page`
    );
    const data: IHome = await response.json();

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
        headerData: null,
        footerData: null,
        followData: null,
      },
    };
  }
};

export default Home;
