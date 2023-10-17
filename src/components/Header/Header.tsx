import { useState, useEffect, useContext } from "react";
import LanguageSwitch from "@/components/LanguageSwitch/LanguageSwitch";
import Menu from "@/components/Menu/Menu";
import MenuButton from "@/components/MenuButton/MenuButton";
import Image from "next/image";
import Link from "next/link";
import search from "static/img/search.svg";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/Modal/Modal";
import Search from "@/components/Search/Search";
import { LayoutContext } from "@/context/LayoutContext";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Header() {
  const { headerData: data } = useContext(LayoutContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { closeModal, isOpen: isOpenModal, openModal } = useModal();
  const router = useRouter();

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <header className="fixed w-full z-[19]">
      {data && (
        <Head>
          <title>{data.site_title}</title>
          <meta name="description" content={data.tagline} />
          <link rel="icon" href={data.site_icon} />
        </Head>
      )}
      <Modal isOpen={isOpenModal} parentSelector="body" closeModal={closeModal}>
        <Search closeModal={closeModal} />
      </Modal>
      <div className="w-full bg-[#F8F8F8] h-[86px] z-20 relative">
        <div className="container flex items-center w-full h-full justify-between relative tb:justify-end">
          <Link
            href={`/${router.query.lang}/`}
            className="tb:absolute tb:left-1/2 tb:top-1/2 tb:-translate-x-1/2 tb:-translate-y-1/2"
          >
            {data && (
              <Image
                src={data.logo_image.url}
                alt="logo"
                width={data.logo_image.width}
                height={data.logo_image.height}
              />
            )}
          </Link>
          <div className="flex items-center">
            <button className="mr-4 md:mr-10" onClick={openModal}>
              <Image src={search} height={21} width={21} alt="search" />
            </button>
            <LanguageSwitch />
            <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
      {data && (
        <Menu
          categories={data.category_menu}
          isOpen={isMobile && isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </header>
  );
}
