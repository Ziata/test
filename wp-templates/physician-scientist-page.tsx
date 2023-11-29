import Header from '../components/Header';
import DefaultBackground from '../components/ui/DefaultBackground';
import Main from '../components/layout/Main';
import Footer from '../components/Footer';
import {gql, useQuery} from '@apollo/client';
import PageHeroTemplate from '../components/PageHeroTemplate';
import React, {useEffect} from 'react';
import Body from '../components/layout/Body';
import classes from '../styles/article.module.scss';
import SEO from '../components/SEO'
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";
import FigureCard, {FigureCardProps} from "../components/FigureCard";
import {getLastName, orderNameSorter} from "../utils/name";
import {useTranslation} from "next-i18next";
import Grid from "../components/layout/Grid";

export const getFigureData = (data, selectedCategory?: string): FigureCardProps[] => data?.figures?.nodes?.map((item, key) => ({
    id: key.toString(),
    imgUrl: item?.translation?.featuredImage?.node?.sourceUrl,
    name: item?.translation?.title,
    titles: item?.translation?.principalInvestigatorsFigure?.titles?.map((t) => t.title)
        ?? item?.translation?.chenScholarsFigure?.titles?.map((t) => t.title)
        ?? item?.translation?.graduateFellowsFigure?.titles?.map((t) => t.title),
    link: item?.translation?.chenScholarsFigure?.link,
    target: '_blank',
    order: item?.translation?.order?.order,
    orderName: item?.translation?.lastName?.lastname
        ?? getLastName(item?.translation?.title)
})).sort(orderNameSorter);

export default function PhysicianScientistPage(props) {
    const data = props.data;
    const {t} = useTranslation('common');

    const title: string = data?.page?.translation?.title;
    const content: string = data?.page?.translation?.content ?? '';
    const contentDIV = <div className={classes.content} dangerouslySetInnerHTML={{__html: content}}/>;
    const link: string = data?.page?.translation?.featuredImage?.node?.sourceUrl;


    const websiteTitle = data?.generalSettings?.title;
    const description = data?.generalSettings?.description;
    const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []
    let imageUrl = link || metaImageUrl
    let url = websiteUrl + props.__SEED_NODE__.uri || websiteUrl


    let query = PhysicianScientistPage.queryChenScholars
    const userList = useQuery(query, {
        variables: {
            pageLocale: props.locale.toUpperCase(),
            categoryName: 'physician-scientist',
            year: '',
            databaseId: props.__SEED_NODE__.databaseId
        }
    });

    const aiUserList = useQuery(query, {
        variables: {
            pageLocale: props.locale.toUpperCase(),
            categoryName: 'ai-scholars',
            year: '',
            databaseId: props.__SEED_NODE__.databaseId
        }
    })


    const figures = getFigureData(userList.data, 'physician-scientist');
    const list = getFigureData(aiUserList.data);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!content) return
        let html = content
        evalScripts(html)
    }, [content])


    const evalScripts = (text) => {
        let script, scripts;
        scripts = [];
        let regexp = /<script[^>]*>([\s\S]*?)<\/script>/gi;
        while ((script = regexp.exec(text))) scripts.push(script[1]);
        scripts = scripts.join('\n');


        if (scripts) { // @ts-ignore
            (window?.execScript) ? window?.execScript(scripts) : window.setTimeout(scripts, 0);
        }
    }


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
                        <PageHeroTemplate
                            title={title}
                            content={contentDIV}
                            heroImageUrl={link}
                            isImageBottom={false}
                        />
                        <header
                            className={['mb-8 flex md:justify-between flex-col md:flex-row'].join(' ')}>
                            <h1 className="md:self-center"><span
                                className="text-3xl">{t('Physician Scientist')}</span>
                            </h1>
                        </header>
                        <section className="min-h-[26rem] mb-12">

                            <Grid>
                                {figures?.map((item, key) => (
                                    <FigureCard key={key}
                                                imgUrl={item.imgUrl}
                                                name={item.name}
                                                titles={item.titles}
                                                link={item.link}
                                                target={item.target}
                                    />
                                ))}
                            </Grid>
                        </section>

                        <>
                            {list?.length ? (
                                <>
                                    <header
                                        className={['mb-8 flex md:justify-between flex-col md:flex-row'].join(' ')}>
                                        <h1 className="md:self-center"><span
                                            className="text-3xl">{t('AI Scholars')}</span>
                                        </h1>
                                    </header>
                                    <section className="min-h-[26rem] mb-12">

                                        <Grid>
                                            {list?.map((item, key) => (
                                                <FigureCard key={key}
                                                            imgUrl={item.imgUrl}
                                                            name={item.name}
                                                            titles={item.titles}
                                                            link={item.link}
                                                            target={item.target}
                                                />
                                            ))}
                                        </Grid>
                                    </section>
                                </>
                            ) : null}
                        </>

                        <Footer footermenus={footermenus}/>
                    </Main>
                </Body>
            </DefaultBackground>
        </>
    );
}

PhysicianScientistPage.query = gql`
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
    }
  }
}
`

PhysicianScientistPage.queryChenScholars = gql`
query getChenScholarsData(
  $pageLocale: LanguageCodeEnum!, 
  $categoryName: String
  $databaseId: ID!
) {
  page(id: $databaseId, idType: DATABASE_ID) {
    translation(language: $pageLocale){
      title
    }
  }
  figures(
    first: 999
    where: {
      language: EN, 
      categoryName: $categoryName
    }
  ) {
    nodes {
      translation(language: $pageLocale) {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        chenScholarsFigure{
          titles {
            title
          }
          link
        }
        order {
          order
        }
        lastName{
          lastname
        }
      }
    }
  }
}
`;

PhysicianScientistPage.variables = (seedQuery, ctx) => {
    return {
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};
