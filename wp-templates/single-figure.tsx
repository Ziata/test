import {gql} from '@apollo/client';
import Header from '../components/Header';
import Main from '../components/layout/Main';
import React from 'react';
import {useTranslation} from 'next-i18next';
import Image from 'next/future/image';
import Footer from '../components/Footer';
import PrincipalInvestigatorsFigureDetail from '../components/singleFigurePage/PrincipalInvestigatorsFigureDetail';
import GraduateFellowsFigureDetail from '../components/singleFigurePage/GraduateFellowsFigureDetail';
import Body from '../components/layout/Body';
import SEO from '../components/SEO'
import {BlogInfoFragment} from '../fragments/GeneralSettings';
import {websiteUrl} from "../utils/LinkPath";

const isCategoriesContain: (data: any, name: string) => boolean = (data, name) => {
    return data?.figure?.categories?.edges.some((item) => item?.node?.slug === name);
}

export default function SingleFigure(props) {

    const data = props.data;


    const {t} = useTranslation('common');

    const title = data?.figure?.translation?.title;

    const bigPhotoUrl = data?.figure?.translation?.principalInvestigatorsFigure?.profilePhoto?.sourceUrl
        ?? data?.figure?.translation?.graduateFellowsFigure?.profilePhoto?.sourceUrl
        ?? data?.figure?.translation?.ourTeamFigure?.profilePhoto?.sourceUrl
    const smallPhotoUrl = data?.figure?.translation?.featuredImage?.node?.sourceUrl;
    const profilePhotoUrl = bigPhotoUrl ?? smallPhotoUrl;
    const isUseBigImage = bigPhotoUrl != null;

    const personalTitles: string[] = data?.figure?.translation?.principalInvestigatorsFigure?.titles?.map((item) => item.title)
        ?? data?.figure?.translation?.graduateFellowsFigure?.titles?.map((item) => item.title)
        ?? data?.figure?.translation?.ourTeamFigure?.titles?.map((item) => item.title);

    let headerTitle: string = '';
    let Detail = null;

    if (isCategoriesContain(data, 'principal-investigators-caltech')) {
        Detail = PrincipalInvestigatorsFigureDetail;
        headerTitle = `${t('Supporting Scientists-1')} - ${t('Principal Investigators')}`;
    }
    if (isCategoriesContain(data, 'principal-investigators-shanghai')) {
        Detail = PrincipalInvestigatorsFigureDetail;
        headerTitle = `${t('Supporting Scientists-1')} - ${t('Principal Investigators shanghai')}`;
    }
    if (isCategoriesContain(data, 'Chen Scholars')) {
        Detail = PrincipalInvestigatorsFigureDetail;
        headerTitle = `${t('Supporting Scientists-1')} - ${t('Chen Scholars')}`;
    }

    if (isCategoriesContain(data, 'graduate-fellows')) {
        Detail = GraduateFellowsFigureDetail;
        headerTitle = `${t('Supporting Scientists-1')} - ${t('Graduate Fellows')}`;
    }
    if (isCategoriesContain(data, 'our-team')) {
        Detail = GraduateFellowsFigureDetail;
        headerTitle = t('Our Team');
    }
    if (isCategoriesContain(data, 'caltech-science')) {
        Detail = GraduateFellowsFigureDetail;
        headerTitle = t('Caltech Science - Workshop');
    }

    const websiteTitle = data?.generalSettings?.title;
    const description = data?.generalSettings?.description;
    const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []

    let url = (props.locale == 'en' ? websiteUrl + props.__SEED_NODE__.uri : websiteUrl + "/zh" + props.__SEED_NODE__.uri) || websiteUrl


    return (
        <>
            <SEO
                title={`${title} - ${websiteTitle}`}
                description={description}
                imageUrl={profilePhotoUrl}
                url={url}
            />

            <Header navMenus={navMenus}/>
            <Body>

                <Main>
                    <h1 className="mb-8">
                        <span className="text-3xl">{headerTitle}</span>
                    </h1>
                </Main>
                <article>
                    <section className="bg-neutral-100">
                        <Main className="flex justify-between py-0 flex-col-reverse lg:flex-row">
                            <div className="w-full lg:w-1/3 self-center my-8 lg:my-0">
                                <h2><span className="text-4xl font-bold text-tcci-orange mt-4">{title}</span>
                                </h2>
                                {personalTitles?.map((item) => (
                                    <p className="text-3xl mt-4" key={item}>{item}</p>
                                ))}
                            </div>
                            <figure
                                className={[
                                    "relative w-full lg:w-[45rem] h-[30rem]",
                                    "md:w-4/6 md:mx-auto",
                                    isUseBigImage ? '' : 'lg:!w-[30rem]'].join(' ')}>
                                <Image
                                    src={profilePhotoUrl ?? ''}
                                    alt={title}
                                    fill
                                    className={['object-cover object-top', isUseBigImage ? '' : 'clip-parallelogram'].join(' ')}
                                />
                            </figure>
                        </Main>
                    </section>
                    <section className="text-neutral-500 mt-8 mb-12">
                        <Main>
                            {Detail && Detail(props, data, t)}
                        </Main>
                    </section>
                </article>
                <Main>
                    <Footer footermenus={footermenus}/>

                </Main>

            </Body>
        </>
    );
}

SingleFigure.query = gql`
${BlogInfoFragment}
query getSingleFigureData (
    $databaseId: ID!, 
    $locale: LanguageCodeEnum!,
    $pageLocale: LanguageCodeEnum!
){
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
  figure(id: $databaseId, idType: URI, asPreview: false) {
    categories {
      edges {
        node {
          slug
        }
      }
    }
    translation(language:$locale) {
      title
      featuredImage{
        node{
          sourceUrl
        }
      }
      principalInvestigatorsFigure {
        linkDescription
        link
        quotation
        introduction
        researchAreas{
          researchArea
        }
        titles {
          title
        }
        profilePhoto{
          sourceUrl
        }
      }
      graduateFellowsFigure {
        introduction
        titles {
          title
        }
        profilePhoto{
          sourceUrl
        }
      }
      ourTeamFigure {
        introduction
        titles {
          title
        }
        profilePhoto{
          sourceUrl
        }
      }
    }
  }
}
`;
SingleFigure.variables = (seedQuery, ctx) => {
    return {
        locale: ctx.locale.toUpperCase(),
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};
