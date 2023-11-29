// 记录片页面
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroVideo from '../components/documentariesPage/HeroVideo';
import TheTimeFor from '../components/documentariesPage/TheTimeFor';
import FourCircles from '../components/documentariesPage/FourCircles';
import MeetThePioneers from '../components/documentariesPage/MeetThePioneers';
import GlobalExcellence from '../components/documentariesPage/GlobalExcellence';
import TheDocumentary from '../components/documentariesPage/TheDocumentary';
import QuestionsCollapse from '../components/documentariesPage/QuestionsCollapse';
import SignUp from '../components/documentariesPage/SignUp';
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import SEO from '../components/SEO'
import {gql} from '@apollo/client';
import Main from '../components/layout/Main';
import {useTranslation} from 'next-i18next';
import TransparentLink from "../components/ui/TransparentLink";
import Head from 'next/head';
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";
import React from "react";

export default function DocumentariesPage(props) {
    const {t} = useTranslation('common');
    const data = props.data;
    const videoInfo = data?.page?.translation?.documentariesPage?.videoInfo
    const title: string = data?.page?.translation?.title;
    const websiteTitle = data?.generalSettings?.title;
    const description = data?.generalSettings?.description;
    const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []
    let imageUrl =  metaImageUrl
    let url = websiteUrl + props.__SEED_NODE__.uri || websiteUrl
    return (
        <>
            <SEO
                title={`${title} - ${websiteTitle}`}
                description={description}
                imageUrl={imageUrl}
                url={url}
            />

            <Head>
                <link rel="stylesheet" id="typekit-style-css" href="https://use.typekit.net/guh0pjj.css?ver=5.3.14"
                      type="text/css" media="all"/>
            </Head>

            <Header className='bg-black md:bg-[transparent]' transparent navMenus={navMenus}/>


            <HeroVideo locale={props.locale}  videoInfo={videoInfo}/>
            <TheTimeFor {...props}/>
            <FourCircles/>
            <MeetThePioneers/>
            <GlobalExcellence/>
            <TheDocumentary {...props}/>
            <SignUp/>

            <div className='bg-tcci-black font-Iowan'>
                <div
                    className='bg-[url(/images/documentariesPage/have_questions_bg3.png)] bg-fixed	bg-no-repeat  pb-32'
                    style={{
                        backgroundPosition: 'center right'
                    }}
                >
                    <Main>
                        <div className='Questions'>
                            <div className='text-white text-center text-3xl md:text-5xl mb-6'>{t("Questions")}</div>
                            <div
                                className='text-white text-lg text-center mb-12'>{t("Frequently Asked Questions")}</div>

                            <div className='flex flex-col md:flex-row'>
                                <QuestionsCollapse index={0}/>
                                <QuestionsCollapse index={1}/>
                            </div>
                        </div>


                        <div className='Still text-center'>
                            <div className='text-white text-center'>{t("Still need help")}</div>
                            <TransparentLink className="text-center inline-block mt-8 text-2xl	"
                                             link={'mailto:jason.reindorp@shanda.com'}>{t('EMAIL US')}</TransparentLink>
                            <div
                                className='text-white text-lg text-center mt-4'>{t("and we will get back to you shortly")}</div>
                        </div>
                    </Main>
                </div>
            </div>


            <Main>
                <Footer footermenus={footermenus}/>
            </Main>


        </>
    );
}

DocumentariesPage.query = gql`
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
      documentariesPage {
        videoInfo {
          title1
          title2
          title3
          content
        }
      }
    }
  }
}
`;

DocumentariesPage.variables = (seedQuery, ctx) => {

    return {
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};
