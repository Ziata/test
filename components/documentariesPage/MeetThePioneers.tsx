import {useTranslation} from 'next-i18next';
import {Swiper, SwiperSlide} from 'swiper/react';
import Image from 'next/future/image';
import PaginationPrevNextIcon from '../PaginationPrevNextIcon';
import {useState} from 'react';
import Main from '../layout/Main';

export default function MeetThePioneers() {
    const {t} = useTranslation('common');
    const [swiper, setSwiper] = useState(null);
    const slides: {
        id: string;
        image: string;
        quote: string;
        link?: string;
        names: string[];
        titles: string[];
    }[] = [
        {
            id: '1',
            image: '/images/documentariesPage/figures/richardandersen.png',
            quote: t('It takes my breath away every time I see the subject sitting there in his or her wheelchair being able to, just through their thoughts, control robotic limbs or play a virtual piano or type on a virtual keyboard.'),
            link: 'https://www.youtube.com/watch?v=N-N03dZrns0',
            names: [t('Richard A. Andersen, PhD'), t('Caltech')],
            titles: [t('Tianqiao and Chrissy Chen Brain-Machine Interface Center Director and Leadership Chair'), t('James G. Boswell Professor of Neuroscience')]
        },
        {
            id: '2',
            image: '/images/documentariesPage/figures/david.png',
            quote: t('The motivation for inquiry into the brain is twofold. One is to satisfy our innate curiosity about how this complex machine works. The other is to try to gain understanding that will help improve human health and welfare in general.'),
            link: 'https://www.youtube.com/watch?v=b57oiNKErd4',
            names: [t('David Anderson, PhD'), t('Caltech')],
            titles: [t('Director of the Tianqiao and Chrissy Chen Institute for Neuroscience at Caltech')]
        },
        {
            id: '3',
            image: '/images/documentariesPage/figures/diana.png',
            quote: t('The possibilities of understanding and curing disorders, treating psychiatric illness, and then to understand basic science, I think we\'re at the tipping point now. The benefits for everyone will be just enormous.'),
            link: 'https://www.youtube.com/watch?v=Wfk1D7arovI',
            names: [t('Diana Bautista, PhD'), t('University of California, Berkeley')],
            titles: [t('Associate Professor'), t('Department of Molecular & Cell Biology'), t('Helen Wills Neuroscience Institute')]
        },
        {
            id: '4',
            image: '/images/documentariesPage/figures/kari-deisseroth.png',
            quote: t('The human brain is the source of cognition, thought, feeling, emotion, planning. It\'s perhaps the most complicated object in the universe, and we don’t really understand how it does what it does. That\'s what makes it such a wonderful object to study.'),
            names: [t('Karl Deisseroth, MD, PhD'), t('Stanford University')],
            titles: [t('Professor of Bioengineering and of Psychiatry and Behavioral Sciences D.H. Chen Professor')]
        },
        {
            id: '5',
            image: '/images/documentariesPage/figures/michael-e-greenberg.png',
            quote: t('Millions of years of evolution have had [an] impact to make a structure that\'s truly amazing; that endows us with the capacity to engage in art, in learning, in communication, in language - the most amazing abilities.'),
            names: [t('Michael E. Greenberg, PhD'), t('Harvard University')],
            titles: [t('Nathan Marsh Pusey Professor of Neurobiology and Chair of the Department of Neurobiology'), t('Harvard Medical School Co-Director'), t('Harvard Brain Science Initiative'), t('Harvard University')]
        },
        {
            id: '6',
            image: '/images/documentariesPage/figures/sergiu-p-pasca.png',
            quote: t('I actually did not start by being fascinated by neuroscience. Meeting one of my first patients with autism is what really made a difference. Seeing the struggles of the parents and realizing how complex and puzzling this disorder really was, is what drew me towards the brain and brain disorders.'),
            names: [t('Sergiu P. Pasca, MD'), t('Stanford University')],
            titles: [t('Assistant Professor of Psychiatry and Behavioral Sciences')]
        },
        {
            id: '7',
            image: '/images/documentariesPage/figures/laura-roberts.png',
            quote: t('It\'s very exciting to be in the field right now. We\'ve just got such amazingly creative neuroscientists throughout the world and these very different techniques. Instead of inferring what happens in the brain, we can directly query what\'s happening in brain circuits or at the level of the cell that leads to a particular brain disorder.'),
            names: [t('Laura Roberts, MD, MA'), t('Stanford University')],
            titles: [t('Chair of the Department of Psychiatry and Behavioral Sciences'), t('Katharine Dexter McCormick and Stanley McCormick Memorial Professor in the School of Medicine')]
        },
        {
            id: '8',
            image: '/images/documentariesPage/figures/thomas-f-rosenbaum.png',
            quote: t('We have an opportunity now like we\'ve had few times before to move forward at a rapid pace, take full advantage of the skills of more and more young people across the world, and to be able to excite them about contributing to the betterment of the human condition.'),
            names: [t('Thomas F. Rosenbaum, PhD'), t('Caltech')],
            titles: [t('President'), t('Sonja and William Davidow Presidential Chair')]
        },
        {
            id: '9',
            image: '/images/documentariesPage/figures/nigel-shadbolt.png',
            quote: t('I remain incredibly excited by Artificial Intelligence. In some respects, it\'s the most exciting time to be in the field. I think it\'s because we see momentum, a general awareness, levels of funding, levels of actual deployment of real systems, where people can say, that\'s actually AI.'),
            link: 'https://www.youtube.com/watch?v=jGpZWuouQhE',
            names: [t('Sir Nigel Shadbolt, PhD'), t('Jesus College, Oxford University')],
            titles: [t('Principal and Professorial Research Fellow in Computer Science')]
        },
        {
            id: '10',
            image: '/images/documentariesPage/figures/robert-tjian.png',
            quote: t('I remain incredibly excited by Artificial Intelligence. In some respects, it\'s the most exciting time to be in the field. I think it\'s because we see momentum, a general awareness, levels of funding, levels of actual deployment of real systems, where people can say, that\'s actually AI.'),
            names: [t('Robert Tjian, PhD'), t('University of California, Berkeley')],
            titles: [t('Professor of Biochemistry, Biophysics and Structural Biology')]
        },
        {
            id: '11',
            image: '/images/documentariesPage/figures/nolan-williams.png',
            quote: t('Depression is the number one, most disabling condition in the world. Trans-Cranial Stimulation (TMS) allows us to help treatment-resistant patients who don’t normally have treatment options and would allow us to save a lot of lives.'),
            names: [t('Nolan Williams, MD'), t('Stanford University')],
            titles: [t('Clinical Assistant Professor of Psychiatry and Behavioral Sciences')]
        },
        {
            id: '12',
            image: '/images/documentariesPage/figures/liangfu-zhou.png',
            quote: t('We are faced with more than 500 kinds of brain disease which are not yet resolved such as mental illness, cerebrovascular disease, tumors and trauma. I have performed more than 10,000 surgeries, studied brain and cortex function. Neuroscience is critical to the future development of mankind.'),
            link: 'https://www.youtube.com/watch?v=aduvIuPmS4A',
            names: [t('Liangfu Zhou, MD, PhD'), t('Huashan Hospital, Fundan University')],
            titles: [t('Vice Chairman of Tianqiao and Chrissy Chen Institute (Shanghai)'), t('Director Department of Neurosurgery')]
        },
    ];
    return (
        <div className="bg-tcci-black text-white py-24 font-Iowan">
            <Main className="space-y-6 mx-auto">
                <h2 className="text-center font-bold text-3xl md:text-5xl">{t('Meet the pioneers')}</h2>
                <p
                    className="text-center text-lg">{t('These world-leading scientists are advancing brain research around the world.')}
                </p>
                <Swiper
                    autoHeight={true}
                    onSwiper={setSwiper}
                    loop>
                    {slides.map((item) => <SwiperSlide key={item.id}>
                        <div className="h-full md:h-[41rem] flex md:flex-row flex-col mx-auto">
                            <div className="relative w-full h-[30rem] md:h-full md:w-[20rem] lg:w-[27rem] shrink-0  block grow">
                                <Image src={item.image}
                                       alt={item.names[0]}
                                       className="object-cover"
                                       fill/>
                            </div>
                            <div className="space-y-7 p-10 bg-black">
                                <p className="text-xl">{item.quote}</p>
                                {item.link ?
                                    <a rel="noreferrer" target="_blank" href={item.link ?? ''}
                                       className="underline text-xl block">{t('Watch the clip')}</a> :
                                    <div className="h-4"></div>}
                                <div className="divide-x flex flex-col md:flex-row text-lg">
                                    <div className="pr-8 pb-4 md:pb-0">{item.names.map((name, index) => <p
                                        key={index}>{name}</p>)}</div>
                                    <div className="pl-4 md:pl-8">{item.titles.map((title, index) => <p
                                        key={index}>{title}</p>)}</div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)}
                </Swiper>
                <div className="space-x-6 flex justify-end text-base">
                    <PaginationPrevNextIcon type="prev" onClick={() => {
                        swiper.slidePrev()
                    }} className="text-black"/>
                    <PaginationPrevNextIcon type="next" onClick={() => {
                        swiper.slideNext()
                    }} className="text-black"/>
                </div>
            </Main>
        </div>
    );
}
