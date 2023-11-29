import Header from '../components/Header';
import DefaultBackground from '../components/ui/DefaultBackground';
import Main from '../components/layout/Main';
import Footer from '../components/Footer';
import {gql} from '@apollo/client';
import PageHero from '../components/PageHero';
import React from 'react';
import {useTranslation} from 'next-i18next';
import ChevronRightLink from '../components/ui/ChevronRightLink';
import {Category, toLocaleCategory} from '../utils/category';
import PostCardBig from '../components/PostCardBig';
import {getAnnualReports} from './annual-reports-page';
import Body from '../components/layout/Body';
import classes from '../styles/article.module.scss';
import SEO from '../components/SEO'
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import {Swiper, SwiperSlide} from 'swiper/react';
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";

export default function ALetterFromTianqiaoChenAndChrissyLuoPage(props) {

    const data = props.data;

    const {t} = useTranslation('common');

    const title: string = data?.page?.translation?.title;
    const content: string = data?.page?.translation?.content ?? '';
    const contentDIV = <div className={classes.content} dangerouslySetInnerHTML={{__html: content}}/>;
    const link: string = data?.page?.translation?.featuredImage?.node?.sourceUrl;
    const restReports = getAnnualReports(data);



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
                <Body>
                    <Main>
                        <PageHero
                            title={title}
                            content={contentDIV}
                            heroImageUrl={link}
                            isImageBottom={false}
                        />
                        <section className="mt-16 mb-24">
                            <div className={["text-tcci-blue my-8"].join(' ')}>
                                <div className="flex justify-between flex-col sm:flex-row mb-8">
                                    <p className="text-3xl">{t('TCCI Annual Reports')}</p>
                                    <ChevronRightLink content={t('See More')} link="annual-reports"/>
                                </div>

                                <Swiper
                                    slidesPerView={3.8}
                                    spaceBetween={15}
                                    className="hidden lg:block"
                                    allowTouchMove={true}
                                    mousewheel={true}
                                >
                                    {restReports?.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <PostCardBig key={item.id}
                                                         post={item}
                                                         showTag={false}
                                                         showDate={false}
                                                         showReadLink={false}
                                                         className="w-full h-[16rem]"/>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>


                                <Swiper
                                    slidesPerView={2.5}
                                    spaceBetween={30}
                                    className="hidden sm:hidden md:block lg:hidden"
                                    allowTouchMove={true}
                                    mousewheel={true}
                                >
                                    {restReports?.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <PostCardBig key={item.id}
                                                         post={item}
                                                         showTag={false}
                                                         showDate={false}
                                                         showReadLink={false}
                                                         className="w-full h-[16rem]"/>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>


                                <Swiper
                                    slidesPerView={1.5}
                                    spaceBetween={30}
                                    className="block sm:block md:hidden lg:hidden"
                                    allowTouchMove={true}
                                    mousewheel={true}
                                >
                                    {restReports?.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <PostCardBig key={item.id}
                                                         post={item}
                                                         showTag={false}
                                                         showDate={false}
                                                         showReadLink={false}
                                                         className="w-full h-[15rem]"/>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                            </div>
                        </section>
                        <Footer footermenus={footermenus}/>

                    </Main>
                </Body>
            </DefaultBackground>
        </>
    );
}

ALetterFromTianqiaoChenAndChrissyLuoPage.query = gql`
${BlogInfoFragment}
query GetPageData(
  $databaseId: ID!
  $pageLocale: LanguageCodeEnum!
  $postLocale: LanguageCodeFilterEnum!,
  $category: String
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
  posts(
    where: {
      language: $postLocale, 
      orderby: [{field: DATE, order: DESC}], 
      categoryName: $category
    }
  ) {
    nodes {
      id
      featuredImage {
        node {
          sourceUrl
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
      newsletterAndAnnualReport {
        link
      }
    }
  }
}
`;
ALetterFromTianqiaoChenAndChrissyLuoPage.variables = (seedQuery, ctx) => {
    return {
        postLocale: ctx.locale.toUpperCase(),
        pageLocale: ctx.locale.toUpperCase(),
        category: toLocaleCategory('annual-report' as Category, ctx),
        databaseId: decodeURIComponent(seedQuery?.uri),
    };
};
