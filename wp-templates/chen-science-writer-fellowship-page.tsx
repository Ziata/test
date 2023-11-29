import {gql} from '@apollo/client';
import Header from '../components/Header';
import DefaultBackground from '../components/ui/DefaultBackground';
import Main from '../components/layout/Main';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import React from 'react';
import ChevronRightLink from '../components/ui/ChevronRightLink';
import Body from '../components/layout/Body';
import classes from '../styles/article.module.scss';
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import SEO from '../components/SEO'
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";
import Image from "next/future/image";

export default function ChenScienceWriterFellowshipPage(props) {
    const data = props.data;

    const title: string = data?.page?.translation?.title;
    const content: string = data?.page?.translation?.content ?? '';
    const contentDIV: JSX.Element = <div dangerouslySetInnerHTML={{__html: content}} className={classes.content}></div>

    const link: string = data?.page?.translation?.featuredImage?.node?.sourceUrl;
    const linkInfo = data?.page?.translation?.chenScienceWriterFellowshipPage?.link;

    const websiteTitle = data?.generalSettings?.title;
    const description = data?.generalSettings?.description;
    const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []
    let imageUrl = link || metaImageUrl
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

            <DefaultBackground className='h-screen'>
                <Body>
                    <Main>
                        <PageHero
                            title={title}
                            content={contentDIV}
                            heroImageUrl={link}
                            isImageBottom={false}
                            contentClass={'!mb-6 '}
                        />
                        <ChevronRightLink
                            className={`!mt-0 ${linkInfo?.content ? 'mb-0' : 'mb-12'}`}
                            link={linkInfo.url}
                            content={linkInfo.title}
                        />


                        {
                            linkInfo?.content ? (
                                <section className="mt-0 page-content">
                                    <div dangerouslySetInnerHTML={{__html: linkInfo.content}}
                                         className={["text-neutral-500 my-8",].join(' ')}></div>
                                </section>
                            ) : null
                        }

                        <Footer footermenus={footermenus}/>

                    </Main>
                </Body>
            </DefaultBackground>
        </>
    );
}

ChenScienceWriterFellowshipPage.query = gql`
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
  page(id: $databaseId, idType: URI) {
    translation(language: $pageLocale){
      title
      content
      featuredImage{
        node{
          sourceUrl
        }
      }
      chenScienceWriterFellowshipPage {
        link {
          title
          url
          content
        }
      }
    }
  }
}
`;
ChenScienceWriterFellowshipPage.variables = (seedQuery, ctx) => {

    return {
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};
