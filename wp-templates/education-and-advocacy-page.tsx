import {gql} from '@apollo/client';
import Header from '../components/Header';
import React from 'react';
import Main from '../components/layout/Main';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import DefaultBackground from '../components/ui/DefaultBackground';
import Section from '../components/layout/Section';
import ContentCard, {ContentCardProps} from '../components/educationAndAdvocacyPage/ContentCard';
import Grid from '../components/layout/Grid';
import FigureCard from '../components/FigureCard';
import {getFigureData} from './supporting-scientists-page';
import Body from '../components/layout/Body';
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import SEO from '../components/SEO'
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";

const getContentCardData = (data): ContentCardProps[] => data?.page?.translation?.educationAndAdvocacyPage?.contentCard?.map((item, index) => ({
  id: item?.id,
  title: item?.title,
  description: item?.description,
  imageUrl: item?.image?.sourceUrl,
  links: item?.links,
  backgroundColor: ['bg-tcci-light-green', 'bg-tcci-light-red !mt-8', 'bg-tcci-light-yellow !mt-8'][index % 3]
}));

export default function EducationAndAdvocacyPage(props) {

  const data = props.data;
  const title: string = data?.page?.translation?.title;
  const content: string = data?.page?.translation?.content;
  const link: string = data?.page?.translation?.featuredImage?.node?.sourceUrl;
  const workshop = data?.page?.translation?.educationAndAdvocacyPage?.workshop;
  const contentCardData: ContentCardProps[] = getContentCardData(data);
  const figures = getFigureData(data, 'caltech-science');


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
      <DefaultBackground  className={'bg-py-500'}>
        <Body>
          <Main>
            <PageHero
              title={title}
              content={content}
              heroImageUrl={link}
              isImageBottom={false}
            />
          </Main>
          <Section className="space-y-12  !mt-8 !mb-0">
            {contentCardData?.map((item,index) => (
              <section key={index} className={[item.backgroundColor].join(' ')}>
                <Main>
                  <ContentCard className="h-full lg:min-h-[22rem] relative" {...item}/>
                </Main>
              </section>
            ))}
          </Section>
          <Main>
            <Section className="space-y-8 !mt-16">
              <p className="text-3xl" dangerouslySetInnerHTML={{__html:workshop?.title}}></p>
              <p
                className="text-neutral-500" dangerouslySetInnerHTML={{__html:workshop?.content}}></p>
              <Grid rowCount={4}>
                {figures?.map((item, key) => (
                  <FigureCard key={key}
                              imgUrl={item.imgUrl}
                              name={item.name}
                              titles={item.titles}
                              link={item.link}
                              target={item.target}
                  />))}
              </Grid>
            </Section>
            <Footer footermenus={footermenus}/>
          </Main>
        </Body>
      </DefaultBackground>
    </>
  );
}

EducationAndAdvocacyPage.query = gql`
${BlogInfoFragment}
query GetPageData(
  $databaseId: ID!
  $pageLocale: LanguageCodeEnum!
  $categoryName: String
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
      educationAndAdvocacyPage{
        contentCard{
          title
          description
          links {
            link
            linkDescription
            linkText
          }
          image{
            sourceUrl
          }
        }
        workshop {
          title
          content
        }
      }
    }
  }
  figures(first: 999, where: {language: EN, categoryName: $categoryName}) {
    nodes {
      slug
      translation(language: $pageLocale) {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        graduateFellowsFigure {
          titles{
            title
          }
        }
        order {
          order
        }
        lastName {
          lastname
        }
      }
    }
  }
}
`;

EducationAndAdvocacyPage.variables = (seedQuery, ctx) => {
  return {
    pageLocale: ctx.locale.toUpperCase(),
    databaseId: decodeURIComponent(seedQuery?.uri),
    categoryName: 'caltech-science'
  };
};
