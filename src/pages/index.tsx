"use client";
import { useContext, useEffect } from "react";
import HomeDaily from "@/components/HomeDaily/HomeDaily";
import HomeInterviews from "@/components/HomeInterviews/HomeInterviews";
import HomeLastNews from "@/components/HomeLastNews/HomeLastNews";
import HomeSpotlight from "@/components/HomeSpotlight/HomeSpotlight";
import LanguageContext from "@/context/LanguageContext";
import { useGetHomeQuery } from "@/services/api";
import Loader from "@/components/Loader/Loader";

export default function Home() {
  const { currentLanguage } = useContext(LanguageContext);
  const { data, isLoading } = useGetHomeQuery({ language: currentLanguage });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return isLoading ? (
    <div className="flex w-full h-[70vh] items-center justify-center">
      <Loader customClass="w-[200px] h-[200px] mx-auto" />
    </div>
  ) : (
    data && (
      <>
        <HomeLastNews data={data.firstBlock[0]} />
        <HomeSpotlight data={data.secondBlock[0]} />
        {data.thirdBlock[0].thirdBlockPosts[0].length > 0 && (
          <HomeDaily data={data.thirdBlock[0]} />
        )}
        <HomeInterviews data={data.fourthBlock[0]} />
      </>
    )
  );
}
