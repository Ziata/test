import Header from '../components/Header';
import DefaultBackground from '../components/ui/DefaultBackground';
import Main from '../components/layout/Main';
import Footer from '../components/Footer';
import {gql, useQuery} from '@apollo/client';
import PageHeroTemplate from '../components/PageHeroTemplate';
import React from 'react';
import {useTranslation} from 'next-i18next';

import {useRouter} from 'next/router';
import Body from '../components/layout/Body';
import classes from '../styles/article.module.scss';
import SEO from '../components/SEO'
import {BlogInfoFragment} from '../fragments/GeneralSettings';

export default function ALetterFromTianqiaoChenAndChrissyLuoPage(props) {
    const router = useRouter();
    const {data, loading} = useQuery(ALetterFromTianqiaoChenAndChrissyLuoPage.query, {
        variables: {
            pageLocale: props.locale.toUpperCase(),
            databaseId: props.__SEED_NODE__.databaseId,
        }
    });
    const {t} = useTranslation('common');

    const title: string = data?.page?.translation?.title;
    const content: string = data?.page?.translation?.content ?? '';
    const contentDIV = <div className={classes.content} dangerouslySetInnerHTML={{__html: content}}/>;
    const link: string = data?.page?.translation?.featuredImage?.node?.sourceUrl;
    const blogInfo = data?.generalSettings;

    if (loading) {
        return null
    }
    return (
        <>
            <SEO title={`${title} - ${blogInfo?.title}`} description={blogInfo?.description}/>
            <Header/>
            <DefaultBackground>
                <Body>
                    <Main>
                        <PageHeroTemplate
                            title={title}
                            content={contentDIV}
                            heroImageUrl={link}
                            isImageBottom={false}
                        />

                        <Footer/>
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
) {
  generalSettings {
        ...BlogInfoFragment
  }
  page(id: $databaseId, idType: DATABASE_ID) {
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
