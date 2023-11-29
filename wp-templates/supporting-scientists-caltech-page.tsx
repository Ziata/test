// 支持的科学家
import Header from '../components/Header';
import Main from '../components/layout/Main';
import Footer from '../components/Footer';
import {useTranslation} from 'next-i18next';
import FigureCard, {FigureCardProps} from '../components/FigureCard';
import Grid from '../components/layout/Grid';
import {gql, useQuery} from '@apollo/client';
import React, {useState} from 'react';
import Loading from '../components/ui/Loading';
import {useRouter} from 'next/router';
import {PlainMenuProp} from '../components/PlainMenu';
import ListBox from '../components/ui/ListBox';
import {getLastName, orderNameSorter} from '../utils/name';
import DefaultBackground from '../components/ui/DefaultBackground';
import Body from '../components/layout/Body';
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import SEO from '../components/SEO'
import LinkPath, {metaImageUrl, websiteUrl} from "../utils/LinkPath";
import getSearchParams from "../utils/getSearchParams";
import ListBoxPlain from "../components/ui/ListBoxPlain";

const isSelectedCategory: (name: string, current: string) => boolean = (name, current) => {
    return name === current;
}

const isSelectedCategoryLink: (name: any, current: string) => boolean = (names, current) => {
    return names.includes(current)
}

const getMenu: (t) => PlainMenuProp[] = (t) => {
    const latestYear = new Date().getFullYear() + 1;
    // const latestYear = new Date().getFullYear();
    const pioneerYear: number = 2017;
    let arr = Array.from(Array(latestYear - pioneerYear)).map((item, i) => {
        const year1: number = latestYear - i - 1;
        const year2: number = latestYear - i;
        return {
            id: `${year1}-${year2}`,
            // title: `${t('Graduate Fellows')} ${year1} - ${year2} (${t('Caltech')})`,
            title: `${year1} - ${year2}`,
        };
    });

    return arr
}

export const getFigureData = (data, selectedCategory: string): FigureCardProps[] => data?.figures?.nodes?.map((item, key) => ({
    id: key.toString(),
    imgUrl: item?.translation?.featuredImage?.node?.sourceUrl,
    name: item?.translation?.title,
    titles: item?.translation?.principalInvestigatorsFigure?.titles?.map((t) => t.title)
        ?? item?.translation?.chenScholarsFigure?.titles?.map((t) => t.title)
        ?? item?.translation?.graduateFellowsFigure?.titles?.map((t) => t.title),
    link: isSelectedCategoryLink(['chen-scholars', 'physician-scientist', 'chen-scholars-zh', 'physician-scientist-zh'], selectedCategory)
        ? item?.translation?.chenScholarsFigure?.link
        : `${LinkPath.figures}${item?.slug}`,
    target: isSelectedCategoryLink(['chen-scholars', 'physician-scientist', 'chen-scholars-zh', 'physician-scientist-zh'], selectedCategory) ? '_blank' : '_self',
    order: item?.translation?.order?.order,
    orderName: item?.translation?.lastName?.lastname
        ?? getLastName(item?.translation?.title)
})).sort(orderNameSorter);

