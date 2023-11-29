import Main from '../layout/Main';
import {useTranslation} from 'next-i18next';
import Image from 'next/future/image';
import TransparentButton from '../ui/TransparentButton';
import {ChevronRightIcon} from '@heroicons/react/20/solid';
import axios from 'axios';
import {Fragment, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";

export default function SignUp() {
    const {t} = useTranslation('common');

    const emailRef = useRef(null)
    let [isOpen, setIsOpen] = useState(false)
    let [isLoading, setIsLoading] = useState(false)
    const [html, setHtml] = useState('');

    const submit = (e) => {
        e.preventDefault()
        let EMAIL = emailRef.current.value
        let emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;

        if (!emailReg.test(EMAIL)) {
            emailRef.current.style.borderColor = 'red'
            return;
        }
        // 获取时间戳
        let timestamp = new Date().getTime()


        axios.get(`/subscribe/post-json?u=52012dde9962674edda12541c&id=d582baebcb&c=jQuery19005056957947472931_1676450457427&EMAIL=${EMAIL}&b_52012dde9962674edda12541c_d582baebcb=&subscribe=&_=${timestamp}`)
            .then(function (response) {

                // 假设接口返回的数据存储在一个叫做 response 的变量中
                let jsonString = response.data.replace(/^.*?\(/, '').replace(/\);?$/, '');
                let jsonObject = JSON.parse(jsonString);


                if (jsonObject.result != 'success') {
                    setHtml(jsonObject.msg)
                } else {
                    setHtml('')
                }

                openModal()
                emailRef.current.value = ''
                emailRef.current.style.borderColor = '#FFF'
            }).catch((err) => {
            setHtml(t('Submission failed please try again later'))
            openModal()
        })
    }
    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }


    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Tips
                                    </Dialog.Title>
                                    {
                                        !html ? (
                                            <div className="mt-2">
                                                <p className="text-base">{t('Subscribe successfully')}</p>
                                            </div>
                                        ) : (
                                            <div className="mt-2"
                                                 dangerouslySetInnerHTML={{__html: html}}
                                            >

                                            </div>
                                        )
                                    }

                                    <div className="mt-4 text-right">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm  "
                                            onClick={closeModal}
                                        >
                                            {t('Close')}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <div className="py-24 bg-tcci-black text-white font-Iowan">
                <Main className="flex justify-end relative  md:!pl-[220px] lg:!pl-[300px]">
                    <div className="md:py-16 md:pr-16 bg-black w-full flex relative flex-col md:flex-row">
                        <Image src="/images/documentariesPage/mwo-hands.png"
                               alt="mwo-hands"
                               className="md:absolute md:-translate-x-1/2 w-full md:w-[24rem] md:h-[16rem]"
                               width={570}
                               height={380}/>
                        <div className="md:pl-[250px] lg:pl-[280px] py-16 px-8 md:p-0">
                            <h2 className="font-bold text-white text-3xl md:text-5xl mb-6">{t('Sign up')}</h2>
                            <p className="text-lg md:mb-28 mb-8">
                                {t('Sign up to receive occasional updates about the Tianqiao and Chrissy Chen Institute.')}
                            </p>
                            <form>
                                <input type="email"
                                       ref={emailRef}
                                       name="EMAIL"
                                       id='mce-EMAIL'
                                       required
                                       placeholder={t('Email address')}
                                       className="border-b border-solid border-b-white bg-transparent max-w-[30rem] italic text-xl focus:outline-none"/>

                                <input type="text" name="b_52012dde9962674edda12541c_d582baebcb" defaultValue={''}
                                       style={{display: "none"}}/>
                                <TransparentButton onClick={submit} className="align-center block mt-8">
                                    {t('SUBSCRIBE')} <ChevronRightIcon className="w-6 h-6 inline-block"
                                                                       aria-hidden={true}/>
                                </TransparentButton>
                            </form>
                        </div>
                    </div>
                </Main>
            </div>
        </>
    );
}
