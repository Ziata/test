import Header from "components/Header";
import HeadSwiper from "../components/homePage/HeadSwiper";
import Main from "../components/layout/Main";
import NewsOverview from "../components/homePage/NewsOverview";
import Gallery from "../components/homePage/Gallery";
import Footer from "../components/Footer";
import Section from "../components/layout/Section";
import { gql } from "@apollo/client";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import SEO from "../components/SEO";
import { metaImageUrl, websiteUrl } from "../utils/LinkPath";

// home 首页
export default function FrontPage(props) {
  const data = props.data;
  let homePageHeadSlider =
    data?.page?.translation?.homePageFields?.homePageHeadSlider || [];
  let postData = { posts: data.posts };

  const title = data?.generalSettings?.title;
  const description = data?.generalSettings?.description;
  const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || [];
  const footermenus =
    data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || [];
  let imageUrl =
    homePageHeadSlider[0].overlappingImages[0].sourceUrl || metaImageUrl;
  let url = websiteUrl + props.__SEED_NODE__.uri || websiteUrl;

  return (
    <>
      <SEO
        title={title}
        description={description}
        imageUrl={imageUrl}
        url={url}
      />
      <Header transparent={true} navMenus={navMenus} />
      <HeadSwiper homePageHeadSlider={homePageHeadSlider} />
      <NewsOverview postData={postData} />
      <Main>
        <Section className={"mt-12 sm:mt-24"}>
          <Gallery />
        </Section>
        <Footer footermenus={footermenus} />
      </Main>
    </>
  );
}

FrontPage.query = gql`
  ${BlogInfoFragment}
  query GetPageData($pageLocale: LanguageCodeEnum = EN) {
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
    page(id: "home-page", idType: URI) {
      translation(language: $pageLocale) {
        homePageFields {
          homePageHeadSlider {
            backgroundVideo
            title
            overlappingImages {
              sourceUrl(size: MEDIUM_LARGE)
            }
            subtitle
            description
            mainLink {
              target
              url
              title
            }
            subLink {
              target
              url
              title
            }
            poster {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;
FrontPage.variables = (seedQuery, ctx) => {
  return {
    pageLocale: ctx.locale.toUpperCase(),
  };
};
