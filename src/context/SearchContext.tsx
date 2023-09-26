import { useGetSearchQuery } from "@/services/api";
import { IPost } from "@/services/interface";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/router";
import React, { ReactNode, createContext, useState } from "react";

interface SearchtProps {
  data: IPost[] | undefined;
  searchString: string;
  isLoading: boolean;
  isError: boolean;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchtProps>({
  data: undefined,
  searchString: "",
  isLoading: false,
  isError: false,
  setSearchString: () => {},
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchString, setSearchString] = useState<string>("");

  const router = useRouter();

  const currentLanguage = router.query.lang as string;

  const { data, isLoading, isError } = useGetSearchQuery(
    searchString ? { slug: searchString, language: currentLanguage } : skipToken
  );

  return (
    <SearchContext.Provider
      value={{ data, isLoading, isError, searchString, setSearchString }}
    >
      {children}
    </SearchContext.Provider>
  );
};
