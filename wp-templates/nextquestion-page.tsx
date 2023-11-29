import {gql} from '@apollo/client';
import Header from '../components/Header';
import React from 'react';
import Main from '../components/layout/Main';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import DefaultBackground from '../components/ui/DefaultBackground';
import Body from '../components/layout/Body';
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import SEO from '../components/SEO'
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";

export default function NextQuestionPage(props) {

    const data = props.data;


    const title: string = data?.page?.translation?.title;
    const content: string = data?.page?.translation?.content;
    const link: string = data?.page?.translation?.featuredImage?.node?.sourceUrl;

    let QRCode = data?.page?.translation?.nextquestionPage?.qrCode?.sourceUrl
    let tips = data?.page?.translation?.nextquestionPage?.tips

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

            <DefaultBackground>
                <Body>
                    <Main>
                        <PageHero
                            title={title}
                            content={content}
                            heroImageUrl={link}
                            isImageBottom={false}
                        />
                        <figure className="my-8">
                            <img
                                src={QRCode}
                                alt="QR Code"
                                width={120}
                                height={120}
                                className="block mx-auto"
                            />
                        </figure>
                        <p
                            className="my-8 !mb-12 text-neutral-500 text-center text-xs" dangerouslySetInnerHTML={{__html:tips}}></p>
                        <Footer footermenus={footermenus}/>
                    </Main>
                </Body>
            </DefaultBackground>
        </>
    );
}

NextQuestionPage.query = gql`
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
     nextquestionPage {
          qrCode {
            sourceUrl
          }
          tips
        }   
    }
  }
}
`;

NextQuestionPage.variables = (seedQuery, ctx) => {

    return {
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};
