import Footer from '../components/Footer';
import Header from '../components/Header';
import Body from 'components/layout/Body';
import Main from '../components/layout/Main';
import Link from 'next/link';
import ContactUs from '../components/contactUsPage/ContactUs';
import {gql} from "@apollo/client";
import {BlogInfoFragment} from "../fragments/GeneralSettings";
import SEO from '../components/SEO'
import React from "react";
import {metaImageUrl, websiteUrl} from "../utils/LinkPath";

export default function ContactUsPage(props) {
    const data = props.data;


    const iconClass = "w-10 h-10 fill-neutral-50 hover:fill-tcci-orange-o70"
    // const socialIcons: SocialProps[] = [
    //     {
    //         id: '1',
    //         icon: <LinkedInIcon className={iconClass}/>,
    //         link: 'https://www.linkedin.com/company/tianqiao_and_chrissy_chen_institute?originalSubdomain=hk'
    //     },
    //     {
    //         id: '2',
    //         icon: <TwitterIcon className={iconClass}/>,
    //         link: 'https://twitter.com/ChenInstitute'
    //     },
    //     {
    //       id: '3',
    //       icon: <WeChatIcon className={iconClass}/>,
    //       link: '#'
    //     }
    // ];
    const title: string = data?.page?.translation?.title;
    const followus = data?.page?.translation?.contactUsFormPage?.followus
    const mediainquiries = data?.page?.translation?.contactUsFormPage?.mediainquiries
    const stayconnected = data?.page?.translation?.contactUsFormPage?.stayconnected

    const blogInfo = data?.generalSettings;

    const websiteTitle = data?.generalSettings?.title;
    const description = data?.generalSettings?.description;
    const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const footermenus = data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || []
    let imageUrl =   metaImageUrl
    let url = websiteUrl + props.__SEED_NODE__.uri || websiteUrl


    const StayConnected = () => <div className="space-y-6">
        <h2 className="text-4xl" dangerouslySetInnerHTML={{__html:stayconnected.title}}></h2>
        <p className="text-lg" dangerouslySetInnerHTML={{__html:stayconnected.content}}></p>
    </div>;

    const StayWithUs = () => <div className="space-y-6">
        <h2 className="text-4xl" dangerouslySetInnerHTML={{__html:followus.title}}></h2>
        <ul className="flex space-x-4">
            {followus.icons.map((item,index) => (
                <li key={index}><Link href={item.url ?? ''} passHref><a target="_blank" dangerouslySetInnerHTML={{__html:item.svg}}></a></Link></li>
            ))}
        </ul>
    </div>;

    const MediaInquiries = () => <div className="space-y-6">
        <h2 className="text-4xl" dangerouslySetInnerHTML={{__html:mediainquiries.title}}></h2>
        <div>
            <Link href={mediainquiries.link.url} passHref>
                <a target="_blank" className="text-lg hover:text-tcci-orange-o70">{mediainquiries.link.text}</a>
            </Link>
        </div>
    </div>;

    let form = data?.page?.translation?.frontierFormPage?.form || ''



    return (
        <>
            <SEO
                title={`${title} - ${websiteTitle}`}
                description={description}
                imageUrl={imageUrl}
                url={url}
            />
            <Header navMenus={navMenus}/>

            <div className="relative w-full h-full sm:h-[calc(100vh-102.5px)] bg-cover bg-center"
                 style={{
                     backgroundImage: `url(/images/contactUsPage/TCCI_Contacts_BG.jpg)`,
                 }}
            >
                {/*<Image*/}
                {/*    src={backGroundImage}*/}
                {/*    alt="Contact Us"*/}
                {/*    fill*/}
                {/*    className="absolute top-0 left-0 right-0 bottom-0 object-cover brightness-50 -z-10"*/}
                {/*/>*/}
                <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.5)]"></div>
                <Body className="w-full h-full relative z-10 pb-8 sm:pb-0">
                    <Main className="w-full h-full">
                        <div className="flex sm:flex-row items-center w-full justify-center h-full lg:px-24 flex-col">
                            <div
                                className="text-neutral-50 flex flex-col sm:w-1/2 h-full justify-center sm:p-12 pb-12 space-y-16">
                                <StayConnected/>
                                <StayWithUs/>
                                <MediaInquiries/>
                            </div>
                            <div className="relative flex justify-center sm:w-1/2">
                                <ContactUs {...{
                                    title,
                                    ...props
                                }}/>
                            </div>
                        </div>
                    </Main>
                </Body>
            </div>
            <Main>
                <Footer footermenus={footermenus}/>
            </Main>
            <div className='hidden' id='contactUsForm' dangerouslySetInnerHTML={{__html: form}}></div>
        </>
    )
}

ContactUsPage.query = gql`
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
      frontierFormPage {
        form
      }
      contactUsFormPage {
        followus {
          title
          icons {
            svg
            url
          }
        }
        mediainquiries {
          title
          link {
            text
            url
          }
        }
        stayconnected {
          title
          content
        }
      }
    }
  }
}
`;
ContactUsPage.variables = (seedQuery, ctx) => {
    return {
        pageLocale: ctx.locale.toUpperCase(),
        databaseId: decodeURIComponent(seedQuery?.uri)
    };
};
