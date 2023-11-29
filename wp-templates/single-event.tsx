import {gql, useLazyQuery} from '@apollo/client';
import Main from '../components/layout/Main';
import React, {useEffect} from 'react';
import PageHero from '../components/PageHero';
import ArticleInfo from '../components/singleEventPage/ArticleInfo';
import classes from '../styles/article.module.scss';
import DefaultBackground from '../components/ui/DefaultBackground';
import CardGallery from '../components/CardGallery';
import {useTranslation} from 'next-i18next';
import {getEvents} from './supporting-scientific-meetings-and-conferences-page';
import Body from '../components/layout/Body';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';
import {serverDateStringToLocalDate} from '../utils/date';
import Section from 'components/layout/Section';
import SEO from '../components/SEO'
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import {websiteUrl} from "../utils/LinkPath";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SingleEvent(props) {
    dayjs.extend(timezone);
    const data = props.data;


    const [eventsQuery, {data: eventsData, loading: eventsLoading}] = useLazyQuery(SingleEvent.eventQuery);

    useEffect(() => {
        const category = data?.event?.translation?.eventTypes?.edges[0]?.node?.slug;
        if (category) {
            eventsQuery({
                variables: {
                    notIn: [props.__SEED_NODE__.databaseId, data?.event?.translation?.databaseId],//排除某条
                    locale: props.locale.toUpperCase(),
                    categoryName: category
                }
            })
        }
    }, [data]);

    const {t} = useTranslation('common');

    const title = data?.event?.translation?.title;
    const content = data?.event?.translation?.content;
    const contentDIV = <div className={classes.content} dangerouslySetInnerHTML={{__html: content}}/>;
    const imageUrl = data?.event?.translation?.featuredImage?.node?.sourceUrl;
    const category = data?.event?.translation?.eventTypes?.edges[0]?.node?.slug;
    const eventStart = serverDateStringToLocalDate(data?.event?.translation?.event?.eventStart);
    const eventEnd = serverDateStringToLocalDate(data?.event?.translation?.event?.eventEnd);
    const dates = [eventStart, eventEnd];


    const websiteTitle = data?.generalSettings?.title;
    const description = data?.generalSettings?.description;
    const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []

    let url =  (props.locale == 'en' ? websiteUrl + props.__SEED_NODE__.uri : websiteUrl + props.__SEED_NODE__.uri) || websiteUrl
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
                content={content}
                url={url}
            />

            <Header navMenus={navMenus}/>

            <DefaultBackground>
                <Body>
                    <Main className='event-wrap'>

                        <PageHero
                            title={title}
                            content={contentDIV}
                            contentClass={classes.content}
                            heroImageUrl={imageUrl}
                            isImageBottom={false}
                            articleInfo={<ArticleInfo locale={props.locale} title={title} dates={dates} tag={category} url={url}/>}
                        />
                        <Section>
                            {!eventsLoading && <CardGallery title={t('More Related Events')}
                                                            tag={category}
                                                            posts={getEvents(eventsData)}
                            />}
                        </Section>

                        <Footer footermenus={footermenus}/>
                    </Main>
                </Body>
            </DefaultBackground>
        </>
    );
}

SingleEvent.query = gql`
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
  event(id: $databaseId, idType: URI, asPreview: false) {
    translation(language: $locale) {
      eventTypes {
        edges {
          node {
            slug
          }
        }
      }
      databaseId
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      event {
        eventEnd
        eventStart
      }
    }
  }
}
`;
SingleEvent.variables = (seedQuery, ctx) => {
    return {
        locale: ctx.locale.toUpperCase(),
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};

SingleEvent.eventQuery = gql`
query getEventsData($locale: LanguageCodeFilterEnum!, $categoryName: [String],$notIn: [ID] = "7195") {
  events(
    where: {language: $locale, offsetPagination: {size: 5, offset: 0}, orderby: {field: DATE, order: DESC},notIn: $notIn, taxQuery: {taxArray: {field: SLUG, taxonomy: EVENTTYPE, terms: $categoryName}}}
  ) {
    nodes {
      id
      eventTypes {
        edges {
          node {
            slug
          }
        }
      }
      featuredImage {
        node {
          sourceUrl(size: MEDIUM_LARGE)
        }
      }
      title(format: RENDERED)
      slug
      event{
        eventStart
        eventEnd
      }
    }
  }
}
`;
