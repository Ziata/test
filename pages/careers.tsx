import Header from "../components/Header";
import Main from "../components/layout/Main";
import Footer from "../components/Footer";
import SEO from '../components/SEO'
import {GetStaticPropsContext} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {BlogInfoFragment} from "../fragments/GeneralSettings";
import LinkPath, {metaImageUrl, websiteUrl} from "../utils/LinkPath";
import React, {useEffect} from "react";
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import DefaultBackground from "../components/ui/DefaultBackground";
import Body from "../components/layout/Body";
import Image from "next/future/image";
import {PostCardProp} from "../components/PostCard";
import Link from "next/link";
import {getLastName, orderNameSorter} from "../utils/name";

const getCareers: (data: any) => PostCardProp[] = (data) => data?.careers?.edges?.map((item) => {
    return {
        id: item?.node.id,
        title: item?.node.title,
        location: item?.node.career?.location,
        link: `${LinkPath.careers}${item?.node.slug}`
    }
});

export default function Careers(props) {
    const data = props.data;


    const CareerList = data?.careers?.nodes?.map((item, key) => ({
        id: key.toString(),
        name: item?.career?.alias||item?.title,
        location: item?.career?.location,
        link: `${LinkPath.careers}${item?.slug}`,
        show: item?.career?.show,
        order: item?.career?.order,
        orderName: item?.career?.lastName
            ?? getLastName(item?.title)
    })).sort(orderNameSorter);

 

    const title: string = data?.page?.translation?.title;
    const link: string = data?.page?.translation?.featuredImage?.node?.sourceUrl;


    const websiteTitle = data?.generalSettings?.title;
    const description = data?.generalSettings?.description;
    const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []
    let imageUrl = metaImageUrl

    let url = websiteUrl

    if (props.locale == 'zh') {
        url = websiteUrl + '/zh/careers'
    } else {
        url = websiteUrl + '/careers'
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
                        <section className="mt-0 page-content">
                            <header className="text-tcci-blue">
                                <h1 className="mb-8">
                                    <span className="text-3xl">{title}</span>
                                </h1>
                            </header>
                            {
                                link && <div
                                    className={["w-full h-[22.5rem] relative"].join(' ')}
                                    style={{backdropFilter: 'blur(10px)'}}
                                >
                                    {
                                        link && (
                                            <Image
                                                fill
                                                src={link ?? ''}
                                                alt={title}
                                                priority={true}
                                                className={["w-full h-64 object-cover bg-center"].join(' ')}
                                            />
                                        )
                                    }

                                </div>
                            }


                            <div className="text-neutral-500 my-8 ">
                                <div className="article_content__5RXjl">
                                    <section className="grid gap-x-4 gap-y-6 grid-cols-auto-fill-80">

                                        {
                                            CareerList?.map((item) => {
                                                if (item.show == 'false') return null
                                                return (
                                                    <div key={item.id}
                                                         className="text-tcci-blue relative bg-white h-auto min-h-fit p-4 w-full hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-500 flex flex-wrap justify-between">
                                                        <div className="w-full">
                                                            <div>
                                                                <div className="font-bold text-2xl line-clamp-3 mb-2">
                                                                    <Link href={item.link ?? ''} passHref>
                                                                        <a target="_self">{item.name}</a>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="self-end">
                                                            <div className="mt-2 line-clamp-5 text-neutral-500"
                                                                 dangerouslySetInnerHTML={{__html: item.location}}></div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </section>

                                </div>
                            </div>

                        </section>


                        <Footer footermenus={footermenus}/>
                    </Main>
                </Body>
            </DefaultBackground>
        </>
    )
}


export async function getStaticProps(ctx: GetStaticPropsContext) {
    const client = new ApolloClient({
        uri: process.env.NEXT_PUBLIC_WORDPRESS_URL + 'graphql', // GraphQL API 地址
        cache: new InMemoryCache(),
    });

    const wpProps = {
        props: {},
        revalidate: 120,
    }
    wpProps.props = await client.query({
        query: gql`
${BlogInfoFragment}
query GetPageData(
  $databaseId: ID!
  $pageLocale: LanguageCodeEnum!
  $language: LanguageCodeFilterEnum = ZH
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
  careers(first: 999, where: {language: $language}) {
    nodes {
      id
      slug
      career {
        alias
        location
        lastName
        order
        show
      }
      title
    }
  }
}
`,
        variables: {
            pageLocale: ctx.locale.toUpperCase(),
            language: ctx.locale.toUpperCase(),
            databaseId: '/careers-list'
        }
    });


    if ((wpProps as any).props) {
        Object.assign((wpProps as any).props, await serverSideTranslations(ctx.locale, ['common']), {locale: ctx.locale})
    }

    return {
        ...wpProps
    };
}
