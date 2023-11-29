// 首页底部
// import img1 from '../../public/images/homePage/footer_gallery_1.png';
// import img2 from '../../public/images/homePage/footer_gallery_2.jpg';
// import img3 from '../../public/images/homePage/footer_gallery_3.png';
// import {StaticImageData} from 'next/image';
// import {useTranslation} from 'next-i18next';
// import ChevronRightLink from '../ui/ChevronRightLink';
// import Link from 'next/link';
import {gql, useQuery} from "@apollo/client";
import {toUpperLocale} from "../../utils/i18n";
import {useRouter} from "next/router";

function Gallery() {
    const {data, loading} = useQuery(Gallery.query, {variables: {pageLocale: toUpperLocale(useRouter())}});

    let footerInfo = data?.page?.translation?.homePageFields?.footerInfo || []
    const gallery = [
        {
            id: '1',
            // title: t('Cornerstone Partnerships: basic and clinical research into the brain and mind'),
            description: '',
            // description: <Link href={"/cornerstone-partnerships"}>
            //     <a className="hover:text-tcci-orange-o70">
            //         <p className='text-center'>{t('Cornerstone Partnerships2')}</p>
            //         <p className='text-center'>{t('basic and clinical research')}</p>
            //         <p className='text-center'>{t('into the brain and mind')}</p>
            //     </a>
            // </Link>,
            image: '',
            link: '',
            className: 'mb-8 lg:mb-0 w-full lg:w-1/3 lg:hover:w-2/3 text-base  lg:pl-0',
            bgClass: 'left-0 right-0 lg:left-0 lg:right-4',
            imgClass: 'lg:h-[12rem]'
        },
        {
            id: '2',
            // title: t('A billion dollar commitment to help advance brain science'),
            description: '',
            // description: <Link href={"/about"}>
            //     <a className="hover:text-tcci-orange-o70">
            //         <div>
            //             <p className='text-center'>{t('A billion dollar commitment to help')}</p>
            //             <p className='text-center'>{t('advance brain science')}</p>
            //         </div>
            //     </a>
            // </Link>,
            image: '',
            link: '',
            className: 'mb-8 lg:mb-0 w-full lg:basis-2/3 lg:hover:basis-4/5 text-base ',
            bgClass: 'left-0 right-0 lg:left-4 lg:right-4',
            imgClass: 'lg:h-[20rem]'
        },
        {
            id: '3',
            // title: t('Supporting scientists'),
            description: '',
            // description: <div className="text-center flex flex-col items-center">
            //     <p>{t('Supporting scientists')}</p>
            //     <ChevronRightLink className='!m-0' link="/supporting-scientific-meetings-and-conferences"
            //                       content={t('Global conference support')}/>
            //     <ChevronRightLink className='!m-0' link="/chen-frontier-labs" content={t('Chen Frontier Labs')}/>
            //     <ChevronRightLink className='!m-0' link="/education-and-advocacy" content={t('Education & Advocacy')}/>
            // </div>,
            image: '',
            link: '',
            className: 'mb-0 lg:mb-0 w-full  lg:w-1/3 lg:hover:w-1/2 text-base  lg:pr-0',
            bgClass: 'left-0 right-0 lg:left-4 lg:right-0',
            imgClass: 'lg:h-[16rem]'
        }
    ];

    if(!loading){
        // 循环赋值
        for (let i = 0; i < gallery.length; i++) {
            gallery[i].description = footerInfo[i].description.replace(/[\r\n]/g, "");
            gallery[i].image = footerInfo[i].img.sourceUrl
        }
    }

    if (loading) return null;


    return (
        <div className="flex-col lg:flex-row w-full relative flex lg:items-end sm:items-center">
            {gallery?.map((item) => (
                <div key={item.id}
                     className={[
                         "relative inline-block transition-all duration-500 lg:px-4",
                         item.className
                     ].join(' ')}>
                    {/*<Image*/}
                    {/*    src={item.image}*/}
                    {/*    alt="Gallery image"*/}
                    {/*    className={[*/}
                    {/*        "w-full h-[20rem] object-cover",*/}
                    {/*        item.imgClass*/}
                    {/*    ].join(' ')}*/}
                    {/*/>*/}
                    <img className={[
                        "w-full h-[20rem] object-cover",
                        item.imgClass
                    ].join(' ')} src={item.image} alt="Gallery image"/>
                    <div className={[
                        "absolute bottom-0 text-neutral-50  block",
                        item.bgClass
                    ].join(' ')}>
                        <div
                            className="p-2 bg-gradient-to-b from-neutral-500/0 to-neutral-900/70"
                            dangerouslySetInnerHTML={{__html: item.description}}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

Gallery.query = gql`
query getData (
  $pageLocale: LanguageCodeEnum!
){
  page(id: "home-page", idType: URI) {
    translation(language: $pageLocale) {
      homePageFields {
        footerInfo {
          description
          img {
            sourceUrl
          }
        }
      }
    }
  }
}
`

export default Gallery;
