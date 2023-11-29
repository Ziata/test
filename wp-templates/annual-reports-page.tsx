import Header from '../components/Header';
import DefaultBackground from '../components/ui/DefaultBackground';
import Main from '../components/layout/Main';
import Footer from '../components/Footer';
import React from 'react';
import {gql} from '@apollo/client';
import {Category, toLocaleCategory} from '../utils/category';
import Grid from '../components/layout/Grid';
import PostCardBig from '../components/annualReportsPage/PostCardBig';
import {PostCardProp} from '../components/PostCard';
import {useTranslation} from 'next-i18next';
import Body from '../components/layout/Body';
import SEO from '../components/SEO'
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";

export const getAnnualReports = (data): PostCardProp[] => data?.posts?.nodes?.map((item) => ({
    id: item?.id,
    image: item?.featuredImage?.node?.sourceUrl,
    category: item?.categories?.edges[0]?.node?.slug,
    title: item?.title,
    date: item?.date && new Date(item.date),
    link: item?.newsletterAndAnnualReport?.link,
    reportLinks: [item?.newsletterAndAnnualReport?.link],
}))

export default function AnnualReportsPage(props) {
    const {t} = useTranslation('common');
    const data = props.data;


    const reports: PostCardProp[] = getAnnualReports(data);
    const firstReport = reports?.[0];
    const restReports = reports?.slice(1);
    const title: string = data?.page?.translation?.title;


    const websiteTitle = data?.generalSettings?.title;
    const description = data?.generalSettings?.description;
    const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []
    let imageUrl = firstReport?.image || metaImageUrl
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
                                <span className="text-3xl">{t('Latest Annual Report')}</span>
                            </h1>
                            {firstReport &&
                                <PostCardBig className="w-full h-[16rem]" post={firstReport} showTag={false}/>}
                        </section>
                        <section className="mt-16 mb-12">
                            <Grid rowCount={3}>
                                {restReports?.map((item) => (<PostCardBig key={item.id}
                                                                          post={item}
                                                                          showTag={false}
                                                                          className="w-full h-[18rem]"/>))}
                            </Grid>
                        </section>
                        <Footer footermenus={footermenus}/>

                    </Main>
                </Body>
            </DefaultBackground>
        </>
    );
}

AnnualReportsPage.query = gql`
${BlogInfoFragment}
query getAnnualReportsData(
  $postLocale: LanguageCodeFilterEnum!,
  $category: String,
  $databaseId: ID!,
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
  page(id: $databaseId, idType: URI) {
    translation(language: $pageLocale){
      title
    }
  }
  posts(
    where: {
      language: $postLocale, 
      orderby: [{field: DATE, order: DESC}], 
      categoryName: $category
    }
  ) {
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
    }
  }
}
`;
AnnualReportsPage.variables = (seedQuery, ctx) => {
    return {
        category: toLocaleCategory('annual-report' as Category, ctx),
        pageLocale: ctx.locale.toUpperCase(),
        postLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};
