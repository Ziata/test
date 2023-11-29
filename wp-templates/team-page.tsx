import Header from '../components/Header';
import DefaultBackground from '../components/ui/DefaultBackground';
import Footer from '../components/Footer';
import Main from '../components/layout/Main';
import {useTranslation} from 'next-i18next';
import Gird from '../components/layout/Grid';
import {gql} from '@apollo/client';
import FigureCard, {FigureCardProps} from '../components/FigureCard';
import {getLastName, orderNameSorter} from '../utils/name';
import Body from '../components/layout/Body';
import SEO from '../components/SEO'
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import React from "react";
import LinkPath, {metaImageUrl, websiteUrl} from "../utils/LinkPath";

export default function TeamPage(props) {

    const data = props.data;

    const figures: FigureCardProps[] = data?.figures?.nodes?.map((item, key) => ({
        id: key.toString(),
        imgUrl: item?.translation?.featuredImage?.node?.sourceUrl,
        name: item?.translation?.title,
        titles: item?.translation?.ourTeamFigure?.titles?.map((t) => t.title),
        link: `${LinkPath.figures}${item?.slug}`,
        target: '_self',
        order: item?.translation?.order?.order,
        orderName: item?.translation?.lastName?.lastname
            ?? getLastName(item?.translation?.title)
    })).sort(orderNameSorter);
    const top2Figures: FigureCardProps[] = figures?.slice(0, 2);
    const restFigures: FigureCardProps[] = figures?.slice(2);
    const title: string = data?.page?.translation?.title;


    const websiteTitle = data?.generalSettings?.title;
    const description = data?.generalSettings?.description;
    const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []
    let imageUrl = metaImageUrl
    let url = websiteUrl + props.__SEED_NODE__.uri || websiteUrl


    const {t} = useTranslation('common');


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
                        <header className="mb-8">
                            <h1 className="self-center"><span className="text-3xl">{t('Our Team')}</span></h1>
                        </header>
                        <section className="min-h-[26rem] mb-12">

                            <div className="space-y-8">
                                <Gird rowCount={4}>
                                    {top2Figures?.map((item, key) => (
                                        <FigureCard key={key}
                                                    imgUrl={item.imgUrl}
                                                    name={item.name}
                                                    titles={item.titles}
                                                    link={item.link}
                                                    target={item.target}
                                                    imageClass={'h-[30rem] sm:h-64 '}
                                        />
                                    ))}
                                </Gird>
                                <Gird rowCount={4}>
                                    {restFigures?.map((item, key) => (
                                        <FigureCard key={key}
                                                    imgUrl={item.imgUrl}
                                                    name={item.name}
                                                    titles={item.titles}
                                                    link={item.link}
                                                    target={item.target}
                                                    imageClass={'h-[30rem] sm:h-64 '}
                                        />
                                    ))}
                                </Gird>
                            </div>

                        </section>
                        <Footer footermenus={footermenus}/>
                    </Main>
                </Body>
            </DefaultBackground>
        </>
    );
}

TeamPage.query = gql`
${BlogInfoFragment}
query getOurTeamData(
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
    }
  }
  
  figures(first: 999, where: {language: EN, categoryName: "our-team"}) {
    nodes {
      slug
      translation(language: $pageLocale) {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        ourTeamFigure {
          titles {
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
TeamPage.variables = (seedQuery, ctx) => {
    return {
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};
