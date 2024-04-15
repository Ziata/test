import Modal from '@/components/Modal/Modal'
import SubscriptionModal from '@/components/SubscriptionModal/SubscriptionModal'
import { LayoutContext } from '@/context/LayoutContext'
import { useModal } from '@/hooks/useModal'
import { CategoryMenu } from '@/services/interface'
import { generateUniqueId } from '@/utils'
import { t } from 'i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { SetStateAction, useContext } from 'react'

export default function Menu({
  isOpen,
  setIsOpen,
  categories
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
  categories: CategoryMenu[]
}) {
  const router = useRouter()
  const { headerData } = useContext(LayoutContext)
  const {
    closeModal: closeSubscriptionModal,
    isOpen: isOpenSubscriptionModal,
    openModal: openSubscriptionModal
  } = useModal()
  const currentLanguage = router.query.lang as string

  if (!headerData) return

  return (
    <>
      <Modal isOpen={isOpenSubscriptionModal} parentSelector="body" closeModal={closeSubscriptionModal} center>
        <SubscriptionModal closeModal={closeSubscriptionModal} />
      </Modal>
      <div
        className={`${
          isOpen ? 'top-0 pt-[110px] !h-[100vh] absolute' : '-top-[100vh] fixed'
        } !max-w-full container h-full flex flex-col justify-start md:top-0 md:relative md:flex-row md:h-[70px] md:justify-center items-center gap-[50px] teansition-all duration-500 bg-[#fff] overflow-auto hidden-scrollbar z-[18]`}
      >
        <button
          className="block md:hidden font-Din font-bold text-base capitalize transition-all text-[#DD0000]"
          onClick={() =>
            window.open(
              headerData.menu_button_url,
              headerData.menu_button_open_in_new_tab === 'No' ? '_self' : '_blank'
            )
          }
        >
          {headerData.menu_button_name}
        </button>

        {categories.map(item => {
          const isActive = router.asPath === `/${currentLanguage}/category/${item.category.slug}`

          return (
            <Link
              href={`/${currentLanguage}/category/${item.category.slug}`}
              key={generateUniqueId()}
              onClick={() => setIsOpen(false)}
              className={`font-Din font-bold text-base capitalize ${
                isActive ? 'text-[#0071BC]' : 'text-[#002c47]'
              } transition-all duration-300 hover:text-[#0071BC]`}
            >
              {item.category_name}
            </Link>
          )
        })}
        <div className="stb:w-full max-w-[1600px] stb:absolute stb:pr-[25px] tb:pr-[60px] flex justify-end items-center">
          <button
            className="hidden md:block font-Din font-bold text-base capitalize transition-all text-[#DD0000]"
            onClick={() =>
              window.open(
                headerData.menu_button_url,
                headerData.menu_button_open_in_new_tab === 'No' ? '_self' : '_blank'
              )
            }
          >
            {headerData?.menu_button_name}
          </button>
        </div>
      </div>
    </>
  )
}
