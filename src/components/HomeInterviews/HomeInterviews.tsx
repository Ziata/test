import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import Image from 'next/image'
import shevron from 'static/img/shevron-white.svg'
import { t } from 'i18next'
import { FourthBlock } from '@/services/interface'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrow: false,
  centerMode: true,
  autoplay: true
}

function HomeInterviews({ data }: { data: FourthBlock }) {
  const router = useRouter()

  return (
    <div
      className="w-full py-[70px] overflow-hidden bg-no-repeat bg-cover mt-[65px]"
      style={{
        backgroundImage: `url('${data.fourth_block_background_image.url}')`,
        backgroundPosition: 'center'
      }}
    >
      <div className="container flex justify-between items-center pb-4">
        <div className="font-light text-2xl leading-7 flex items-center text-[#fff] font-Din">{data.title}</div>
        <Link
          href={`/${router.query.lang}/category/people`}
          className="flex items-center leading-0 font-light text-base leading-5 text-[#fff] font-Din group hover:scale-[1.1] transition-all duration-300"
        >
          {t('More')}{' '}
          <Image
            src={shevron}
            className="ml-4 group-hover:rotate-[360deg] transition-all duration-300 group-hover:scale-[2]"
            alt="arrow"
            width="5"
            height="10"
          />
        </Link>
      </div>
      <Slider {...settings}>
        {data.fourthBlockPosts.map(post => (
          <div className="h-[340px] md:h-[500px] px-[5px] md:px-[10px]" key={post.ID}>
            <div
              className="w-full h-full px-[10px] py-[40px] md:p-[30px] flex items-end justify-start relative"
              style={{
                backgroundImage: `url(${post?.thumbnail || '../../static/img/no-image.svg'})`,
                backgroundSize: post.thumbnail ? 'cover' : 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            >
              <div
                style={{ opacity: data.fourth_block_background_image_opacity }}
                className="gradient-background gradient-background-full w-full h-full md:h-1/2 bottom-0 left-0 !absolute"
              />
              <div className="z-1 relative w-full">
                <div className="font-normal text-[18px] md:text-2xl leading-7 flex w-full flex-col-reverse md:flex-row items-center text-white font-Din">
                  <Link
                    href={`/${router.query.lang}/post/${post.post_name}`}
                    className="font-normal text-[18px] md:text-lg leading-0 text-white font-Din flex flex-row justify-center items-center bg-[#0071BC] w-full max-w-[230px] h-[60px] rounded-[50px] mt-[20px] md:mt-0 md:mr-[40px] transition-all duration-300 hover:bg-[#0081DA]"
                  >
                    {post.select_type_video_or_audio === 'Youtube'
                      ? data.fourth_block_button_name_for_video
                      : data.fourth_block_button_name_for_audio}
                  </Link>
                  <span>{post.post_title}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default HomeInterviews
