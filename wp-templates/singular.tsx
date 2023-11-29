import Header from '../components/Header';
import DefaultBackground from '../components/ui/DefaultBackground';
import Main from '../components/layout/Main';
import Footer from '../components/Footer';
import {gql} from '@apollo/client';
import PageHeroTemplate from '../components/PageHeroTemplate';
import React, {useEffect} from 'react';
import Body from '../components/layout/Body';
import classes from '../styles/article.module.scss';
import SEO from '../components/SEO'
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";

export default function Singular(props) {
  const data = props.data;


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
              <Footer footermenus={footermenus}/>
            </Main>
          </Body>
        </DefaultBackground>
      </>
  );
}

Singular.query = gql`
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
Singular.variables = (seedQuery, ctx) => {
  return {
    pageLocale: ctx.locale.toUpperCase(),
    databaseId: decodeURIComponent(seedQuery?.uri)
  };
};
