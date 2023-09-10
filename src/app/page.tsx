"use client";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="font-Din">
      <h1>{t("welcomeMessage", { useSuspense: true })}</h1>
    </div>
  );
}
