// 会议支持页面
import {gql, useQuery} from '@apollo/client';
import Header from '../components/Header';
import React, {FC, useState} from 'react';
import Main from '../components/layout/Main';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import ChevronRightLink from '../components/ui/ChevronRightLink';
import {useTranslation} from 'next-i18next';
import FilterBar, {viewType} from '../components/supportingScientificMeetingsAndConferencesPage/FilterBar';
import {PostCardProp} from '../components/PostCard';
import PhotoView, {ViewProps} from '../components/supportingScientificMeetingsAndConferencesPage/PhotoView';
import DefaultBackground from '../components/ui/DefaultBackground';
import ListView from '../components/supportingScientificMeetingsAndConferencesPage/ListView';
import CalendarView from '../components/supportingScientificMeetingsAndConferencesPage/CalendarView';
import Body from '../components/layout/Body';
import {useRouter} from 'next/router';
import {Category, toLocaleCategory} from '../utils/category';
import {PlainMenuProp} from '../components/PlainMenu';
import Loading from '../components/ui/Loading';
import {serverDateStringToLocalDate} from '../utils/date';
import dayjs from 'dayjs';
import Section from '../components/layout/Section';
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import SEO from '../components/SEO'
import LinkPath, {metaImageUrl, websiteUrl} from "../utils/LinkPath";
import getSearchParams from "../utils/getSearchParams";

interface queryVariablesProps {
    eventType: string[];
    organizer?: string;
    location?: string;
    researchField?: string;
    startDate: string;
    endDate: string;
}

// 处理查询参数
const generateQuery = ({eventType, organizer, location, researchField, startDate, endDate}, router) => {
    let query;
    let queryVariables: queryVariablesProps = {} as queryVariablesProps;

    let parameters = '';
    let metaQueryBody = '';
    switch (eventType) {
        case 'tcci-event':
            queryVariables.eventType = [
                toLocaleCategory('tcci-event' as Category, router)
            ];
            break;
        case 'tcci-sponsored-event':
            queryVariables.eventType = [
                toLocaleCategory('tcci-sponsored-event' as Category, router)
            ];
            break;
        default:
            queryVariables.eventType = [
                toLocaleCategory('tcci-event' as Category, router),
                toLocaleCategory('tcci-sponsored-event' as Category, router)
            ];
    }

    switch (organizer) {
        case 'All':
            break;
        default:
            queryVariables.organizer = organizer;
            parameters += '$organizer: String,';
            metaQueryBody += '{compare:EQUAL_TO, key:"organizer", value: $organizer},';
    }
    switch (location) {
        case 'All':
            break;
        default:
            queryVariables.location = location;
            parameters += '$location: String,';
            metaQueryBody += '{compare:EQUAL_TO, key:"country", value: $location},';
    }
    switch (researchField) {
        case 'All':
            break;
        default:
            queryVariables.researchField = researchField;
            parameters += '$researchField: String,';
            metaQueryBody += '{compare:EQUAL_TO, key:"research_field", value: $researchField},';
    }

    queryVariables.startDate = startDate;
    queryVariables.endDate = endDate;


    query = SupportingScientificMeetingsAndConferencesPage.eventQuery(parameters, metaQueryBody);

    return {
        query,
        queryVariables
    }
}

export const getEvents: (data: any) => PostCardProp[] = (data) => data?.events?.nodes?.map((item) => {
    return {
        id: item?.id,
        image: item?.featuredImage?.node?.sourceUrl,
        category: item?.eventTypes?.edges[0]?.node?.slug,
        excerpt: item?.vsComposerExcerptRendered,
        title: item?.title,
        date: [
            serverDateStringToLocalDate(item?.event?.eventStart),
            serverDateStringToLocalDate(item?.event?.eventEnd)
        ],
        link: `${LinkPath.events}${item?.slug}`
    }
});

const getMenu = (acfChoice, t): PlainMenuProp[] => {
    const menu: PlainMenuProp[] = acfChoice?.map((item) => ({
        id: item,
        title: item
    })) ?? [];

    const allOption: PlainMenuProp = {
        id: 'All',
        title: t('All')
    };
    menu.unshift(allOption);
    return menu;
}

const startDateString: string = '2016-01-01';
const endDateString: string = '2099-01-01';


