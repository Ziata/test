import Header from '../components/Header';
import PageHero from '../components/PageHero';
import {gql} from '@apollo/client';
import Main from '../components/layout/Main';
import Grid from '../components/layout/Grid';
import OrganizationCard, {OrganizationProps} from '../components/OrganizationCard';
import Footer from '../components/Footer';
import DefaultBackground from '../components/ui/DefaultBackground';
import Body from '../components/layout/Body';
import Section from '../components/layout/Section';
import SEO from '../components/SEO'
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import React from "react";
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";

export default function MeetingPartnersPage(props) {
    const data = props.data;

    const translation = data?.page?.translation;
    const title = translation?.title;
    const content = translation?.content;
    const heroImageUrl = translation?.featuredImage?.node?.sourceUrl;

    const websiteTitle = data?.generalSettings?.title;
    const description = data?.generalSettings?.description;
    const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []
    let imageUrl = heroImageUrl || metaImageUrl
    let url = websiteUrl + props.__SEED_NODE__.uri || websiteUrl


    const organizations: OrganizationProps[] = data?.organizations?.nodes?.map((item) => ({
        imgUrl: item?.translation?.featuredImage?.node?.sourceUrl,
        title: item?.translation?.title,
        link: item?.translation?.organization?.link,
        order: item?.translation?.order?.order,
        orderName: item?.translation?.lastName?.lastname
            ?? item?.translation?.title
    }))



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
                            heroImageUrl={heroImageUrl}
                            isImageBottom={false}/>
                        <Section className={'!mt-8'}>
                            <Grid rowCount={6}>
                                {organizations && organizations.map((item) => {
                                    if (!item.imgUrl) return null
                                    return (
                                        <OrganizationCard key={item.title ?? ''}
                                                          title={item.title}
                                                          link={item.link}
                                                          imageClass="!h-28"
                                                          imgUrl={item.imgUrl}/>
                                    )
                                })}
                            </Grid>
                        </Section>
                        <Footer footermenus={footermenus}/>
                    </Main>
                </Body>
            </DefaultBackground>
        </>
    );
}

MeetingPartnersPage.query = gql`
${BlogInfoFragment}
query GetPageData($databaseId: ID!, $pageLocale: LanguageCodeEnum!) {
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
    translation(language: $pageLocale) {
      title
      content
      featuredImage {
        node {
          sourceUrl
          
        }
        
      }
      
    }
    
  }
  organizations(
    first: 999
    where: {language: EN, categoryName: "meeting-partners", orderby: {field: TITLE, order: ASC}}
  ) {
    nodes {
      translation(language: $pageLocale) {
        title
        featuredImage {
          node {
            sourceUrl
            
          }
          
        }
        organization {
          link
          
        }
        lastName {
          lastname
          
        }
        order {
          order
          
        }
        
      }
      
    }
    
  }
}
`;
MeetingPartnersPage.variables = (seedQuery, ctx) => {

    return {
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};
