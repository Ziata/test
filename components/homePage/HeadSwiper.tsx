// 首页轮播
import React, {useEffect} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade, Pagination, Parallax} from 'swiper';
import {PaginationOptions} from 'swiper/types';
import 'swiper/css';
import "swiper/css/effect-fade";
import 'swiper/css/pagination';
import {useTranslation} from 'next-i18next';
import Link from 'next/link';
import OverlappingItems, {generateOverlappingImage} from '../OverlappingItems';
import {ChevronRightIcon} from '@heroicons/react/20/solid';
import LinkButton from '../ui/LinkButton';
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


interface HeadSwiperProps {
    backgroundVideo: string;
    title: string;
    mainLink: string;
    overlappingImages: string[];
    subtitle: string;
    subLink: string;
    poster: string;
    index: number;
    description: string
    target: boolean
    subTarget: string
    mainLinkTitle: string
    subLinkTitle: string
}

let player = {}

function HeadSwiper({homePageHeadSlider = []}): JSX.Element {
    const {t} = useTranslation('common');

    const currentSlide: HeadSwiperProps[] = homePageHeadSlider?.filter((item) => Object.keys(item).length > 0)?.map((item, index) => ({
        backgroundVideo: item?.backgroundVideo,
        title: item?.title,
        mainLink: item?.mainLink?.url,
        mainLinkTitle: item?.mainLink?.title,
        target: item?.mainLink?.target == '_blank' ? true : false,
        overlappingImages: item?.overlappingImages?.map((img) => img?.sourceUrl),
        subtitle: item?.subtitle,
        poster: item?.poster?.sourceUrl,
        subLink: item?.subLink?.url,
        subLinkTitle: item?.subLink?.Title,
        subTarget: item?.subLink?.target == '_blank' ? '_blank' : '_self',
        index,
        description: item?.description
    }));

    const slides = currentSlide



    useEffect(() => {
        slides.forEach((item) => {
            let id = `video-play-${item.index}`
            player[id] = new Player({
                id,
                url: item.backgroundVideo,
                poster: item.poster,
                autoplay: true,
                autoplayMuted: true,
                loop: true,
                playsinline: true,
                videoFillMode: 'cover',
                height: '100%',
                width: '100%',
                controls: false,
                ignores: ['fullscreen', 'volume', 'start', 'progress', 'pip', 'play', 'replay', 'rotate', 'screenshot', 'time', 'loading', 'download', 'definition', 'error'],
            });
        })


    }, []);


    const pagination: PaginationOptions = {
        clickable: true,
        renderBullet: function (index, className) {
            return `<div class="${className}"></div>`;
        },
        bulletClass: 'w-4 h-4 rounded-full mr-10 my-3 bg-white/50 mr-10 my-3 hover:bg-white/70 transition-all duration-500',
        bulletActiveClass: 'bg-white/90'
    };


    return (
        <div className="min-h-screen">

            {slides && <Swiper
							initialSlide={getRandomInt(0, slides.length - 1)}
							pagination={pagination}
							modules={[Pagination, Autoplay, Parallax, EffectFade]}
							className="w-full h-screen moblie-min-height"
							direction="vertical"
							effect={"fade"}
							speed={1500}
                // loop={true}
							autoplay={{
                  delay: 20000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                  waitForTransition: true
              }}
							parallax={true}
							allowTouchMove={false}
						>
                {slides?.map(({
                                  backgroundVideo,
                                  title,
                                  mainLink,
                                  mainLinkTitle,
                                  subLinkTitle,
                                  overlappingImages,
                                  subtitle,
                                  subLink,
                                  poster,
                                  target,
                                  subTarget,
                                  index,
                                  description
                              }: HeadSwiperProps, i: number) => {
                    return (
                        <SwiperSlide key={i} className="relative h-full bg-white moblie-min-height">
                            <div className="relative w-full h-full">
                                {/*<video
                                    style={{left: '99999px'}}
                                    data-src={backgroundVideo}
                                    tabIndex={-1}
                                    playsInline
                                    autoPlay
                                    muted
                                    loop
                                    poster={poster}
                                    preload="metadata"
                                    className={["lazyload bg-black/50 absolute w-full h-4/5 -z-10 object-cover brightness-50", `video-play-${index}`].join(' ')}
                                >
                                </video>*/}
                                <div id={`video-play-${index}`}
                                     data-src={backgroundVideo}
                                     data-poster={poster}
                                     style={{
                                         backgroundImage: `url(${poster})`,
                                         backgroundSize: 'cover',
                                         backgroundPosition: 'center',
                                     }}
                                     className="home-video-wrap !bg-black/50 !absolute !w-full !h-4/5 !-z-10 !object-cover !brightness-50"></div>

                                <div
                                    className="absolute w-full h-[81%] bottom-1/5 bg-gradient-to-b from-white/0 via-white/0 to-white -z-10"
                                    style={{top: '-0.9%'}}></div>
                                <div
                                    className="max-w-7xl w-4/5 sm:w-3/5 sm:max-w-xl text-center mx-auto h-2/3 flex flex-col justify-center"
                                >
                                    <h1 className="text-neutral-50 text-xl sm:text-4xl"
                                        dangerouslySetInnerHTML={{__html: title}}></h1>
                                    <LinkButton type="link" blank={target} link={mainLink}
                                                className="self-center hover:bg-tcci-orange-o50 transition-all	">{mainLinkTitle||t('Read more')}</LinkButton>
                                </div>
                                <div className="absolute bottom-16 w-full flex justify-center flex-col sm:flex-row"
                                >
                                    <div className="w-full sm:w-1/2 self-center">
                                        <div
                                            className="w-[14rem] h-[14rem] hsm:w-[14rem] hsm:h-[14rem] sm:w-[18rem] sm:h-[18rem] lg:w-[22rem] lg:h-[22rem] mx-auto sm:ml-auto sm:mr-0">
                                            {<OverlappingItems backItem={generateOverlappingImage(overlappingImages[0])}
                                                               frontItem={generateOverlappingImage(overlappingImages[1])}/>}
                                        </div>
                                    </div>
                                    <div
                                        className="pt-4 sm:pt-0 text-center text-tcci-blue w-full sm:w-1/2 self-center">
                                        <div
                                            className="w-full px-4 sm:px-0 sm:w-2/3 sm:max-w-lg mx-auto sm:ml-10 mr-auto">
                                            <h1 className="text-xl sm:text-4xl text-shadow capitalize"
                                                data-title={subtitle}>{subtitle}
                                            </h1>
                                            <p className="text-neutral-500 mt-2 sm:mt-4"
                                               dangerouslySetInnerHTML={{__html: description}}></p>
                                            <div className="mt-2 sm:mt-4">
                                                <Link  href={subLink ?? ''}>
                                                    <a target={subTarget} className="hover:text-tcci-orange-o70">{subLinkTitle||t('Learn more')}
                                                        <ChevronRightIcon
                                                            className="w-5 h-5 inline-block" aria-hidden={true}/></a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
						</Swiper>}
        </div>
    )
        ;
}

// HeadSwiper.query = gql`
// query getData (
//   $pageLocale: LanguageCodeEnum!
// ){
//   page(id: "home-page", idType: URI) {
//     translation(language: $pageLocale) {
//       homePageFields {
//         homePageHeadSlider {
//           backgroundVideo
//           title
//           overlappingImages{
//             sourceUrl(size:MEDIUM_LARGE)
//           }
//           subtitle
//           description
//           mainLink {
//             url
//           }
//           subLink {
//             url
//           }
//         }
//       }
//     }
//   }
// }
// `;

export default HeadSwiper;
export type {HeadSwiperProps};
