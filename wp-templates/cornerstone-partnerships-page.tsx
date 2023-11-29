import {gql} from '@apollo/client';
import Header from '../components/Header';
import React from 'react';
import Main from '../components/layout/Main';
import Footer from '../components/Footer';
import Partnership, {PartnershipProps} from '../components/cornerstonePartnershipsPage/Partnership';
import PageHero from '../components/PageHero';
import DefaultBackground from '../components/ui/DefaultBackground';
import Body from '../components/layout/Body';
import Section from '../components/layout/Section';
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import SEO from '../components/SEO'
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";

const getPartnerships: (data: any) => PartnershipProps[]
    = (data) => data?.page?.translation?.cornerstonePartnershipsPage?.partnership?.map((item) => ({
    title: item?.title,
    overlappingImages: item?.overlappingImages?.map((link) => link.sourceUrl),
    content: item?.content,
    links: item?.links
}));


export default function CornerstonePartnershipsPage(props) {

    const data = props.data;


    const title: string = data?.page?.translation?.title;
    const content: string = data?.page?.translation?.content;
    const link: string = data?.page?.translation?.featuredImage?.node?.sourceUrl;

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
                <Body className="!pb-0">
                    <Main>
                        <PageHero
                            title={title}
                            content={content}
                            heroImageUrl={link}
                        />
                        <Section className={'mt-8 md:!mt-12 '}>
                            <div>
                                {getPartnerships(data).map((item, index) => (
                                    <Partnership key={index} {...item} direction={index % 2 === 0 ? 'right' : 'left'}/>
                                ))}
                            </div>
                        </Section>
                        <Footer footermenus={footermenus}/>
                    </Main>
                </Body>
            </DefaultBackground>
        </>
    );
}

CornerstonePartnershipsPage.query = gql`
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
      cornerstonePartnershipsPage{
        partnership{
          title
          overlappingImages{
            sourceUrl(size:MEDIUM_LARGE)
          }
          content
          links{
            link
            linkTitle
          }
        }
      }
    }
  }
}
`;

CornerstonePartnershipsPage.variables = (seedQuery, ctx) => {
    return {
        locale: ctx.locale.toUpperCase(),
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};
