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
import React, { useEffect, useState } from "react";
import Image from "next/future/image";
import Objective from "../components/Prize/Objective/Objective";
import Model from "components/Prize/Model/Model";

export default function Prize(props: any) {
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

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organization, setOrganization] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setIsButtonDisabled(!emailValue);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleOrganizationChange = (event) => {
    setOrganization(event.target.value);
  };

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
            className="text-lg leading-[22px] text-[#6D6D6D] my-10"
            dangerouslySetInnerHTML={{ __html: pageData.hero_section_content }}
          />
          <div className="flex justify-between mb-9">
            <div className="text-[#002C47] text-xl font-normal">
              Register to be notified.
            </div>
            <div className="text-[#A2A2A2] text-lgflex items-center">
              <span className="text-[#F00] pt-2 mr-2">*</span>is required.
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-7 flex-wrap justify-between">
            <input
              className="w-full md:w-[211px] h-16 border not-italic font-normal text-lg leading-[22px] text-[#002C47] rounded-[20px] border-solid border-[rgba(0,0,0,0.2)] outline-none p-5"
              placeholder="email"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              className="w-full md:w-[211px] h-16 border not-italic font-normal text-lg leading-[22px] text-[#002C47] rounded-[20px] border-solid border-[rgba(0,0,0,0.2)] outline-none p-5"
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <input
              className="w-full md:w-[211px] h-16 border not-italic font-normal text-lg leading-[22px] text-[#002C47] rounded-[20px] border-solid border-[rgba(0,0,0,0.2)] outline-none p-5"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
            />
            <input
              className="w-full md:w-[211px] h-16 border not-italic font-normal text-lg leading-[22px] text-[#002C47] rounded-[20px] border-solid border-[rgba(0,0,0,0.2)] outline-none p-5"
              placeholder="Organization"
              value={organization}
              onChange={handleOrganizationChange}
            />
            <button
              className="w-[145px] h-16 border text-lg text-white rounded-[20px] border-solid border-[rgba(54,54,54,0.2)] bg-[#B5B5B5] flex items-center justify-center disabled:opacity-60"
              disabled={isButtonDisabled}
            >
              Submit
            </button>
          </div>
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
          className="text-lg leading-[22px] text-[#6D6D6D] my-10"
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
