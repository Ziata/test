import {Category, getLinkByCategory, redirectCategory} from '../utils/category';
import {useTranslation} from 'next-i18next';
import ChevronRightLink from './ui/ChevronRightLink';
import CategoryTagBig from './CategoryTagBig';
import PaginationDash from './PaginationDash';
import {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import PostCard, {PostCardProp} from './PostCard';

interface CardGalleryProps {
    title: string;
    className?: string;
    tag: Category;
    posts: PostCardProp[]
}

export default function CardGallery({
                                        title,
                                        className = '',
                                        tag,
                                        posts
                                    }: CardGalleryProps) {
    const redirectedTag = redirectCategory(tag);

    const {t} = useTranslation('common');
    const [current, setCurrent] = useState(1);
    const [swiper, setSwiper] = useState(null);
    return (
        <div className={["text-tcci-blue", className].join(' ')}>
            <div className="flex justify-between flex-col sm:flex-row mb-8">
                <p className="text-3xl">{title}</p>
                <ChevronRightLink content={t('See More')} link={getLinkByCategory(redirectedTag)}/>
            </div>
            <div className="flex">
                <div className="self-center mr-12 space-y-4 hidden lg:block">
                    <CategoryTagBig tag={tag} className="text-4xl w-max block"/>
                    <PaginationDash total={5}
                                    current={current}
                                    pageSize={1}
                                    className="w-max"
                                    onChange={(currentCursor) => {
                                        setCurrent(currentCursor);
                                        swiper.slideTo(currentCursor - 1);
                                    }}/>
                </div>
                <Swiper
                    slidesPerView={2.5}
                    spaceBetween={30}
                    onSwiper={setSwiper}
                    className="py-4  hidden lg:block cursor-grab"
                    allowTouchMove={true}
                >
                    {posts?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <PostCard post={item} className="w-full h-[25rem]"/>
                        </SwiperSlide>
                    ))}
                </Swiper>


                <Swiper
                    slidesPerView={1.2}
                    spaceBetween={30}
                    allowTouchMove={true}
                    className="py-4  lg:hidden cursor-grab"
                    mousewheel={true}
                >
                    {posts?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <PostCard post={item} className="w-full h-[25rem]"/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
