import CircleWithTitle from './CircleWithTitle';
import Main from '../layout/Main';
import {useTranslation} from 'next-i18next';
import SwiperCardCircles from './SwiperCardCircles';
import {useState} from 'react';
import Script from "next/script";

export default function FourCircles() {
    const {t} = useTranslation('common');
    const [modalActive, setModalActive] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const clickHandler = (index) => {
        setActiveIndex(index);
        setModalActive(true);
    };
    return (
        <div className="relative font-Iowan">
            <div className={[
                'h-content bg-[url(/images/documentariesPage/spirit-of-discovery-brain.png)] bg-no-repeat bg-tcci-black bg-fixed py-16 bg-center',
                'before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-y-halation',
            ].join(' ')}>
                <Main className="relative md:h-[40rem] js-dot-icon-wrapper clearfix		">
                    <CircleWithTitle index={0}
                                     className={[
                                         "md:absolute md:top-[10.5%] md:left-[10%]",

                                     ].join(' ')}

                                     title={t('Fundamental Research')}
                                     onClick={() => clickHandler(1)}/>
                    <CircleWithTitle index={1}
                                     className={[
                                         "md:absolute md:top-[3.5%] md:right-[27%]",
                                         "float-right md:float-none clearfix		"
                                     ].join(' ')}

                                     title={t('Young Scientists')}
                                     onClick={() => clickHandler(2)}/>
                    <CircleWithTitle index={2}
                                     className={[
                                         "md:absolute md:bottom-[6%] md:left-[28%]",
                                     ].join(' ')}

                                     title={t('Technology & Applications')}
                                     onClick={() => clickHandler(4)}/>
                    <CircleWithTitle index={3}
                                     className={[
                                         "md:absolute md:bottom-[18%] md:right-[11%]",
                                         "float-right md:float-none clearfix		"
                                     ].join(' ')}


                                     title={t('Medical Science')}
                                     onClick={() => clickHandler(3)}/>
                </Main>
            </div>
            <SwiperCardCircles active={modalActive} activeIndex={activeIndex} onEscape={() => setModalActive(false)}
                               onClick={() => setModalActive(false)}/>


            {/* 主要是圆点动画 迁移之前TCCI官网代码 融合jquer CustomEase.min TweenMax.min base.js*/}
            <Script type="text/javascript" src="/js/FourCircles.js"/>
            <div style={{height:'1px'}}></div>
        </div>
    );
}