export default function SupportingScientistsPage(props) {
    const propsData = props.data;

    const title: string = propsData?.page?.translation?.title;
    const heroImageUrl = propsData?.page?.translation?.featuredImage?.node?.sourceUrl;

    const websiteTitle = propsData?.generalSettings?.title;
    const description = propsData?.generalSettings?.description;
    const navMenus = propsData?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = propsData?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []
    let imageUrl = heroImageUrl || metaImageUrl
    let url = websiteUrl + props.__SEED_NODE__.uri || websiteUrl

    const router = useRouter();
    let params = getSearchParams()


    let type: string = params.type as string ?? 'principal-investigators-caltech';
    const [selectedCategory, setSelectedCategory] = useState(type);
    const [selectedId, setSelectedId] = useState(type);

    let defaultYear = '2023-2024';
    let year: string = params.year && (params.year as string).match(/\d{4}-\d{4}/)
        ? params.year as string
        : defaultYear;
    const [selectedYear, setSelectedYear] = useState(year);

    let query = SupportingScientistsPage.queryPrincipalInvestigators;
    if (isSelectedCategory('chen-scholars', selectedCategory)) {
        query = SupportingScientistsPage.queryChenScholars;
    }
    if (isSelectedCategory('graduate-fellows', selectedCategory)) {
        query = SupportingScientistsPage.queryGraduateFellows;
    }
    if (isSelectedCategory('physician-scientist', selectedCategory)) {
        query = SupportingScientistsPage.queryChenScholars;
    }
    const {data, loading} = useQuery(query, {
        variables: {
            pageLocale: props.locale.toUpperCase(),
            categoryName: selectedCategory,
            year: year,
            databaseId: props.__SEED_NODE__.databaseId
        }
    });


    /** figures排序优先级：order > 默认人名顺序 */
    const figures = getFigureData(data, selectedCategory);
    // const test = ['中', 'a 中 拼音吗', 'Mr Jhon', 'start'].map((item) => getLastName(item))

    const {t} = useTranslation('common');

    const menus: PlainMenuProp[] = getMenu(t);

    const categoryBtns: {
        id: string;
        categoryName: string;
        text: string;
    }[] = [
        {
            id: '1',
            categoryName: 'principal-investigators',
            text: t('Principal Investigators')
        },
        {
            id: '2',
            categoryName: 'chen-scholars',
            text: t('Chen Scholars')
        },
        {
            id: '3',
            categoryName: 'graduate-fellows',
            text: t('Graduate Fellows')
        },
        // {
        //     id: '4',
        //     categoryName: 'physician-scientist',
        //     text: t('Physician Scientist')
        // },
    ];

    const menusList = [
        {
            id: 'principal-investigators-caltech',
            categoryName: 'principal-investigators-caltech',
            title: t('Principal Investigators')
        },
        {
            id: 'caltech-scholars',
            categoryName: 'caltech-scholars',
            title: t('Caltech Scholars')
        },
        // {
        //     id: 'chen-scholars',
        //     categoryName: 'chen-scholars',
        //     title: t('Chen Scholars')
        // },
        {
            id: 'graduate-fellows',
            categoryName: 'graduate-fellows',
            title: t('Graduate Fellows')
        },
    ];


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
                        <header
                            className={['mb-8 flex md:justify-between flex-col md:flex-row', selectedCategory == 'graduate-fellows' ? '!mb-0' : ''].join(' ')}>
                            <h1 className="md:self-center"><span
                                className="text-3xl">{title}</span>
                            </h1>
                            {/*{
                                loading ? '' : <div className="hidden md:flex">
                                    {categoryBtns.map((item) => (
                                        <LinkButton
                                            type="button"
                                            key={item.id}
                                            themeColor="light-orange"
                                            aClass="my-0"
                                            selected={isSelectedCategory(item.categoryName, selectedCategory)}
                                            onClick={() => {
                                                setSelectedCategory(item.categoryName);
                                                setSelectedId(item.categoryName)
                                                router.query.type = item.categoryName;
                                                router.query.year = '';
                                                router.push(router, undefined, {shallow: true});
                                            }}
                                        >
                                            {item.text}
                                        </LinkButton>
                                    ))}
                                </div>
                            }*/}
                            <ListBoxPlain menus={menusList}
                                          selectId={selectedId}
                                          className={'hidden md:flex'}
                                          buttonClassName='!py-0 !min-w-0'
                                          optionsClassName='lg:w-auto right-0'
                                          onChange={(id) => {
                                              setSelectedId(id)
                                              setSelectedCategory(id);
                                              router.query.type = id
                                              router.query.year = '';
                                              router.push(router, undefined, {shallow: true});
                                          }}/>


                            {
                                loading ? '' : <ListBox className="flex  md:hidden -ml-3"
                                                        menus={menusList}
                                                        selectId={selectedId}
                                                        onChange={(id) => {
                                                            setSelectedId(id)
                                                            setSelectedCategory(id);
                                                            router.query.type = id
                                                            router.query.year = '';
                                                            router.push(router, undefined, {shallow: true});
                                                        }}/>
                            }


                        </header>
                        <section className="min-h-[26rem] mb-12">
                            {loading
                                ? <Loading/>
                                :
                                <>
                                    {isSelectedCategory('graduate-fellows', selectedCategory) &&
																			<div className="w-full md:my-8 mb-8 md:mb-0 flex md:justify-end">
																				<ListBox
																					menus={menus}
																					selectId={selectedYear ?? defaultYear}
																					className="inline-block -ml-3"
																					onChange={(id) => {
                                              setSelectedYear(id);
                                              router.query.year = id;
                                              router.push(router, undefined, {shallow: true});
                                          }}/>
																			</div>
                                    }
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
                                </>
                            }
                        </section>
                        <Footer footermenus={footermenus}/>
                    </Main>
                </Body>
            </DefaultBackground>
        </>
    );
}

SupportingScientistsPage.queryPrincipalInvestigators = gql`
query getPrincipalInvestigatorsData(
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
      slug
      translation(language: $pageLocale) {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        principalInvestigatorsFigure{
          titles {
            title
          }
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

SupportingScientistsPage.queryChenScholars = gql`
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

SupportingScientistsPage.queryGraduateFellows = gql`
query getGraduateFellowsData(
  $pageLocale: LanguageCodeEnum!, 
  $categoryName: String, 
  $year: String,
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
      categoryName: $categoryName, 
      metaQuery: {
        metaArray: 
        [
          {
            key: "year", 
            value: $year, 
            compare: EQUAL_TO
          }
        ]}}
  ) {
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
          titles {
            title
          }
          year
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

SupportingScientistsPage.query = gql`
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
    }
  }
}
`;

SupportingScientistsPage.variables = (seedQuery, ctx) => {

    return {
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};
