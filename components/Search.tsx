// 全局搜索框组件
import React, {useEffect, useMemo, useRef, useState} from 'react';
import SearchButton from './SearchButton';
import SearchPanel from './SearchPanel';
import {gql, useLazyQuery} from '@apollo/client';
import debounce from 'lodash.debounce';
import {useRouter} from 'next/router';
import {toUpperLocale} from '../utils/i18n';
import {useTranslation} from 'next-i18next';
import {SearchListProps} from './SearchList';
import {SearchCardProp} from './SearchCard';
import {getCategories} from './homePage/NewsOverview';
import {Category, toLocaleCategory} from '../utils/category';
import LinkPath from "../utils/LinkPath";

const reg = /<[^>]+>/g;

interface SearchProps {
    className?: string;
}

export const newsSearchTitle = (t) => t('News') + ' & ' + t('Meeting Reports');
export const eventSearchTitle = (t) => t('Events');
export const newsletterSearchTitle = (t) => t('Newsletter') + ' & ' + t('Annual Reports');

export default function Search({
                                   className = ''
                               }: SearchProps) {
    const {t} = useTranslation('common');
    const router = useRouter();
    const inputEl = useRef<HTMLInputElement>(null);

    const [active, setActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const [categoryQuery, {data: categoryData}] = useLazyQuery(Search.queryCategories);
    useEffect(() => {
        if (active && !categories) {
            categoryQuery({
                variables: {
                    locale: toUpperLocale(router),
                    nameLike: 'Past Newsletter'
                }
            })
        }
    }, [active]);
    const categories: Category[] = categoryData?.categories?.edges
        ?.map((item) => item?.node?.translation?.slug);
    categories?.push(toLocaleCategory('annual-report' as Category, router));

    const [searchQuery, {data, loading}] = useLazyQuery(Search.query);
    const debounceSearch = useMemo(() => debounce((value, categories) => {
            searchQuery({
                variables: {
                    postLocale: toUpperLocale(router),
                    search: value,
                    categories: getCategories('All', router),
                    newsletterAndAnnualReportsCategories: categories,
                    size: 4
                }
            })
        }, 500)
        , []);
    useEffect(() => {
        return debounceSearch.cancel();
    }, []);


    const news: SearchCardProp[] = data?.posts?.nodes?.map((item) => {
        const link = item?.meetingReport?.reportLinks?.length ? item?.meetingReport?.reportLinks[0]?.link : `${LinkPath.news}${item.slug}`;
        return {
            title: item?.title,
            content: item?.content ? item?.content.replace(reg, '') : '',
            link
        }
    });
    const events = data?.events?.nodes?.map((item) => (
        {
            title: item?.title,
            content: item?.content ? item?.content.replace(reg, '') : '',
            link: `${LinkPath.events}${item?.slug}`
        }
    ));
    const newsletterAndAnnualReports = data?.newsletterAndAnnualReports?.nodes?.map((item) => (
        {
            title: item?.title,
            content: item?.excerpt ? item?.excerpt.replace(reg, '') : '',
            link: item?.newsletterAndAnnualReport?.link
        }
    ));
    const categorizedPosts: SearchListProps[] = [
        {
            categoryTitle: newsSearchTitle(t),
            posts: news,
            highlightText: searchValue,
            moreLink: `/search?type=news&search=${searchValue}`
        },
        {
            categoryTitle: eventSearchTitle(t),
            posts: events,
            highlightText: searchValue,
            moreLink: `/search?type=event&search=${searchValue}`
        },
        {
            categoryTitle: newsletterSearchTitle(t),
            posts: newsletterAndAnnualReports,
            highlightText: searchValue,
            moreLink: `/search?type=newsletter&search=${searchValue}`
        }
    ]


    useEffect(() => {
        if (window) {
            if (active) {
                document.body.style.overflow = 'hidden';
                inputEl.current.focus();
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    }, [active]);

    const onClose = () => {
        setActive(false)
    }

    return (
        <>
            <SearchButton onClick={() => setActive(!active)}/>
            <div
                className={[
                    "fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-50 cursor-default text-tcci-blue",
                    active ? 'block' : 'hidden',
                    className
                ].join(' ')}
                onKeyUp={(e) => e.key === 'Escape' && setActive(false)}>
                <div className="fixed top-0 left-0 w-screen h-screen" onClick={() => {
                    setActive(false);
                }}>
                </div>
                <SearchPanel ref={inputEl}
                             onClose={onClose}
                             onInputChange={(value: string) => {
                                 setSearchValue(value);
                                 debounceSearch(value, categories);
                             }}
                             loading={loading}
                             inputValue={searchValue}
                             categorizedPosts={categorizedPosts}
                />
            </div>
        </>
    )
}

Search.queryCategories = gql`
query getCategoriesData($nameLike: String, $locale: LanguageCodeEnum!) {
  categories(where: {nameLike: $nameLike}) {
    edges {
      node {
        translation(language: $locale) {
          slug
        }
      }
    }
  }
}
`;

Search.query = gql`
query queryData (
  $search:String
  $postLocale:LanguageCodeFilterEnum!
  $categories: [String],
  $newsletterAndAnnualReportsCategories: [String],
  $size: Int
){
  posts(first: $size,where: {
    search:$search, 
    language:$postLocale,
    taxQuery: {
      taxArray: [
        {
          taxonomy: CATEGORY, 
          field: SLUG, 
          terms: $categories, 
          includeChildren: false, 
          operator: IN
        }
      ]
    }
  }){
    nodes{
      title
      slug
      content
      meetingReport {
          reportLinks {
            link
          }
        }
    }
  }
  newsletterAndAnnualReports:posts(first: $size,where: {
    search:$search, 
    language:$postLocale,
    taxQuery: {
      taxArray: [
        {
          taxonomy: CATEGORY, 
          field: SLUG, 
          terms: $newsletterAndAnnualReportsCategories, 
          includeChildren: false, 
          operator: IN
        }
      ]
    }
  }){
    nodes{
      title
      newsletterAndAnnualReport {
        link
      }
      excerpt
    }
  }
  events(first: $size, where:{search: $search, language:$postLocale}){
    nodes{
      slug
      title
      content
    }
  }
}
`;
