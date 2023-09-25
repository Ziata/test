import React, { useContext, useEffect } from "react";
import HomeDaily from "@/components/HomeDaily/HomeDaily";
import HomeInterviews from "@/components/HomeInterviews/HomeInterviews";
import HomeLastNews from "@/components/HomeLastNews/HomeLastNews";
import HomeSpotlight from "@/components/HomeSpotlight/HomeSpotlight";
import { IFooter, IHeader, IHome } from "@/services/interface";
import { GetStaticPaths, GetStaticProps } from "next";
import { LayoutContext } from "@/context/LayoutContext";

interface HomeProps {
  data: IHome;
  headerData: IHeader;
  footerData: IFooter;
}

const Home: React.FC<HomeProps> = ({ data, footerData, headerData }) => {
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
        <HomeLastNews data={data.firstBlock} />
        <HomeSpotlight data={data.secondBlock} />
        {data.thirdBlock.thirdBlockPosts.length > 0 && (
          <HomeDaily data={data.thirdBlock} />
        )}
        <HomeInterviews data={data.fourthBlock} />
      </>
    )
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const languages = ["en", "zh"];

  const paths = languages.map((lang) => ({
    params: { lang },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params?.lang;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await fetch(
      `${baseUrl}/${lang}/wp-json/nextquestion/v2/home-page`
    );
    const data: IHome = await response.json();

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

export default Home;
