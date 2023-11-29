import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay, Pagination} from 'swiper';
import {useTranslation} from 'next-i18next';
import {PaginationOptions, Swiper as SwiperType} from 'swiper/types';
import {useState} from 'react';

interface NumberSwiperProps {
    className?: string
}

export default function NumberSwiper({
                                         className
                                     }: NumberSwiperProps) {
    const {t} = useTranslation('common');

    const [activeIndex, setActiveIndex] = useState(0);

    function activeIndexChangeHandler(swiper: SwiperType) {
        setActiveIndex((swiper.activeIndex + 2) % 5);
    }

    const pagination: PaginationOptions = {
        clickable: true,
        renderBullet: function (index, className) {
            return `<div class="${className}"></div>`;
        },
        bulletClass: 'w-2 h-2 rounded-full bg-white transition-all duration-500 inline-block mr-4 relative z-10 cursor-pointer',
        bulletActiveClass: 'scale-150'
    };
    const slides: {
        title: JSX.Element | string;
        content: JSX.Element | string;
        institution: JSX.Element | string;
    }[] = [
        {
            title: '11%',
            content: t('Neurological diseases make up 11 percent of the world’s disease burden (not including mental health and addiction disorders).'),
            institution: t('Society for Neuroscience')

        },
        {
            title: t('100BN'),
            content: t('The average human brain has 100 billion nerve cells.'),
            institution: t('Society for Neuroscience')
        },
        {
            title: '44%',
            content: t('US federal agencies provided only 44% of the total amount spent on basic research in 2015.'),
            institution: t('www.sciencemag.org')
        },
        {
            title: '1000',
            content: t('More than 1,000 neurological and neurodegenerative diseases affect the lives of nearly 100 million Americans.'),
            institution: t('Putting Brain Power Behind Brain Disease, The New York Academy of Sciences Magazine (November 2011)')
        },
        {
            title: t('121M'),
            content: t('Depression affects about 121 million people worldwide.'),
            institution: t('European Brain Council')
        },
    ]
    return (
        <div className={['relative', className].join(' ')}>
            <Swiper slidesPerView={3}
                    initialSlide={0}
                    centeredSlides={true}
                    modules={[Pagination, Autoplay]}
                    pagination={pagination}
                    loop={true}
                    autoplay={{
                        delay: 8000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                        waitForTransition: true
                    }}
                    spaceBetween={30}
                    onActiveIndexChange={activeIndexChangeHandler}
                    className='documentaries-swiper text-white hidden md:block'>
                {slides.map((item, index) => <SwiperSlide key={index} className="text-center">
                    <div
                        className={["text-7xl font-bold transition-all duration-500 mb-8 ", activeIndex === index ? 'scale-[1.3]' : 'scale-90'].join(' ')}>{item.title}</div>
                    <div className="text-xl mb-2 ">{item.content}</div>
                    <div className="text-sm mb-12">{item.institution}</div>
                </SwiperSlide>)}
            </Swiper>

            <Swiper slidesPerView={1}
                    initialSlide={0}
                    centeredSlides={true}
                    modules={[Pagination, Autoplay]}
                    pagination={pagination}
                    loop={true}
                    autoplay={{
                        delay: 8000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                        waitForTransition: true
                    }}
                    spaceBetween={30}
                    onActiveIndexChange={activeIndexChangeHandler}
                    className='documentaries-swiper text-white  block md:hidden'>
                {slides.map((item, index) => <SwiperSlide key={index} className="text-center">
                    <div
                        className={["text-6xl font-bold transition-all duration-500 mb-8   w-4/5 mx-auto", activeIndex === index ? 'scale-[1.3]' : 'scale-90'].join(' ')}>{item.title}</div>
                    <div className="text-xl mb-2   w-4/5 mx-auto">{item.content}</div>
                    <div className="text-sm mb-12   w-4/ mx-auto">{item.institution}</div>
                </SwiperSlide>)}
            </Swiper>
        </div>
    )
}
