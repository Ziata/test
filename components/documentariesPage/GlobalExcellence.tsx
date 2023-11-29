import Main from '../layout/Main';
import {useTranslation} from 'next-i18next';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper';
import Image from 'next/future/image';

export default function GlobalExcellence() {
    const {t} = useTranslation('common');
    // useEffect(() => {
    //   if (typeof window !== 'undefined') {
    //     const rellax2 = new Rellax('.rellax2');
    //   }
    // });
    const slides: {
        id: string;
        image: string;
        width?: number;
        height?: number;
        title: string;
    }[] = [
        {
            id: '1',
            image: '/images/documentariesPage/institutions/berkeley.png',
            title: 'Berkeley',
            width: 180
        },
        {
            id: '2',
            image: '/images/documentariesPage/institutions/stanford.png',
            title: 'Stanford',
            width: 180
        },
        {
            id: '3',
            image: '/images/documentariesPage/institutions/huashan.png',
            title: 'HuaShan',
            width: 100
        },
        {
            id: '4',
            image: '/images/documentariesPage/institutions/oxford.png',
            title: 'Oxford'
        },
        {
            id: '5',
            image: '/images/documentariesPage/institutions/harvard.png',
            title: 'Harvard'
        },
        {
            id: '6',
            image: '/images/documentariesPage/institutions/caltech.png',
            title: 'Caltech'
        },
    ];
    return (
        <div className="relative text-white py-24 md:h-[58rem] overflow-hidden font-Iowan tcci-globe-bg-wrap">
            <div className="bg-tcci-black absolute top-0 left-0 right-0 bottom-0 -z-10"></div>
            {/*<Image src="/images/documentariesPage/earth.png"
                   alt="iris"
                   data-rellax-speed='0.3'
                   width={800}
                   height={800}
                   className="rellax absolute -left-[35rem] -top-[0]"/>*/}

            <div className={[
                'tcci-globe-bg',
                'bg-[url(/images/documentariesPage/earth.png)] bg-no-repeat bg-fixed',
                'absolute w-full h-screen l-0 t-0',
            ].join(' ')}
            ></div>


            <Main className="flex flex-col md:flex-row items-center mt-48 relative z-20">
                <div className="relative space-y-6 max-w-[20rem] md:pr-20 text-lg">
                    <h2 className="font-bold text-white text-3xl md:text-5xl">{t('Global excellence')}</h2>
                    <p>{t('Scientists from some of the most respected institutions all over the world were interviewed for this film.')}</p>
                </div>
                <Swiper slidesPerView={3}
                        initialSlide={0}
                        centeredSlides={true}
                        modules={[Autoplay]}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                            waitForTransition: true
                        }}
                        spaceBetween={10}
                        className='text-white hidden md:block'>
                    {slides.map((item, index) => <SwiperSlide key={index} className="text-center">
                        <div className="flex justify-center">
                            <Image src={item.image}
                                   alt={item.title}
                                   width={item.width ?? 210}
                                   height={item.height ?? 180}
                                   className=""/>
                        </div>
                    </SwiperSlide>)}
                    <div
                        className="shadow-[inset_5rem_0_3rem_1rem_rgba(26,26,26,0.6)_,_inset_-5rem_0_3rem_1rem_rgba(26,26,26,0.6)] absolute -top-10 -bottom-10 left-0 right-0 z-10"></div>
                </Swiper>

                <Swiper slidesPerView={1}
                        initialSlide={0}
                        centeredSlides={true}
                        modules={[Autoplay]}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                            waitForTransition: true
                        }}
                        spaceBetween={10}
                        className='w-full  text-white  md:hidden mt-16'>
                    {slides.map((item, index) => <SwiperSlide key={index} className="text-center">
                        <div className="flex justify-center">
                            <Image src={item.image}
                                   alt={item.title}
                                   width={item.width ?? 210}
                                   height={item.height ?? 180}
                                   className=""/>
                        </div>
                    </SwiperSlide>)}
                    <div
                        className="shadow-[inset_5rem_0_3rem_1rem_rgba(26,26,26,0.6)_,_inset_-5rem_0_3rem_1rem_rgba(26,26,26,0.6)] absolute -top-10 -bottom-10 left-0 right-0 z-10 hidden md:block"></div>
                </Swiper>
            </Main>
        </div>
    );
}
