import NewsGallery from '../components/Newsroom/NewsGallery';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/layout/Main';
import DefaultBackground from '../components/ui/DefaultBackground';
import NewsGrid from '../components/Newsroom/NewsGrid';
import SignUpNewsletter from '../components/Newsroom/SignUpNewsletter';
import Body from '../components/layout/Body';
import Section from '../components/layout/Section';
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import SEO from '../components/SEO'
import {gql} from "@apollo/client";
import React from "react";
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";

export default function NewsroomPage(props) {
    const data = props.data;
    const title: string = data?.page?.translation?.title;
    const featuredTitle: string = data?.page?.translation?.newsroomPage?.featuredTitle;
    const meetingTitle: string = data?.page?.translation?.newsroomPage?.meetingTitle;
    const subscribe: string = data?.page?.translation?.newsroomPage?.subscribe;

    const websiteTitle = data?.generalSettings?.title;
    const description = data?.generalSettings?.description;
    const recommendNews = data?.page?.translation?.newsroomPage?.recommendNews || []
    const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []
    let imageUrl =  metaImageUrl
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
                        <NewsGallery  recommendNews={recommendNews} featuredTitle={featuredTitle}/>
                        <Section>
                            <NewsGrid meetingTitle={meetingTitle}/>
                        </Section>
                        <SignUpNewsletter subscribe={subscribe}/>
                        <Footer footermenus={footermenus}/>

                    </Main>
                </Body>
            </DefaultBackground>
        </>
    );
}
NewsroomPage.query = gql`
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
      newsroomPage {
        featuredTitle
        meetingTitle
        subscribe {
          title
          content
          link {
            text
            url
          }
        }
        recommendNews {
          recommendNew {
            ... on Post {
              slug
              id
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
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
              meetingReport {
                reportLinks {
                  link
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
NewsroomPage.variables = (seedQuery, ctx) => {
    return {
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};
