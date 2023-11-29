import ShortArticle from './ShortArticle';
import {useTranslation} from 'next-i18next';
import Approach from './Approach';
import MApproach from './MApproach';
import {useEffect, useState} from 'react';

let interval = null;

export default function AUniqueApproach(
    {
        aUniqueApproach
    }
) {
    const {t} = useTranslation('common');
    let list = []
    aUniqueApproach?.list?.forEach((item, index) => {
        list.push({
            title: item.title,
            content: item.content,
            showArrow: aUniqueApproach.length - 1 != index ? true : false,
            active: false,
        })
    })

    const [approaches, setApproaches] = useState(
        list
        // [
        // {
        //     title: t('Insight'),
        //     showArrow: true,
        //     active: false,
        // },
        // {
        //     title: t('Identify'),
        //     content: t('promising technologies or protocols that have a chance of being translated into successful commercial endeavors that reach large audiences.'),
        //     showArrow: true,
        //     active: false,
        // },
        // {
        //     title: t('Validate'),
        //     content: t('these technologies or protocols by testing and optimizing their ability to provide value and to ensure their suitability for widespread application.'),
        //     showArrow: true,
        //     active: false,
        // },
        // {
        //     title: t('Incubating'),
        //     content: t('these validated technologies or protocols in our technology incubator so they may continue to flourish and grow.'),
        //     showArrow: true,
        //     active: false,
        // },
        // {
        //     title: t('Incubation'),
        //     showArrow: false,
        //     active: false,
        // },
        // ]
    )
    const [state, setState] = useState({
        activeIndex: 0,
        hover: false
    });


    useEffect(() => {
        let arr = approaches
        if (arr.length == 0) return
        arr.forEach((item) => item.active = false)
        for (let i = 0; i < state.activeIndex + 1; i++) {
            arr[i].active = true
        }
        setApproaches([...arr])
    }, [state]);

    useEffect(() => {
        if (!state.hover) {
            interval = setInterval(() => {
                setState({...state, activeIndex: (state.activeIndex + 1) % 5});
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [state]);


    return (
        <section className="">
            <ShortArticle
                title={aUniqueApproach?.title}
                content={aUniqueApproach?.content}
                className="text-center space-y-8"
            />
            <div
                className="flex justify-between items-center flex-col hidden sm:flex sm:flex-row items-start mt-24 mb-40">
                {approaches.map((item, index) => (
                    <Approach key={item.title}
                              title={item.title}
                              content={item.content}
                              showArrow={item.showArrow}
                              activeIndex={state.activeIndex}
                              isActive={state.activeIndex === index}
                              active={item.active}
                              index={index}
                              onMouseEnter={() => {
                                  clearInterval(interval);
                                  setState({hover: true, activeIndex: index});
                              }}
                              onMouseLeave={() => {
                                  setState({hover: false, activeIndex: index});
                              }}/>
                ))}
            </div>
            <div className="block sm:hidden  mt-24 mb-40">
                {approaches.map((item, index) => (
                    <MApproach key={item.title}
                               title={item.title}
                               content={item.content}
                               showArrow={item.showArrow}
                               activeIndex={state.activeIndex}
                               isActive={state.activeIndex === index}
                               active={item.active}
                               index={index}
                               onMouseEnter={() => {
                                   clearInterval(interval);
                                   setState({hover: true, activeIndex: index});
                               }}
                               onMouseLeave={() => {
                                   setState({hover: false, activeIndex: index});
                               }}/>
                ))}
            </div>
        </section>
    );
}
