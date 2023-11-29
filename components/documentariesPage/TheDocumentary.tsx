import {useTranslation} from 'next-i18next';
import Main from '../layout/Main';
import Image from "next/image";

export default function TheDocumentary(props) {
    let locale = props.locale
    const {t} = useTranslation('common');
    return (
        <div className="text-white bg-tcci-black py-24 font-Iowan" id='video-trailer-link'>
            <Main className="space-y-6">
                <h2 className="text-center font-bold text-3xl md:text-5xl">{t('The Documentary')}</h2>

                {
                    locale!='zh' && (
                        <p
                            className="text-center text-lg">{t('Available now on iTunes, Google Play and Amazon Prime Video')}
                        </p>
                    )
                }

                <div
                    style={{position: "relative", paddingBottom: "56.25%", overflow: "hidden"}}
                >
                    <iframe
                        src="https://www.youtube.com/embed/dkyntB4POQY"
                        width="100%"
                        height="100%"
                        frameBorder={0}
                        scrolling="auto"
                        style={{position: "absolute"}}
                    />
                </div>

                {
                    locale == 'zh' && (
                        <div className="block text-center">
                            <div className='text-lg	 mb-4'>{t('look')}</div>
                            <div className="flex items-center justify-center">
                                <div className="mr-4">
                                    <a
                                        href="https://www.iqiyi.com/v_19rr04ygus.html"
                                        target="_blank" rel="noreferrer"
                                    >
                                        <Image
                                            width={56}
                                            height={45}
                                            src="/images/documentariesPage/IQIY.png"
                                            className="attachment-full size-full"

                                        /></a>
                                </div>
                                <div className="">
                                    <a
                                        href="http://t.cn/Ev7oCpV"
                                        target="_blank" rel="noreferrer"
                                    >
                                        <Image
                                            width={83}
                                            height={45}
                                            src="/images/documentariesPage/miaopai.png"
                                            className="attachment-full size-full"/>
                                    </a>

                                </div>
                            </div>
                        </div>
                    )
                }
            </Main>
        </div>
    );
}
