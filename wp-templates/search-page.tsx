import Header from '../components/Header';
import DefaultBackground from '../components/ui/DefaultBackground';
import Footer from '../components/Footer';
import Main from '../components/layout/Main';
import {useRouter} from 'next/router';
import PhotoView from '../components/SearchPage/PhotoView';
import React, {useEffect, useState} from 'react';
import NewsGrid from '../components/SearchPage/NewsGrid';
import Body from '../components/layout/Body';
import {useTranslation} from 'next-i18next';
import {gql, useLazyQuery} from '@apollo/client';
import {toUpperLocale} from '../utils/i18n';
import {getEvents} from './supporting-scientific-meetings-and-conferences-page';
import {getNewsletters} from './newsletter-page';
import {Category, toLocaleCategory} from '../utils/category';
import {eventSearchTitle, newsletterSearchTitle, newsSearchTitle} from '../components/Search';
import SEO from '../components/SEO'
import {BlogInfoFragment} from "../fragments/GeneralSettings";
import Section from '../components/layout/Section';
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";

export default function SearchPage(props) {
    const {data: pageData} = props;

    const router = useRouter();
    const type = router.query.type as string;
    const search = router.query.search as string;

    const {t} = useTranslation('common');
    const [current, setCurrent] = useState(router.query.page ? parseInt(router.query.page as string) : 1);

    const categories: Category[] = pageData?.categories?.edges
        ?.map((item) => item?.node?.translation?.slug);
    categories?.push(toLocaleCategory('annual-report' as Category, router));

    const query = type === 'event' ? SearchPage.eventQuery : SearchPage.newsletterQuery;
    const [lazyQuery, {data}] = useLazyQuery(query, {
        variables: {
            locale: toUpperLocale(router),
            offset: (current - 1) * 9,
            search: search,
            categories: categories
        }
    });

    const websiteTitle = pageData?.generalSettings?.title;
    const description = pageData?.generalSettings?.description;
    const navMenus = pageData?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = pageData?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []
    let imageUrl = metaImageUrl
    let url = websiteUrl + props.__SEED_NODE__.uri || websiteUrl

    useEffect(() => {
        if (type !== 'news') {
            lazyQuery();
        }
    }, [])


    let grid;
    let gridData;
    let total;
    let title;
    if (type === 'news') {
        title = newsSearchTitle(t);
        grid = <NewsGrid showFilterBar={false} search={search}/>
    } else {
        if (type === 'event') {
            title = eventSearchTitle(t);
            gridData = getEvents(data);
            total = data?.events?.pageInfo?.offsetPagination?.total;
        }
        if (type === 'newsletter') {
            title = newsletterSearchTitle(t);
            gridData = getNewsletters(data?.posts);
            total = data?.events?.pageInfo?.offsetPagination?.total;
        }
        grid = <PhotoView
            state={{
                type,
                search,
                PAGE_TYPE: 'SearchPhotoView'
            }}
            total={total}
            events={gridData}
            page={current}
            onChange={(currentNum) => {
                // setCurrent(currentNum)
            }}/>

    }


    return (
        <>

            <SEO
                title={`${search ? `"${search}"` : ''} ${t('Search result for')} - ${websiteTitle}`}
                description={description}
                imageUrl={imageUrl}
                url={url}
            />

            <Header navMenus={navMenus}/>

            <DefaultBackground>
                <Body className="!pb-0">
                    <Main>
                        <Section className={'!mt-0'}>
                            <header className="text-tcci-blue">
                                <h1 className="mb-8">
                                <span
                                    className="text-3xl">{title}&nbsp;&nbsp;&nbsp;{t('Search result for')}:&nbsp;&nbsp;&nbsp;
                                    <span className="text-tcci-orange">{search}</span></span>
                                </h1>
                            </header>
                            {grid}
                        </Section>
                        <Footer footermenus={footermenus}/>

                    </Main>
                </Body>
            </DefaultBackground>
        </>
    );
}

SearchPage.eventQuery = gql`
query GetEventsData(
  $locale: LanguageCodeFilterEnum!,
  $offset: Int,
  $search: String
) {
  events(
    where: {
      search: $search,
      offsetPagination: {
        size: 9,
        offset: $offset
      },
      language: $locale, 
      orderby: {field: DATE, order: DESC}, 
    }
  ) {
    pageInfo {
      offsetPagination {
        total
      }
    }
    nodes {
      slug
      id
      featuredImage {
        node {
          sourceUrl(size: MEDIUM_LARGE)
        }
      }
      eventTypes {
        edges {
          node {
            slug
          }
        }
      }
      vsComposerExcerptRendered
      event {
        eventStart
        eventEnd
        organizer
      }
      title
    }
  }
}
`;

SearchPage.newsletterQuery = gql`
query getNewslettersData(
  $locale: LanguageCodeFilterEnum!,
  $search: String,
  $categories:[String]
  $offset: Int
  ) {
  posts(
    where: {
    search: $search
    language: $locale,
    offsetPagination: {size: 9, offset: $offset},
    orderby: [{field: DATE, order: DESC}],
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
  }) {
    pageInfo{
      offsetPagination{
        total
      }
    }
    nodes {
      id
      featuredImage {
        node {
          sourceUrl
        }
      }
      categories {
        edges {
          node {
            slug
          }
        }
      }
      title(format: RENDERED)
      date
      newsletterAndAnnualReport {
        link
      }
      excerpt
    }
  }
}
`;

SearchPage.query = gql`
${BlogInfoFragment}
query getCategoriesData(
  $nameLike: String, 
  $locale: LanguageCodeEnum!,
  $pageLocale: LanguageCodeEnum!
) {
  generalSettings {
        ...BlogInfoFragment
  }
  navmenu(id: "11891", idType: DATABASE_ID) {
    translation(language: $pageLocale) {
      navMenus {
        navmenus {
          link
          parent
          title
          open
          children {
            link
            title
            open
            children {
              link
              title
              open
            }
          }
        }
      }
    }
  }
 footerNavmenu: navmenu(id: "11906", idType: DATABASE_ID) {
    translation(language: $pageLocale) {
      footerNavMenus {
        footermenus {
          link
          title
        }
      }
    }
  }
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
SearchPage.variables = (seedQuery, ctx) => {
    return {
        locale: ctx.locale.toUpperCase(),
        pageLocale: ctx.locale.toUpperCase(),
        nameLike: 'Past Newsletter'
    };
};
