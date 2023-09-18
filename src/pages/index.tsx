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

  return isLoading ? (
    <div className="flex w-full h-[70vh] items-center justify-center">
      <Loader customClass="w-[200px] h-[200px] mx-auto" />
    </div>
  ) : (
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
}
