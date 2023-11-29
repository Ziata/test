import {useTranslation} from 'next-i18next';
import axios from "axios";
import {Fragment, useRef, useState} from "react";
import {Dialog, Transition} from '@headlessui/react'
import Loading from '../../components/ui/Loading';
import SliderCaptcha from "rc-slider-captcha";
import createPuzzle from "create-puzzle";
import DemoImage from '../../public/images/captcha/captcha-2.png';
import {message} from 'antd';

export default function ContactUs(props) {
    let {
        className = '',
        title,
        __SEED_NODE__
    } = props
    const {t} = useTranslation('common');
    let [isOpen, setIsOpen] = useState(false)
    let [isLoading, setIsLoading] = useState(false)
    const [html, setHtml] = useState('');
    const offsetXRef = useRef(0); // x 轴偏移值
    const actionRef = useRef({});
    const [messageApi, contextHolder] = message.useMessage();

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const msgRef = useRef(null)




    const clickHandler = (event) => {
        event.stopPropagation();
        event.preventDefault()

        // @ts-ignore
        if (actionRef.current.status != 5) {

            messageApi.open({
                type: 'error',
                content: t('Swipe right to verify'),
            });

            return;
        }


        let name = nameRef.current.value
        let email = emailRef.current.value
        let msg = msgRef.current.value
        let emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;

        if (!name) {
            nameRef.current.style.borderColor = 'red'
            return;
        }

        if (!emailReg.test(email)) {
            emailRef.current.style.borderColor = 'red'
            return;
        }

        if (!msg) {
            msgRef.current.style.borderColor = 'red'
            return;
        }


        let formNode = document.querySelector('#frontierForm form')
        let id = formNode.querySelector('input[name="wpforms[id]"]')
        let author = formNode.querySelector('input[name="wpforms[author]"]')
        let token = formNode.getAttribute('data-token')
        /*
        英文
        wpforms[fields][1]: form-Name
        wpforms[fields][2]: form-Email
        wpforms[fields][3]: form-Message
        wpforms[id]: 9759
        wpforms[author]: 1
        wpforms[post_id]: 143
        wpforms[submit]: wpforms-submit
        wpforms[token]: e43fa875fbe8da8190c2f4c4fbdab3e7
        action: wpforms_submit
        page_url: http://106.54.162.188/chen-frontier-labs/
        page_title: Chen Frontier Labs
        page_id: 143
        */


        /*
        中文
        wpforms[fields][1]:姓名前沿实验室
        wpforms[fields][2]:794621729@qq.com
        wpforms[fields][3]:留言
        wpforms[id]:9779
        wpforms[author]:1
        wpforms[post_id]:146
        wpforms[submit]:wpforms-submit
        wpforms[token]:c0b4c9ef2978f0740b6def631a7ca2e9
        action: wpforms_submit
        page_url:http://106.54.162.188/zh/%e5%89%8d%e6%b2%bf%e5%ae%9e%e9%aa%8c%e5%ae%a4/
        page_title:前沿实验室
        page_id:146
        */


        setIsLoading(true)
        let formData = new FormData()

        formData.append('wpforms[fields][1]', name);//姓名
        formData.append('wpforms[fields][2]', email);//邮箱
        formData.append('wpforms[fields][3]', msg);//留言

        // @ts-ignore
        formData.append('wpforms[id]', id.value);//表单id
        // @ts-ignore
        formData.append('wpforms[author]', author.value);
        formData.append('wpforms[post_id]', __SEED_NODE__.databaseId);

        formData.append('wpforms[submit]', 'wpforms-submit');
        formData.append('wpforms[token]', token);//表单token
        formData.append('action', 'wpforms_submit');

        formData.append('page_url', window.location.href);
        formData.append('page_title', title);
        formData.append('page_id', __SEED_NODE__.databaseId);


        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        // return
        axios({
            method: 'post',
            url: '/wp-admin/admin-ajax.php',
            data: formData,
            headers
        }).then((res) => {
            if (res.data.data.confirmation) {
                setHtml(res?.data?.data?.confirmation)

                openModal()

                nameRef.current.value = ''
                emailRef.current.value = ''
                msgRef.current.value = ''

                nameRef.current.style.borderColor = '#a3a3a3'
                emailRef.current.style.borderColor = '#a3a3a3'
                msgRef.current.style.borderColor = '#a3a3a3'
                // @ts-ignore
                actionRef.current.refresh()
            } else {
                openModal()
            }
        }).catch((err) => {
            openModal()
        }).finally(() => {
            setIsLoading(false)
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
            {contextHolder}
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
                                        html ? (
                                            <div className="mt-2" dangerouslySetInnerHTML={{__html:html}}>

                                            </div>
                                        ) : (
                                            <div className="mt-2">
                                                <p className="text-base text-red-700">{t('Submission failed please try again later')}</p>
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


            <section
                className={["lg:shadow-lg lg:w-80 py-10 lg:py-6 lg:px-6 bg-white/0 lg:bg-white flex lg:block flex-col sm:flex-row", className].join(' ')}>
                <div className="self-center p-2">
                    <h1><span className="text-3xl text-neutral-50 lg:text-neutral-900">{t('Contact us')}</span></h1>
                    <p
                        className="text-neutral-50 lg:text-neutral-500 mt-2">{t('If you are interested in learning more about the Chen Investigator program, please contact us.')}</p>
                </div>
                <form className="space-y-4 mt-2 flex lg:block flex-wrap">
                    <input ref={nameRef} type="text" placeholder={t('Name') + ' *'} required
                           className="px-4 py-2 w-full rounded-xl border-2 border-neutral-400 focus:border-tcci-purple focus:outline-none border-solid"/>
                    <input ref={emailRef} type="email" placeholder={t('Email') + ' *'} required
                           className="px-4 py-2 w-full rounded-xl border-2 border-neutral-400 focus:border-tcci-purple focus:outline-none border-solid"/>
                    <textarea ref={msgRef} cols={30} rows={4} placeholder={t('Message') + ' *'} required
                              className="px-4 py-2  w-full rounded-xl border-2 border-neutral-400 focus:border-tcci-purple focus:outline-none border-solid"></textarea>
                    <SliderCaptcha
                        className="custom-captcha m-auto"
                        mode="float"
                        // @ts-ignore
                        actionRef={actionRef}
                        style={{zIndex: 2}}
                        tipText={{
                            default: t('Swipe right to verify'),
                            loading: 'Loading...'
                        }}

                        request={() =>
                            createPuzzle(DemoImage.src).then((res) => {
                                offsetXRef.current = res.x;

                                return {
                                    bgUrl: res.bgUrl,
                                    puzzleUrl: res.puzzleUrl
                                };
                            })
                        }
                        onVerify={async (data) => {
                            if (
                                data.x >= offsetXRef.current - 5 &&
                                data.x < offsetXRef.current + 5
                            ) {
                                return Promise.resolve();
                            }
                            return Promise.reject();
                        }}
                        bgSize={{
                            width: 270
                        }}
                    />

                    {
                        isLoading ?
                            (<Loading className='!my-0'/>)
                            :
                            (
                                <button className="w-full"
                                        onClick={clickHandler}
                                ><a
                                    className="px-5 py-2.5 rounded-full bg-tcci-purple inline-block m-6 select-none cursor-pointer text-neutral-50 hover:text-neutral-50 visited:text-neutral-50 border-none text-center !m-0 w-full hover:bg-tcci-purple-o70">{t('Submit')
                                }</a>
                                </button>
                            )
                    }

                </form>


            </section>
        </>
    );
}
