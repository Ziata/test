import {useTranslation} from 'next-i18next';
import TransparentLink from '../ui/TransparentLink';
import Image from 'next/image';

export default function HeroVideo(
    {
        locale,
        videoInfo
    }
) {

    const {t} = useTranslation('common');

    return (
        <div className={[
            "md:h-screen text-white text-center",
            "bg-documentarie-header bg-center bg-no-repeat bg-cover",
            "py-32 md:py-0",
            "font-Iowan"
        ].join(' ')}
        >
            <video src="https://admin.cheninstitute.org/wp-content/uploads/2023/05/mind-wide-open.mp4"
                   className="hidden md:block w-full h-full object-cover -z-10 brightness-50"
                   loop muted tabIndex={-1} playsInline autoPlay>
            </video>
            <div
                className={[
                    'md:absolute md:top-28 md:left-0 md:right-0 md:bottom-0 ',
                    "flex flex-col justify-center",
                ].join(' ')}
            >
                <p className="font-bold text-lg" dangerouslySetInnerHTML={{__html:videoInfo?.title1}}></p>
                <h1 className="md:text-9xl text-5xl font-normal	 mt-10 uppercase tracking-[1px] font-bebasNeue leading-none	" dangerouslySetInnerHTML={{__html:videoInfo?.title2}}></h1>
                <p className="font-bold text-lg mt-5"
                   dangerouslySetInnerHTML={{__html:videoInfo?.title3}}
                ></p>

                <div className="font-bold text-lg mt-12"
                     dangerouslySetInnerHTML={{__html:videoInfo?.content}}
                ></div>

                <div className="mt-20 text-3xl font-bold mb-16">
                    <TransparentLink className='font-bebasNeue'
                                     link={'#video-trailer-link'}>{t('WATCH THE FILM')}</TransparentLink>
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

            </div>
        </div>
    );
}
