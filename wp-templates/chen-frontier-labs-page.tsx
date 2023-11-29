import Header from '../components/Header';
import Image from 'next/future/image';
import heroIcon from '../public/images/chenFrontierLabsPage/hero_icon.png';
import Main from '../components/layout/Main';
import VisionMission from '../components/chenFrontierLabsPage/VisionMission';
import AUniqueApproach from '../components/chenFrontierLabsPage/AUniqueApproach';
import Investigator from '../components/chenFrontierLabsPage/Investigator';
import Footer from '../components/Footer';
import {gql} from '@apollo/client';
import DefaultBackground from '../components/ui/DefaultBackground';
import Section from '../components/layout/Section';
import Body from '../components/layout/Body';
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import SEO from '../components/SEO'
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";
import React from "react";

export default function ChenFrontierLabsPage(props) {
    const data = props.data;



    const title: string = data?.page?.translation?.title;
    const content = data?.page?.translation?.content;
    const heroImageUrl = data?.page?.translation?.featuredImage?.node?.sourceUrl;

    let form = data?.page?.translation?.frontierFormPage?.form || ''
    let visionAndMission = data?.page?.translation?.chenFrontierLabs?.visionAndMission
    let aUniqueApproach = data?.page?.translation?.chenFrontierLabs?.aUniqueApproach
    let bottomIntroduction = data?.page?.translation?.chenFrontierLabs?.bottomIntroduction

    const websiteTitle = data?.generalSettings?.title;
    const description = data?.generalSettings?.description;
    const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []
    let imageUrl = heroImageUrl || metaImageUrl
    let url = websiteUrl + props.__SEED_NODE__.uri || websiteUrl


    return (
        <>
            <SEO
                title={`${title} - ${websiteTitle}`}
                description={description}
                imageUrl={imageUrl}
                url={url}
            />

            <Header transparent={true} navMenus={navMenus}/>
            <div className="relative w-full h-[32rem]">
                <Image
                    src={heroImageUrl ?? ''}
                    alt="Frontier labs background"
                    fill
                    className="object-cover brightness-75"
                />
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-[30rem] w-2/3 h-96">
                    <Image
                        src={heroIcon}
                        alt="Frontier labs icon"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
            <DefaultBackground>
                <Body>
                    <Main>
                        <Section className="!mt-0 !mb-16">
                            <VisionMission content={content} visionAndMission={visionAndMission}/>
                        </Section>
                        <Section className="!mt-0">
                            <AUniqueApproach aUniqueApproach={aUniqueApproach}/>
                        </Section>
                    </Main>
                    <Section>
                        {/*<Investigator {...{
                            title,
                            bottomIntroduction,
                            ...props
                        }}/>*/}
                    </Section>
                    <Main>
                        <Footer footermenus={footermenus}/>
                    </Main>

                    <div className='hidden' id='frontierForm' dangerouslySetInnerHTML={{__html: form}}></div>
                </Body>
            </DefaultBackground>
        </>
    );
}

ChenFrontierLabsPage.query = gql`
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
      frontierFormPage {
        form
      }
      chenFrontierLabs {
        visionAndMission {
          mission {
            content
            image {
              sourceUrl
            }
            title
          }
          vision {
            content
            image {
              sourceUrl
            }
            title
          }
          buttonText
        }
      aUniqueApproach {
          title
          content
          list {
            title
            content
          }
        }
      bottomIntroduction
      }
    }
  }
}
`;
ChenFrontierLabsPage.variables = (seedQuery, ctx) => {

    return {
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};
