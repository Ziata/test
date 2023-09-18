import { Page, IFollow, IFooter, IHeader, IHome } from "@/services/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://nextquestion.g-team.org/`,
  }),
  endpoints: (builder) => ({
    getHeader: builder.query<IHeader, { language: string }>({
      query: ({ language }) => `${language}/wp-json/nextquestion/v2/header`,
    }),
    getFooter: builder.query<IFooter, { language: string }>({
      query: ({ language }) => `${language}/wp-json/nextquestion/v2/footer`,
    }),
    getFollow: builder.query<IFollow, { language: string }>({
      query: ({ language }) =>
        `${language}/wp-json/nextquestion/v2/follownextquestion`,
    }),
    getHome: builder.query<IHome, { language: string }>({
      query: ({ language }) => `${language}/wp-json/nextquestion/v2/home-page`,
    }),
    getAbout: builder.query<Page, { language: string }>({
      query: ({ language }) => `${language}/wp-json/nextquestion/v2/about-page`,
    }),
    getContact: builder.query<Page, { language: string }>({
      query: ({ language }) =>
        `${language}/wp-json/nextquestion/v2/contact-page`,
    }),
  }),
});

export const {
  useGetHeaderQuery,
  useGetFooterQuery,
  useGetFollowQuery,
  useGetHomeQuery,
  useGetAboutQuery,
  useGetContactQuery,
} = api;
