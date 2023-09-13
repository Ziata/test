"use client";
import HomeDaily from "@/components/HomeDaily/HomeDaily";
import HomeInterviews from "@/components/HomeInterviews/HomeInterviews";
import HomeLastNews from "@/components/HomeLastNews/HomeLastNews";
import HomeSpotlight from "@/components/HomeSpotlight/HomeSpotlight";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <HomeLastNews />
      <HomeSpotlight />
      <HomeDaily />
      <HomeInterviews />
    </>
  );
}
