import Header from "../components/Header";
import Main from "../components/layout/Main";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { GetStaticPropsContext } from "next";
import { getWordPressProps } from "@faustwp/core";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { gql } from "@apollo/client";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { metaImageUrl, websiteUrl } from "../utils/LinkPath";
import React from "react";
import Image from "next/future/image";
import Objective from "../components/Prize/Objective/Objective";
import Model from "components/Prize/Model/Model";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Form } from "components/Prize/Form/Form";

export default function Prize(props) {
  const { t } = useTranslation("common");
  const data = props.__TEMPLATE_QUERY_DATA__;
  const pageData = props.pageData;
  const websiteTitle = data?.generalSettings?.title;
  const description = data?.generalSettings?.description;
  const navMenus = data?.navmenu?.translation?.navMenus?.navmenus || [];
  const footermenus =
    data?.footerNavmenu?.translation?.footerNavMenus?.footermenus || [];
  let imageUrl = metaImageUrl;
  let url = websiteUrl + props.__SEED_NODE__.uri || websiteUrl;

  const mailchimpUrl =
    "https://cheninstitute.us17.list-manage.com/subscribe/post?u=52012dde9962674edda12541c&amp;id=6f55fd885c&amp;f_id=00de6be0f0";

  return (
    <>
      <SEO
        title={websiteTitle}
        description={description}
        imageUrl={imageUrl}
        url={url}
      />
      <Header navMenus={navMenus} />
      <Main>
        <div className="py-12 w-max-[1100px] mx-auto md:mb-[80px]">
          <h2 className="font-normal text-3xl leading-9 flex items-center text-[#002C47] mb-10">
            {pageData.hero_section_title}
          </h2>
          <div
            className={"w-full h-[22.5rem] relative"}
            style={{ backdropFilter: "blur(10px)" }}
          >
            <Image
              fill
              src={pageData.featured_image}
              alt={pageData.featured_image_alt}
              priority={true}
              className={"w-full h-64 object-cover bg-center"}
            />
          </div>
          <div
            className="text-[#6D6D6D] my-10"
            dangerouslySetInnerHTML={{ __html: pageData.hero_section_content }}
          />
          <div className="flex justify-between mb-9">
            <div className="text-[#002C47] text-xl font-normal">
              {t("Register to be notified")}
            </div>
            <div className="text-[#A2A2A2] text-lgflex items-center">
              <span className="text-[#F00] pt-2 mr-2">*</span>
              {t("is required")}
            </div>
          </div>
          <MailchimpSubscribe
            url={mailchimpUrl}
            render={({ subscribe, status, message }) => (
              <Form
                status={status}
                message={message}
                onValidated={(formData) => subscribe(formData)}
              />
            )}
          />
        </div>
      </Main>
      <Objective
        title={pageData.objective_list_title}
        data={pageData.objective_list_items}
      />
      <Model
        title={pageData.model_section_title}
        data={pageData.model_section_items}
      />
      <Model
        title={pageData.partner_section_title}
        data={pageData.partner_section_items}
        isRight={true}
      />
      <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8`}>
        <h5 className="font-normal text-3xl leading-9 flex items-center text-[#002C47] mb-10">
          {pageData.bottom_section_title}
        </h5>
        <div
          className=" text-[#6D6D6D] mt-10 mb-20"
          dangerouslySetInnerHTML={{ __html: pageData.bottom_section_content }}
        />
        <Footer footermenus={footermenus} />
      </div>
    </>
  );
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  let pageData = null;
  const response = await fetch(
    ctx.locale === "zh"
      ? `http://106.54.162.188/wp-json/cheninstitute/v2/prize-page-${ctx.locale}`
      : `http://106.54.162.188/wp-json/cheninstitute/v2/prize-page`
  );
  pageData = await response.json();

  const wpProps = (await getWordPressProps({ ctx })) as any;
  if ((wpProps as any).props) {
    Object.assign(
      (wpProps as any).props,
      await serverSideTranslations(ctx.locale, ["common"]),
      { locale: ctx.locale }
    );
  }
  return {
    props: {
      ...wpProps.props,
      pageData: pageData,
    },
    revalidate: 120,
  };
}
Prize.query = gql`
  ${BlogInfoFragment}
  query GetPageData($databaseId: ID!, $pageLocale: LanguageCodeEnum!) {
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
  }
`;

Prize.variables = (seedQuery, ctx) => {
  return {
    locale: ctx.locale.toUpperCase(),
    pageLocale: ctx.locale.toUpperCase(),
    databaseId: decodeURIComponent(seedQuery?.uri),
  };
};
