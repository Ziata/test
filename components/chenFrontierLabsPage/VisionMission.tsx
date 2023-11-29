import OverlappingItems, {generateOverlappingImage} from '../OverlappingItems';
import LinkButton from '../ui/LinkButton';
import {useTranslation} from 'next-i18next';
import ShortArticle from './ShortArticle';

export default function VisionMission(
    {
        content,
        visionAndMission
    }:
        { content: string, visionAndMission: any }
) {
    const {t} = useTranslation('common');

    let mission = visionAndMission?.mission;
    let vision = visionAndMission?.vision;
    let buttonText = visionAndMission?.buttonText;
    return (
        <section className="w-full space-y-8">
            <div className="text-neutral-500 text-center" dangerouslySetInnerHTML={{__html: content}}>
            </div>
            <div className="md:flex justify-around">
                <div
                    className="mx-auto  w-[66vw] h-[44vw] md:w-2/6 md:h-[15rem]  order-2 "
                    // className="mx-auto w-[66vw] h-[44vw] md:w-[30vw] md:h-[20vw] lg:w-[50vw] lg:h-[30vw] xl:w-[45vw] xl:h-[25vw]  max-w-2xl	 max-h-96 order-2"
                >
                    <OverlappingItems backItem={generateOverlappingImage(vision.image.sourceUrl)}
                                      frontItem={generateOverlappingImage(mission.image.sourceUrl)}/>
                </div>
                <ShortArticle
                    className="order-1 w-2/3 mx-auto text-center md:text-left md:w-1/4 self-center p-2"
                    title={vision.title}
                    content={vision.content}
                />
                <ShortArticle
                    className="order-3 w-2/3 mx-auto text-center md:text-left md:w-1/4 self-center p-2"
                    title={mission.title}
                    content={mission.content}
                />
            </div>
            <div className="text-center">
                <LinkButton className={'!mb-0 hover:bg-tcci-purple-o70 transition-all'} themeColor="purple"
                            link="https://ant.chenfrontierlab.com/"
                            blank><span dangerouslySetInnerHTML={{__html:buttonText}}></span></LinkButton>
            </div>
        </section>
    );
}
