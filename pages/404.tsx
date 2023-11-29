import Header from "../components/Header";
import Main from "../components/layout/Main";
import Footer from "../components/Footer";
import SEO from '../components/SEO'
import {GetStaticPropsContext} from "next";
import {getWordPressProps} from "@faustwp/core";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {CompassOutlined} from '@ant-design/icons';
import {gql} from "@apollo/client";
import {BlogInfoFragment} from "../fragments/GeneralSettings";
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";
import React from "react";

export default function Custom404(props) {
    const {t} = useTranslation('common')
    const data = props.__TEMPLATE_QUERY_DATA__;



    const websiteTitle = data?.generalSettings?.title;
    const description = data?.generalSettings?.description;
    const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []
    let imageUrl =  metaImageUrl
    let url = websiteUrl + props.__SEED_NODE__.uri || websiteUrl

    return (
        <>
            <SEO
                title={`404 - ${websiteTitle}`}
                description={description}
                imageUrl={imageUrl}
                url={url}
            />

            <Header navMenus={navMenus}/>
            <Main>
                <div className="page-404 py-24 min-h-full text-center">
                    <CompassOutlined className="text-[12rem] text-[rgba(126,126,126,0.1)]"/>

                    <h1 className="text-center text-4xl	py-6">{t('Page not found')}</h1>

                    <p className="text-center">The link you followed may be broken, or the page may have been
                        removed.</p>
                </div>
                <Footer footermenus={footermenus}/>
            </Main>
        </>
    )
}

export async function getStaticProps(ctx: GetStaticPropsContext) {

    const wpProps = await getWordPressProps({ctx});
    if ((wpProps as any).props) {
        Object.assign((wpProps as any).props, await serverSideTranslations(ctx.locale, ['common']), {locale: ctx.locale})
    }
    return {
        ...wpProps,
        revalidate: 120
    };
}
Custom404.query = gql`
${BlogInfoFragment}
query GetPageData(
  $databaseId: ID!
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
}
`;

Custom404.variables = (seedQuery, ctx) => {
    return {
        locale: ctx.locale.toUpperCase(),
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};
