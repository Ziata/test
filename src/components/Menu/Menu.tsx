import Modal from '@/components/Modal/Modal'
import SubscriptionModal from '@/components/SubscriptionModal/SubscriptionModal'
import { useModal } from '@/hooks/useModal'
import { CategoryMenu } from '@/services/interface'
import { generateUniqueId } from '@/utils'
import { t } from 'i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { SetStateAction } from 'react'

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
  const {
    closeModal: closeSubscriptionModal,
    isOpen: isOpenSubscriptionModal,
    openModal: openSubscriptionModal
  } = useModal()
  const currentLanguage = router.query.lang as string

  return (
    <>
      <Modal isOpen={isOpenSubscriptionModal} parentSelector="body" closeModal={closeSubscriptionModal} center>
        <SubscriptionModal closeModal={closeSubscriptionModal} />
      </Modal>
      <div
        className={`${
          isOpen ? 'top-0 pt-[110px] !h-[100vh] absolute' : '-top-[100vh] fixed'
        } !max-w-[1600px] container h-full flex flex-col justify-start md:top-0 md:relative md:flex-row md:h-[70px] md:justify-center items-center gap-[50px] teansition-all duration-500 bg-[#fff] overflow-auto hidden-scrollbar z-[18]`}
      >
        <button
          className="block md:hidden font-Din font-bold text-base capitalize transition-all text-red-500"
          onClick={openSubscriptionModal}
        >
          {t('Get Our Newsletter')}
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
        <button
          className="hidden md:block font-Din font-bold text-base capitalize transition-all text-red-500 stb:absolute stb:right-[25px] tb:right-[60px]"
          onClick={openSubscriptionModal}
        >
          {t('Get Our Newsletter')}
        </button>
      </div>
    </>
  )
}
