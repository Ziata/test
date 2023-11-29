import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/layout/Main';
import DefaultBackground from '../components/ui/DefaultBackground';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'next-i18next';
import PostCardBig from '../components/PostCardBig';
import {gql, useLazyQuery} from '@apollo/client';
import {toUpperLocale} from '../utils/i18n';
import {NextRouter, useRouter} from 'next/router';
import {Category, toLocaleCategory} from '../utils/category';
import {PlainMenuProp} from '../components/PlainMenu';
import {PostCardProp} from '../components/PostCard';
import Loading from '../components/ui/Loading';
import ListBoxPlain from '../components/ui/ListBoxPlain';
import PaginationNumber from '../components/PaginationNumber';
import PhotoView from '../components/newsletterPage/PhotoView';
import Body from '../components/layout/Body';
import SEO from '../components/SEO'
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";
import getSearchParams from "../utils/getSearchParams";

export const getNewsletters = (newsletters): PostCardProp[] => {
    return newsletters?.nodes?.map((item) => ({
        id: item?.id,
        image: item?.featuredImage?.node?.sourceUrl,
        category: item?.categories?.edges[0]?.node?.slug,
        title: item?.title || '',
        date: item?.date && new Date(item.date),
        link: item?.newsletterAndAnnualReport?.link,
        excerpt: item?.excerpt,
        reportLinks: [item?.newsletterAndAnnualReport?.link],
        showExcerpt: true
    }));
};

const getYearMenu = (categories: Category[], t): PlainMenuProp[] => {
    const allMenu: PlainMenuProp = {
        id: 'All',
        title: t('All')
    };
    const yearsMenu: PlainMenuProp[] = [allMenu];
    if (categories) {
        const restMenu = categories?.map((item): PlainMenuProp => (
            {
                id: item.match(/20[0-9]{2}/)[0],
                title: item.match(/20[0-9]{2}/)[0]
            }
        )).sort().reverse();
        yearsMenu.push(...restMenu);
    }
    return yearsMenu;
};

const getCategoriesByYear = (year: string, categories: Category[], router: NextRouter): Category[] => {
    return year === 'All' ? categories : [toLocaleCategory(`past-newsletter-${year}` as Category, router)];
}

export default function NewsletterPage(props) {
    const data = props.data;

    const router = useRouter();
    let params = getSearchParams()

    const [state, setState] = useState({
        current: params.page ? parseInt(params.page as string) : 1,
        selectedYear: params.year ? params.year as string : 'All'
    })


    const categories: Category[] = data?.categories?.edges
        ?.map((item) => item?.node?.translation?.slug);

    const [firstQuery, {data: firstData, loading: firstLoading}] = useLazyQuery(NewsletterPage.firstQuery);
    const [restQuery, {data: restData, loading: restLoading}] = useLazyQuery(NewsletterPage.restQuery);
    const {t} = useTranslation('common');
    const first: PostCardProp[] = getNewsletters(firstData?.first);
    const rest: PostCardProp[] = getNewsletters(restData?.rest);
    const total = restData?.rest?.pageInfo?.offsetPagination?.total - 1;
    const yearsMenu = getYearMenu(categories, t);

    useEffect(() => {
        if (data) {
            const selectedCategories = getCategoriesByYear(state.selectedYear, categories, router);
            firstQuery({
                variables: {
                    postLocale: toUpperLocale(router),
                    categories: selectedCategories,
                    pageLocale: props.locale.toUpperCase(),
                    databaseId: props.__SEED_NODE__.databaseId
                }
            });
        }
    }, [data, state.selectedYear]);

    useEffect(() => {
        if (categories) {
            const selectedCategories = getCategoriesByYear(state.selectedYear, categories, router);
            restQuery({
                variables: {
                    postLocale: toUpperLocale(router),
                    categories: selectedCategories,
                    offset: (state.current - 1) * 9 + 1,
                    pageLocale: props.locale.toUpperCase(),
                    databaseId: props.__SEED_NODE__.databaseId
                }
            });
        }
    }, [data, state.current, state.selectedYear]);


    const title: string = data?.page?.translation?.title;


    const websiteTitle = data?.generalSettings?.title;
    const description = data?.generalSettings?.description;
    const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []
    let imageUrl = metaImageUrl
    let url = websiteUrl + props.__SEED_NODE__.uri || websiteUrl

    return (
        <>
            <SEO
                title={`${title} - ${websiteTitle}`}
                description={description}
                imageUrl={imageUrl}
                url={url}
            />
            <Header navMenus={navMenus}/>

            <DefaultBackground>
                <Body>
                    <Main>
                        <section>
                            <h1 className="mb-8">
                                <span className="text-3xl">{t('Latest Newsletter')}</span>
                            </h1>
                            {first && first.length > 0 && (
                                <PostCardBig className="w-full h-[16rem]" post={first[0]} showTag={false}/>
                            )
                            }
                        </section>
                        <section className="mt-16 mb-24">
                            {categories && (
                                <div>
                                    {
                                        restLoading ? '' : (
                                            <div className="flex justify-end">
                                                <ListBoxPlain menus={yearsMenu}
                                                              optionsClassName={'w-auto'}
                                                              selectId={state.selectedYear}
                                                              onChange={(id) => {
                                                                  setState({...state, selectedYear: id, current: 1});
                                                                  router.query.year = id;
                                                                  router.query.page = "1";
                                                                  router.push(router, null, {shallow: true});
                                                              }}
                                                              menuTitle={t('Year')}/>
                                            </div>
                                        )
                                    }


                                    {rest ? <PhotoView newsletters={rest}/>
                                        : <Loading/>}
                                    {total != null && !restLoading && (
                                        <div className="mt-16 flex justify-center">
                                            <PaginationNumber current={state.current}
                                                              total={total}
                                                              onChange={(currentNum) => {
                                                                  setState({...state, current: currentNum});
                                                                  router.query.page = currentNum.toString();
                                                                  router.push(router, null, {shallow: true});
                                                              }}
                                                              pageSize={9}/>
                                        </div>
                                    )
                                    }
                                </div>
                            )}
                        </section>
                        <Footer footermenus={footermenus}/>
                    </Main>
                </Body>
            </DefaultBackground>
        </>
    );
}

NewsletterPage.query = gql`
${BlogInfoFragment}
query getCategoriesData($nameLike: String, $locale: LanguageCodeEnum!, $databaseId: ID!, $pageLocale: LanguageCodeEnum!
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
  page(id: $databaseId, idType: URI) {
    translation(language: $pageLocale){
      title
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
NewsletterPage.variables = (seedQuery, ctx) => {
    return {
        nameLike: 'Past Newsletter',
        locale: ctx.locale.toUpperCase(),
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};

NewsletterPage.firstQuery = gql`
query getFirstNewsletterData(
  $postLocale: LanguageCodeFilterEnum!, 
  $categories: [String]
  ) {
  first: posts(
    where: {
      language: $postLocale, 
      offsetPagination: {size: 1, offset: 0}, 
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

NewsletterPage.restQuery = gql`
query getNewslettersData(
  $postLocale: LanguageCodeFilterEnum!,
  $categories:[String]
  $offset: Int,
  ) {
  rest: posts(
    where: {
    language: $postLocale,
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
