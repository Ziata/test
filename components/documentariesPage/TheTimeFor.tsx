import Image from 'next/future/image';
import eyeImage from '../../public/images/documentariesPage/eye.png';
import brainImage from '../../public/images/documentariesPage/brain.png';
import Main from '../layout/Main';
import {useTranslation} from 'next-i18next';
import NumberSwiper from './NumberSwiper';
import Rellax from 'rellax';
import {useEffect} from 'react';

export default function TheTimeFor(props) {
    let locale = props.locale

    const {t} = useTranslation('common');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const rellax = new Rellax('.rellax');
        }
    }, []);
    return (
        <div className="wrapper py-24 relative text-white overflow-hidden font-Iowan">
            <div className="bg-[#1a1a1a] absolute top-0 left-0 right-0 bottom-0 -z-10"
            ></div>
            <Image src="/images/documentariesPage/iris.png"
                   alt="iris"
                   data-rellax-speed='-4'
                   width={900}
                   height={900}
                   className="rellax absolute -right-80 -top-[25rem]"/>
            <Main className='md:px-4'>

                <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-1/2 px-6">
                        <Image src={brainImage}
                               alt="brain"
                               className="absolute top-[70%] left-[30%]"
                               width={286}
                               height={267}/>
                        <Image src={eyeImage}
                               alt="eye"
                               className="relative"
                               width={326}
                               height={416}/>
                    </div>
                    <div className="w-full md:w-1/2 pt-56 md:pt-0 px-0 md:px-6 relative space-y-6 text-lg">
                        <h2 className="font-bold text-white text-3xl md:text-5xl">{t('The time for neuroscience is now')}</h2>
                        <p
                            className="font-bold">{t('We are on the brink of unlocking the potential of the human mind and creating a better world.')}</p>

                        {
                            locale != 'zh' && (
                                <>
                                    <p>{t('This film explores how close we are to major breakthroughs that will lead to curing disease, augmenting the brain and helping humanity.')}</p>
                                    <p>{t('We need to act now to realize this potential.  It is only by increasing support for young scientists and fundamental brain research that we can take this important step.')}</p>
                                </>
                            )
                        }
                        <p>
                            <a target="_blank"
                               rel="noreferrer"
                               href="https://admin.cheninstitute.org/wp-content/uploads/2019/03/cheninstitute_mindswideopen_infographic_english_v41.pdf?x60019"
                               className="underline hover:text-tcci-orange-o70">{t('Download our infographic')} </a>
                            {t('to find out more.')}
                        </p>
                    </div>
                </div>

                <NumberSwiper className="mt-[12rem] py-8"/>
                <div className="max-w-[18rem] space-y-6">
                    <h2 className="font-bold text-3xl md:text-5xl">{t('The spirit of discovery')}</h2>
                    <p>{t('We are on the brink of a number of exciting breakthroughs – discover below what\'s needed to advance the science and unlock the secrets of the human mind.')}</p>
                </div>
            </Main>
        </div>
    );
}
