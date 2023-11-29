import {gql, useLazyQuery} from '@apollo/client';
import Header from '../components/Header';
import Main from '../components/layout/Main';
import React, {useEffect} from 'react';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import ArticleInfo from '../components/singleEventPage/ArticleInfo';
import classes from '../styles/article.module.scss';
import DefaultBackground from '../components/ui/DefaultBackground';
import CardGallery from '../components/CardGallery';
import {useTranslation} from 'next-i18next';
import {redirectCategory} from '../utils/category';
import {getPosts} from '../components/Newsroom/NewsGrid';
import Body from '../components/layout/Body';
import Section from '../components/layout/Section';
import SEO from '../components/SEO'
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import {websiteUrl} from "../utils/LinkPath";

export default function SingleNews(props) {
    const {t} = useTranslation('common');

    const data = props.data;


    const reportLinks = data?.post?.translation?.meetingReport?.reportLinks || []

    useEffect(() => {
        if (reportLinks.length > 0) {
            const reportLink = reportLinks[0].link
            window.location.href = reportLink
            return
        }
    }, [])

    const [newsQuery, {data: newsData, loading: newsLoading}] = useLazyQuery(SingleNews.newsQuery);
    useEffect(() => {
        const category = data?.post?.translation?.categories?.edges[0]?.node?.slug;
        if (category) {
            newsQuery({
                variables: {
                    notIn: [props.__SEED_NODE__.databaseId, data?.post?.translation?.databaseId],//排除某条
                    postLocale: props.locale.toUpperCase(),
                    categoryName: category
                }
            })
        }
    }, [data]);

    const title = data?.post?.translation?.title || '';
    const content = data?.post?.translation?.content || '';
    const contentDIV = <div className={classes.content} dangerouslySetInnerHTML={{__html: content}}/>;
    const imageUrl = data?.post?.translation?.featuredImage?.node?.sourceUrl || '';
    const category = data?.post?.translation?.categories?.edges[0]?.node?.slug || '';
    const date = new Date(data?.post?.translation?.date);

    const websiteTitle = data?.generalSettings?.title;
    const description = data?.generalSettings?.description;
    const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []

    let url = (props.locale == 'en' ? websiteUrl + props.__SEED_NODE__.uri : websiteUrl + "/zh" + props.__SEED_NODE__.uri) || websiteUrl

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

    if (reportLinks.length > 0) {
        return <SEO
            title={`${title} - ${websiteTitle}`}
            description={description}
            content={content}
            imageUrl={imageUrl}
            url={url}
        />
    }

    return (
        <>
            <SEO
                title={`${title} - ${websiteTitle}`}
                description={description}
                content={content}
                imageUrl={imageUrl}
                url={url}
            />
            <Header navMenus={navMenus}/>

            <DefaultBackground>
                <Body>

                    <Main>
                        <PageHero
                            title={title}
                            content={contentDIV}
                            contentClass={classes.content}
                            heroImageUrl={imageUrl}
                            isImageBottom={false}
                            articleInfo={<ArticleInfo title={title} dates={date} url={url} tag={category}/>}
                        />
                        <Section>
                            {!newsLoading && (
                                <CardGallery
                                    title={t('More Related News')}
                                    tag={redirectCategory(category)}
                                    posts={getPosts(newsData)}/>
                            )}
                        </Section>
                        <Footer footermenus={footermenus}/>

                    </Main>

                </Body>
            </DefaultBackground>
        </>
    );
}

SingleNews.query = gql`
${BlogInfoFragment}
query getSingleEventData(
    $databaseId: ID!, 
    $locale: LanguageCodeEnum!,
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
  post(id: $databaseId, idType: URI, asPreview: false) {
    translation(language: $locale) {
      categories {
        edges {
          node {
            slug
          }
        }
      }
      databaseId
      date
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      meetingReport {
        reportLinks {
          link
        }
      }
    }
  }
}
`;
SingleNews.variables = (seedQuery, ctx) => {
    return {
        locale: ctx.locale.toUpperCase(),
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};

SingleNews.newsQuery = gql`
query getData($postLocale: LanguageCodeFilterEnum!, $categoryName: String, $notIn: [ID] = "") {
  posts(
    where: {language: $postLocale, offsetPagination: {size: 5, offset: 0}, orderby: [{field: DATE, order: DESC}], categoryName: $categoryName, notIn: $notIn}
  ) {
    pageInfo {
      offsetPagination {
        total
      }
    }
    nodes {
      id
      slug
      featuredImage {
        node {
          sourceUrl(size: MEDIUM_LARGE)
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
      vsComposerExcerptRendered
      meetingReport {
        reportLinks {
          link
        }
      }
    }
  }
}
`;