export default function SupportingScientificMeetingsAndConferencesPage(props) {
    const router = useRouter();
    let params = getSearchParams()


    let eventType = params.event ? (params.event) : 'All'
    let organizerType = params.organizer ? (params.organizer) : 'All'
    let locationType = params.location ? (params.location) : 'All'
    let researchFieldType = params.researchField ? (params.researchField) : 'All'

    const [state, setState] = useState({
        // @ts-ignore
        eventType,
        // @ts-ignore
        organizerType,
        // @ts-ignore
        locationType,
        // @ts-ignore
        researchFieldType,

        // @ts-ignore
        startDate: params.startDate ? dayjs(params.startDate).toDate() : dayjs(startDateString).toDate(),
        // @ts-ignore
        endDate: params.endDate ? dayjs(params.endDate).toDate() : dayjs(endDateString).toDate(),

        viewType: params.view ? params.view as viewType : 'Photo View',
        page: params.page ? parseInt(params.page as string) : 1,
        PAGE_TYPE: 'SupportingScientificMeetingsAndConferences'
    });

    const {
        data: pageData
    } = props;

    const {t} = useTranslation('common');

    const {query, queryVariables} = generateQuery({
        eventType: state.eventType,
        organizer: state.organizerType,
        location: state.locationType,
        researchField: state.researchFieldType,
        // startDate: localeDateTpServerDateString(state.startDate),
        // endDate: localeDateTpServerDateString(state.endDate),
        // @ts-ignore
        startDate: dayjs(state.startDate).format('YYYY-MM-DD') + ' 00:00:00',
        // @ts-ignore
        endDate: dayjs(state.endDate).format('YYYY-MM-DD') + ' 23:59:59',
    }, router);

    const title: string = pageData?.page?.translation?.title || '';
    const content: string = pageData?.page?.translation?.content;
    const link: string = pageData?.page?.translation?.featuredImage?.node?.sourceUrl;
    const organizerMenu = getMenu(pageData?.acfEventOrganizerChoices, t);
    const locationMenu = getMenu(pageData?.acfEventLocationChoices, t);
    const researchFieldMenu = getMenu(pageData?.acfEventResearchFieldChoices, t);
    let pageTitle = pageData?.page?.translation?.supportingScientificMeetingsAndConferences?.title
    let links = pageData?.page?.translation?.supportingScientificMeetingsAndConferences?.links || []


    const websiteTitle = pageData?.generalSettings?.title;
    const description = pageData?.generalSettings?.description;
    const navMenus = pageData?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = pageData?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []
    let imageUrl = link || metaImageUrl
    let url = websiteUrl + props.__SEED_NODE__.uri || websiteUrl


    const {data, loading} = useQuery(query, {
        variables: {
            eventLocale: props.locale.toUpperCase(),
            offset: (state.page - 1) * 9,
            ...queryVariables,
        },
    });
    const events: PostCardProp[] = getEvents(data);
    const total: number = data?.events?.pageInfo?.offsetPagination?.total;

    let View: FC<ViewProps>;
    switch (state.viewType) {
        case 'Calendar View':
            View = CalendarView;
            break;
        case 'List View':
            View = ListView
            break;
        default:
            View = PhotoView;
    }


    const filterChange = (filterProps) => {

        if (loading) {
            return
        }

        let startDate = filterProps.startDate;
        let endDate = filterProps.endDate;
        if (filterProps.viewType === 'Calendar View' && filterProps.viewType !== state.viewType) {
            startDate = dayjs(new Date()).startOf('month').toDate();
            endDate = dayjs(new Date()).endOf('month').toDate();
        }
        if (filterProps.viewType === 'List View' && filterProps.viewType !== state.viewType) {
            startDate = dayjs(new Date()).startOf('year').toDate();
            endDate = dayjs(new Date()).endOf('year').toDate();
        }

        // 修复切换的BUG
        if (filterProps.viewType === 'Photo View' && filterProps.viewType !== state.viewType) {
            startDate = startDateString
            endDate = endDateString
        }
        let data = {...state, ...filterProps, startDate, endDate, page: 1}


        let linkData = {
            // @ts-ignore
            event: data.eventType == 'All' ? "" : encodeURIComponent(data.eventType),
            organizer: data.organizerType == 'All' ? "" : encodeURIComponent(data.organizerType),
            location: data.locationType == 'All' ? "" : encodeURIComponent(data.locationType),
            researchField: data.researchFieldType == 'All' ? "" : encodeURIComponent(data.researchFieldType),
            startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
            view: data.viewType,
            page: data.page,
        }


        let linkStr = window.location.pathname + `?event=${linkData.event}&organizer=${linkData.organizer}&location=${linkData.location}&researchField=${linkData.researchField}&startDate=${linkData.startDate}&endDate=${linkData.endDate}&view=${linkData.view}&page=1`


        setTimeout(() => {
            window.location.href = linkStr
        }, 500)

        // setState({...state, ...filterProps, startDate, endDate, page: 1});
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
                    <Main className='supporting-scientific-meetings-and-conferences'>
                        <PageHero
                            title={title}
                            content={content}
                            heroImageUrl={link}
                            isImageBottom={false}
                        />
                        {
                            links.length ? (
                                <section className="my-8 space-x-12 text-lg">
                                    <ChevronRightLink className='!mt-0 !text-base' link={links[0].url}
                                                      target="_blank"
                                                      content={links[0].title}/>
                                    <br className='sm:hidden'/>
                                    <ChevronRightLink className='!mt-0 !text-base !ml-0 sm:!ml-12'
                                                      link={links[1].url}
                                                      content={links[1].title}/>
                                </section>
                            ) : null
                        }

                        <Section className='!mt-16'>
                            {
                                loading ? '' : (
                                    <FilterBar className="mb-4"
                                               pageTitle={pageTitle}
                                               eventType={state.eventType}
                                               organizerType={state.organizerType}
                                               locationType={state.locationType}
                                               researchFieldType={state.researchFieldType}
                                               startDate={state.startDate}
                                               endDate={state.endDate}
                                               viewType={state.viewType}
                                               organizerMenu={organizerMenu}
                                               locationMenu={locationMenu}
                                               researchFieldMenu={researchFieldMenu}
                                               onChange={(filterProps) => {
                                                   filterChange(filterProps)
                                               }}/>
                                )
                            }

                            {loading ? <Loading/> :
                                <>

                                    {state.viewType === 'Calendar View' &&
                                        (
                                            <CalendarView events={events || []}
                                                          date={state.startDate}
                                                          onChange={(startDate, endDate) => {
                                                              setState({
                                                                  ...state,
                                                                  startDate: startDate,
                                                                  endDate: endDate,
                                                              })
                                                          }}
                                            />
                                        )
                                    }
                                    {state.viewType === 'List View' &&
                                        (
                                            <ListView events={events || []}/>
                                        )
                                    }
                                    {state.viewType === 'Photo View' &&
                                        (
                                            <PhotoView
                                                total={total}
                                                state={state}
                                                page={state.page}
                                                events={events || []}
                                                onChange={(page) => {
                                                    setState({...state, page})
                                                }}
                                                className="min-h-[26rem]"/>
                                        )
                                    }
                                </>
                            }
                        </Section>
                        <Footer footermenus={footermenus}/>
                    </Main>
                </Body>
            </DefaultBackground>
        </>
    );
}

