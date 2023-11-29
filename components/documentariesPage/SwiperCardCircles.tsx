import Modal from '../ui/Modal';
import {XMarkIcon} from '@heroicons/react/20/solid';
import {Swiper, SwiperSlide} from 'swiper/react';
import {useTranslation} from 'next-i18next';
import Image from 'next/future/image';
import PaginationPrevNextIcon from '../PaginationPrevNextIcon';
import {useEffect, useState} from 'react';

interface SwiperCardCirclesProps {
    active: boolean;
    activeIndex?: number;
    onEscape?: (active: boolean) => void;
    onClick?: (active: boolean) => void;
}

export default function SwiperCardCircles({
                                              active,
                                              activeIndex,
                                              onEscape,
                                              onClick
                                          }: SwiperCardCirclesProps) {
    const {t} = useTranslation('common');
    const [swiper, setSwiper] = useState(null);
    useEffect(() => {
        if (active) {
            swiper.slideTo(activeIndex);
        }
    }, [active, swiper, activeIndex])
    const slides: {
        id: string;
        image: string;
        color: string;
        title: string;
        content: string;
    }[] = [
        {
            id: '1',
            image: '/images/documentariesPage/fundamental-research.png',
            color: 'bg-tcci-origin-purple',
            title: t('Fundamental Research'),
            content: t('By understanding how our brain develops and functions at cellular or neuronal levels, we’ll be able to advance the science, develop new technology, solve disease and disorders and unlock our mind’s full potential.')
        },
        {
            id: '2',
            image: '/images/documentariesPage/young-scientists.png',
            color: 'bg-tcci-origin-yellow',
            title: t('Young Scientists'),
            content: t('Most major breakthroughs in modern times have been made by scientists under the age of 40. It is critical to encourage more young people to enter the field and to support them in their research.')
        },
        {
            id: '3',
            image: '/images/documentariesPage/medical-science.png',
            color: 'bg-tcci-origin-red',
            title: t('Medical Science'),
            content: t('One can’t ignore the importance of clinical and medical investigation as it relates to brain science. Studying brain function within the cortical network or cerebellum, for example, will help us treat brain and cerebrovascular disease, tumors and trauma.')
        },
        {
            id: '4',
            image: '/images/documentariesPage/technology-applications.png',
            color: 'bg-tcci-origin-cyan',
            title: t('Technology & Applications'),
            content: t('Understanding exactly how the brain functions will lead to major technology breakthroughs in next-generation Artificial Intelligence. It will also lead to perfecting the brain-machine interface, which can enable mind control of prosthetics and robots, or augmentation of our minds.')
        }
    ]
    return (
        <Modal active={active} onEscape={onEscape} onClick={onClick}>
            <div
                className="relative top-[10%] h-4/5 w-4/5 max-w-2xl left-1/2 -translate-x-1/2 bg-black p-4 inline-block">
                <XMarkIcon className="w-8 h-8 text-white ml-auto cursor-pointer" aria-hidden={true}
                           onClick={() => onClick(active)}/>
                <Swiper loop
                        onSwiper={setSwiper}
                        initialSlide={activeIndex}
                        className="w-full h-[calc(100%-2rem)]">
                    {slides.map((item) => <SwiperSlide key={item.id}
                                                       className="flex flex-col items-center text-white justify-around">
                        <div className="relative w-[95%] h-64 mx-4">
                            <Image src={item.image}
                                   alt={item.title}
                                   fill
                                   className="object-cover block"/>
                        </div>
                        <div className={['w-5 h-5 rounded-full flex-shrink-0', item.color].join(' ')}></div>
                        <div className="border-b border-solid border-white w-5 text-center">
                            <p className="text-2xl pb-1">{item.id}</p>
                        </div>
                        <h1 className="md:text-5xl text-xl">{item.title}</h1>
                        <p className="w-[95%] text-center text-neutral-500 mb-6">{item.content}</p>
                    </SwiperSlide>)}
                </Swiper>
                <PaginationPrevNextIcon type="prev" onClick={() => {
                    swiper.slidePrev()
                }} className="absolute top-1/2 -left-4"/>
                <PaginationPrevNextIcon type="next" onClick={() => {
                    swiper.slideNext()
                }} className="absolute top-1/2 -right-4"/>
            </div>
        </Modal>
    );
}
