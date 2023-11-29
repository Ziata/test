import {useTranslation} from 'next-i18next';
import {FC, Fragment, ReactNode, useRef, useState} from 'react';
import axios from "axios";
import {Dialog, Transition} from '@headlessui/react'
import Loading from '../../components/ui/Loading';
import SliderCaptcha from "rc-slider-captcha";
import createPuzzle from "create-puzzle";
import DemoImage from '../../public/images/captcha/captcha-1.png';
import {message} from 'antd';


const Label: FC<{ htmlFor: string, label: string, children?: ReactNode, className?: string }> = ({
                                                                                                     htmlFor,
                                                                                                     label,
                                                                                                     children,
                                                                                                     className
                                                                                                 }) => (
    <label htmlFor={htmlFor} className={["w-1/2", className].join(' ')}>
        <p className="pl-2 pb-2">{label}</p>
        {children}
    </label>
);

export default function ContactUs(props) {
    let {
        className = '',
        locale,
        title,
        __SEED_NODE__
    } = props
    const {t} = useTranslation('common');
    const offsetXRef = useRef(0); // x 轴偏移值
    const actionRef = useRef({});
    const [html, setHtml] = useState('');
    const [messageApi, contextHolder] = message.useMessage();


    const optionList: any = [
        {
            title: t('Programs and Funding Enquiries'),
            value: t('Programs and Funding Enquiries'),
        },
        {
            title: t('Media Enquiries'),
            value: t('Media Enquiries'),
        }
    ]

    let [isOpen, setIsOpen] = useState(false)
    let [isLoading, setIsLoading] = useState(false)

    const firstRef = useRef(null)
    const lastRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const selectRef = useRef(null)
    const msgRef = useRef(null)

    const clickHandler = (event) => {
        event.stopPropagation();
        event.preventDefault()


        // Default = 1, // 默认
        // Loading=2, // 加载中
        // Moving=3, // 移动中
        // Verify=4, // 验证中
        // Success=5, // 验证成功
        // Error=6 // 验证失败

        // @ts-ignore
        if (actionRef.current.status != 5) {

            messageApi.open({
                type: 'error',
                content: t('Swipe right to verify'),
            });

            return;
        }

        let first = firstRef.current.value
        let last = lastRef.current.value
        let phone = phoneRef.current.value
        let select = selectRef.current.selectedIndex
        let email = emailRef.current.value

        let msg = msgRef.current.value
        let emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;

        if (!first) {
            firstRef.current.style.borderColor = 'red'
            return;
        }
        if (!last) {
            lastRef.current.style.borderColor = 'red'
            return;
        }

        if (!emailReg.test(email)) {
            emailRef.current.style.borderColor = 'red'
            return;
        }

        if (!phone) {
            phoneRef.current.style.borderColor = 'red'
            return;
        }


        if (!msg) {
            msgRef.current.style.borderColor = 'red'
            return;
        }


        let formNode = document.querySelector('#contactUsForm form')
        let id = formNode.querySelector('input[name="wpforms[id]"]')
        let author = formNode.querySelector('input[name="wpforms[author]"]')
        let token = formNode.getAttribute('data-token')
        /*
        英文
        wpforms[fields][1]: form-Name
        wpforms[fields][3]: Last name
        wpforms[fields][4]: Email
        wpforms[fields][5]: Phone
        wpforms[fields][6]: Programs and Funding Enquiries
        wpforms[fields][7]: 留言

        wpforms[id]: 9786
        wpforms[author]: 1
        wpforms[post_id]: 9589
        wpforms[submit]: wpforms-submit
        wpforms[token]: 29f2471a5914fc571bae2302e60859eb
        action: wpforms_submit
        page_url: http://106.54.162.188/contact-us/
        page_title: Contact Us
        page_id: 9589
        */


        /*
        中文
        wpforms[fields][1]: 名字
        wpforms[fields][3]: 姓氏
        wpforms[fields][4]: 邮箱
        wpforms[fields][5]: 电话
        wpforms[fields][6]: 媒体咨询
        wpforms[fields][7]: 留言

        wpforms[id]: 9783
        wpforms[author]: 1
        wpforms[post_id]: 9591
        wpforms[submit]: wpforms-submit
        wpforms[token]: 677728e6f9f8f68a214ce7e324f68f7b
        action: wpforms_submit
        page_url: http://106.54.162.188/zh/%e8%81%94%e7%b3%bb%e6%88%91%e4%bb%ac/
        page_title: 联系我们
        page_id: 9591
        */


        setIsLoading(true)
        let formData = new FormData()

        formData.append('wpforms[fields][1]', first);//名字
        formData.append('wpforms[fields][3]', last);//姓氏
        formData.append('wpforms[fields][4]', email);//邮箱
        formData.append('wpforms[fields][5]', phone);//电话
        formData.append('wpforms[fields][6]', optionList[select].value);//媒体咨询
        formData.append('wpforms[fields][7]', msg);//留言

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

                /*<div className="wpforms-confirmation-container-full wpforms-confirmation-scroll" id="wpforms-confirmation-9783"><p>Thanks for contacting us! We will be in touch with you shortly.</p>
                </div>*/

                setHtml(res?.data?.data?.confirmation)

                openModal()

                firstRef.current.value = ''
                lastRef.current.value = ''
                emailRef.current.value = ''
                phoneRef.current.value = ''
                selectRef.current.selectedIndex = 1
                msgRef.current.value = ''

                firstRef.current.style.borderColor = '#a3a3a3'
                lastRef.current.style.borderColor = '#a3a3a3'
                emailRef.current.style.borderColor = '#a3a3a3'
                phoneRef.current.style.borderColor = '#a3a3a3'
                selectRef.current.style.borderColor = '#a3a3a3'
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
                className={["md:shadow-lg py-10 py-6 px-6 bg-white bg-white flex md:block flex-col sm:flex-row", className].join(' ')}>
                <form className="space-y-4 mt-2 flex md:block flex-wrap">
                    <div className="flex space-x-4">
                        <Label htmlFor="first-name" label={t('First name')}>
                            <input type="text" placeholder={t('First name') + ' *'} required name="first-name"
                                   id="first-name"
                                   ref={firstRef}
                                   className="px-4 py-2 w-full rounded-xl border-2 border-neutral-400 focus:border-tcci-purple focus:outline-none border-solid"/>
                        </Label>
                        <Label htmlFor="last-name" label={t('Last name')}>
                            <input type="text" placeholder={t('Last name') + ' *'} required name="last-name"
                                   id="last-name"
                                   ref={lastRef}
                                   className="px-4 py-2 w-full rounded-xl border-2 border-neutral-400 focus:border-tcci-purple focus:outline-none border-solid"/>
                        </Label>
                    </div>
                    <div className="flex space-x-4">
                        <Label htmlFor="email" label={t('Email')}>
                            <input type="email" placeholder={t('Email') + ' *'} required
                                   ref={emailRef}

                                   name="email" id="email"
                                   className="px-4 py-2 w-full rounded-xl border-2 border-neutral-400 focus:border-tcci-purple focus:outline-none border-solid"/>
                        </Label>
                        <Label htmlFor="phone" label={t('Phone')}>
                            <input type="text" placeholder={t('Phone') + ' *'}
                                   ref={phoneRef}
                                   required name="phone" id="phone"
                                   className="px-4 py-2 w-full rounded-xl border-2 border-neutral-400 focus:border-tcci-purple focus:outline-none border-solid"/>
                        </Label>
                    </div>
                    <Label htmlFor="type-of-enquiry" label={t('Type of Enquiry')} className="p-2 !w-full">
                        <select name="type-of-enquiry" id="type-of-enquiry"
                                ref={selectRef}
                                className="px-4 py-2 w-full rounded-xl border-2 border-neutral-400 focus:border-tcci-purple focus:outline-none border-solid"

                        >
                            {
                                optionList.map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>{item.title}</option>
                                    )
                                })
                            }

                        </select>
                    </Label>
                    <Label htmlFor="message" label={t('Message')} className="p-2 !w-full">
          <textarea
              cols={30}
              rows={8}
              ref={msgRef}
              placeholder={t('Message') + ' *'}
              required
              name="message"
              id="message"
              className="px-4 py-2 w-full rounded-xl border-2 border-neutral-400 focus:border-tcci-purple focus:outline-none border-solid">
          </textarea>
                    </Label>

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
                            width: 320
                        }}
                    />


                    {
                        isLoading ?
                            (<Loading className='!my-0'/>)
                            :
                            (

                                <button className="float-right"
                                        onClick={clickHandler}
                                ><a
                                    className="px-5 py-2.5 rounded-full bg-tcci-orange-o70 hover:bg-tcci-orange-o50 inline-block m-6 select-none cursor-pointer text-neutral-50 hover:text-neutral-50 visited:text-neutral-50 border-none text-center !m-0 w-full">{t('Submit')
                                }</a>
                                </button>
                            )
                    }


                </form>
            </section>
        </>
    );
}