SupportingScientificMeetingsAndConferencesPage.query = gql`
${BlogInfoFragment}
query GetPageData(
  $databaseId: ID!, 
  $menuLocale: String,
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
  acfEventLocationChoices(language: $menuLocale)
  acfEventOrganizerChoices(language: $menuLocale)
  acfEventResearchFieldChoices(language: $menuLocale)
  page(id: $databaseId, idType: URI) {
    translation(language: $pageLocale) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      supportingScientificMeetingsAndConferences {
        title
        links {
          title
          url
        }
      }
    }
  }
}
`;
SupportingScientificMeetingsAndConferencesPage.variables = (seedQuery, ctx) => {
    return {
        pageLocale: ctx.locale.toUpperCase(),
        menuLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};

SupportingScientificMeetingsAndConferencesPage.eventQuery = (parameters, metaQueryBody) => {
    const tmp = `
query GetEventsData(
  $eventType: [String],
  $eventLocale: LanguageCodeFilterEnum!,
  $offset: Int,
  $startDate: String, 
  $endDate: String,
  ${parameters}
) {
  events(
    where: {
      offsetPagination: {
        size: 9,
        offset: $offset
      },
      language: $eventLocale, 
      orderby: {field: DATE, order: DESC}, 
      taxQuery: {
        relation: AND
        taxArray:[
        {
          field: SLUG
          operator: IN
          taxonomy: EVENTTYPE
          terms: $eventType
        },
      ]
      }
      metaQuery: {
        relation: AND, 
        metaArray: [
          {compare:GREATER_THAN_OR_EQUAL_TO, key:"_event_start", value: $startDate},
          {compare:LESS_THAN_OR_EQUAL_TO, key:"_event_start", value: $endDate},
          ${metaQueryBody}
        ]}}
  ) {
    pageInfo {
      offsetPagination {
        total
      }
    }
    nodes {
      slug
      id
      featuredImage {
        node {
          sourceUrl(size: MEDIUM_LARGE)
        }
      }
      eventTypes {
        edges {
          node {
            slug
          }
        }
      }
      vsComposerExcerptRendered
      event {
        eventStart
        eventEnd
        organizer
      }
      title
    }
  }
}
`;
    return gql(tmp);
}
