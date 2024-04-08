import Loader from '@/components/Loader/Loader'
import { jsonToFormData } from '@/pages/[lang]/contact'
import { useSendMessageMutation } from '@/services/api'
import { Page } from '@/services/interface'
import { t } from 'i18next'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function SubscriptionModal({ closeModal }: { closeModal: () => void }) {
  const [email, setEmail] = useState<string>('')
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)
  const [statusMessage, setStatusMessage] = useState<string>('')
  const router = useRouter()
  const currentLanguage = router.query.lang as string
  const [sendMessage, { isLoading }] = useSendMessageMutation()

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    setIsEmailValid(validateEmail(event.target.value))
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async () => {
    if (!isEmailValid) setStatusMessage('One or more fields have an error. Please check and try again.')
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      const response = await fetch(
        `${baseUrl}/${currentLanguage}/wp-json/nextquestion${
          currentLanguage === 'zh' ? currentLanguage : ''
        }/v2/contact-page`
      )
      const data: Page = await response.json()
      if (!data.form_id) return
      try {
        const result = (await sendMessage({
          id: data.form_id,
          body: jsonToFormData({
            'your-name': email,
            'your-email': email,
            'type-enquiry': 'subscribe'
          })
        })) as { data: { message: string } }
        setStatusMessage(result?.data?.message)
      } catch (error) {
        console.error(error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    statusMessage && setTimeout(() => setStatusMessage(''), 5000)
  }, [statusMessage])

  return (
    <div className="rounded-[10px] bg-[#fff] p-6 tb:p-9 min-w-[300px]">
      <h3 className="font-Din font-bold text-[24px] tb:text-[45px]  text-center capitalize text-black tb:whitespace-nowrap">
        {t('Subscription modal title')}
      </h3>
      <h6 className="font-Din font-normal text-[18px] tb:text-2xl leading-6 capitalize text-[#8A8A8A] tb:whitespace-nowrap my-3 tb:my-10 text-center">
        {t('Subscription modal subtitle')}
      </h6>
      <div className="flex items-center justify-center mb-5">
        <input
          className="font-Din rounded-[10px_0px_0px_10px] border-2 border-solid border-[rgba(0,0,0,0.1)] w-full max-w-[420px] h-[40px] tb:h-[62px] outline-none p-3 tb:p-5 text-xl leading-5 placeholder:capitalize placeholder:text-[#C9C9C9]"
          placeholder={t('Enter your email')}
          value={email}
          onChange={handleEmailChange}
        />
        <button
          className="font-Din rounded-[0px_10px_10px_0px] bg-[#0071BC] p-[10px] tb:p-[21px] h-[40px] tb:h-[62px]  font-bold text-[14px] tb:text-xl leading-5 uppercase text-white"
          onClick={handleSubmit}
        >
          {isLoading ? <Loader customClass="w-6 h-6" /> : t('Subscribe')}
        </button>
      </div>
      {statusMessage && <div className="text-orange-600 mt-4">{statusMessage}</div>}
      <button
        className="font-Din block text-sm leading-6 capitalize text-[#8A8A8A] mx-auto underline"
        onClick={closeModal}
      >
        {t('No thanks')}
      </button>
    </div>
  )
}
