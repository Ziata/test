import { Page, IFollow, IHome, IPost, ICategory } from "@/services/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  endpoints: (builder) => ({
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
    getAllPost: builder.query<IPost[], { language: string }>({
      query: ({ language }) =>
        `${language}/wp-json/nextquestion/v2/interview-posts`,
    }),
    getPost: builder.query<IPost, { language: string; slug?: string }>({
      query: ({ language, slug }) =>
        `${language}/wp-json/nextquestion/v2/post/?slug=${slug}`,
    }),
    getSearch: builder.query<IPost[], { language: string; slug?: string }>({
      query: ({ language, slug }) =>
        `${language}/wp-json/nextquestion/v2/search?s=${slug}`,
    }),
    sendMessage: builder.mutation<any, { body: any; id: string }>({
      query: ({ body, id }) => ({
        url: `/wp-json/contact-form-7/v1/contact-forms/${id}/feedback`,
        method: "POST",
        body: body,
      }),
    }),
    getPostByCategories: builder.query<
      ICategory,
      { language: string; slug: string }
    >({
      query: ({ language, slug }) => {
        if (slug === "all") {
          return `${language}/wp-json/nextquestion/v2/interview-posts`;
        } else {
          return `${language}/wp-json/nextquestion/v2/category/?slug=${slug}`;
        }
      },
    }),
  }),
});

export const {
  useGetFollowQuery,
  useGetHomeQuery,
  useGetAboutQuery,
  useGetContactQuery,
  useGetAllPostQuery,
  useGetPostQuery,
  useGetPostByCategoriesQuery,
  useGetSearchQuery,
  useSendMessageMutation,
} = api;
