"use client";
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
import { useGetHeaderQuery } from "@/services/api";
import Loader from "@/components/Loader/Loader";
import LanguageContext from "@/context/LanguageContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { closeModal, isOpen: isOpenModal, openModal } = useModal();
  const { currentLanguage } = useContext(LanguageContext);
  const { data, isLoading } = useGetHeaderQuery({
    language: currentLanguage,
  });

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
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
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <header>
      <Modal isOpen={isOpenModal} parentSelector="body" closeModal={closeModal}>
        <Search closeModal={closeModal} />
      </Modal>
      <div className="w-full bg-[#F8F8F8] h-[86px] relative z-20">
        <div className="container flex items-center w-full h-full justify-between relative tb:justify-end">
          <Link
            href="/"
            className="tb:absolute tb:left-1/2 tb:top-1/2 tb:-translate-x-1/2 tb:-translate-y-1/2"
          >
            {isLoading ? (
              <Loader customClass="w-10 h-10" />
            ) : (
              data && (
                <Image
                  src={data.logo_image.url}
                  alt="logo"
                  width={data.logo_image.width}
                  height={data.logo_image.height}
                />
              )
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
          isOpen={isOpen && isMobile}
          setIsOpen={setIsOpen}
        />
      )}
    </header>
  );
}