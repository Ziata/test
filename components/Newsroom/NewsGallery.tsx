import {Swiper, SwiperSlide} from 'swiper/react';
import PaginationDash from '../PaginationDash';
import {gql} from '@apollo/client';
import PostCardBig, {PostCardProp} from '../PostCardBig';
import {useState} from 'react';
import {serverDateStringToLocalDate} from '../../utils/date';
import LinkPath from "../../utils/LinkPath"

export default function NewsGallery(
    {
        featuredTitle,
        recommendNews
    }
) {


    const posts: PostCardProp[] = recommendNews?.map((item) => ({
        id: item?.recommendNew?.id,
        image: item?.recommendNew?.featuredImage?.node?.sourceUrl,
        category: item?.recommendNew?.categories?.edges[0]?.node?.slug,
        title: item?.recommendNew?.title,
        date: item?.recommendNew?.date && serverDateStringToLocalDate(item.recommendNew.date),
        link: `${LinkPath.news}${item?.recommendNew?.slug}`,
        reportLinks: item?.recommendNew?.meetingReport?.reportLinks?.map((item) => item?.link)
    }));
    const total: number = posts?.length;
    const [current, setCurrent] = useState(1);
    const [swiper, setSwiper] = useState(null);


    return (
        <div>
            <div className="flex justify-between mb-8">
                <h1><span className="text-3xl text-tcci-blue" dangerouslySetInnerHTML={{__html: featuredTitle}}></span>
                </h1>
                <PaginationDash current={current}
                                className="self-center hidden md:block"
                                total={total}
                                pageSize={1}
                                onChange={(currentCursor) => {
                                    setCurrent(currentCursor);
                                    swiper.slideTo(currentCursor - 1);
                                }}/>
            </div>
            <Swiper
                slidesPerView={1.5}
                spaceBetween={30}
                onSwiper={setSwiper}
                allowTouchMove={true}
                className='cursor-grab'
            >
                {posts?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <PostCardBig post={item} className="w-full h-[25rem]"/>
                    </SwiperSlide>
                ))}
            </Swiper>

            <PaginationDash current={current}
                            className="flex justify-center mt-8 block md:hidden"
                            total={total}
                            pageSize={1}
                            onChange={(currentCursor) => {
                                setCurrent(currentCursor);
                                swiper.slideTo(currentCursor - 1);
                            }}/>
        </div>
    );
}

NewsGallery.query = gql`
query getNewsroomData($pageLocale: LanguageCodeEnum!) {
  page(id: "newsroom", idType: URI) {
    translation(language: $pageLocale) {
      title
      newsroomPage {
        recommendNews {
          recommendNew {
            ... on Post {
              slug
              id
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                }
              }
              categories {
                edges {
                  node {
                    slug
                  }
                }
              }
              title(format: RENDERED)
              date
              meetingReport {
                reportLinks {
                  link
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
