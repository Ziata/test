import Image from 'next/future/image';
import investigatorBg from '../../public/images/chenFrontierLabsPage/investigator_bg.png';
import investigatorIcon from '../../public/images/chenFrontierLabsPage/investigator_icon.png';
import {useTranslation} from 'next-i18next';
import ContactUs from './ContactUs';

export default function Investigator(props) {
    const {t} = useTranslation('common');
    return (
        <div className="relative w-full flex justify-around flex-col lg:flex-row">
            <div className="absolute w-full h-full lg:clip-top-bottom self-center">
                <Image
                    src={investigatorBg}
                    alt="investigator background"
                    fill
                    className="object-cover brightness-75"
                />
            </div>
            <div className="lg:max-w-lg lg:pt-0 flex flex-col justify-center pt-16 mx-auto lg:mx-0 px-4 sm:px-6 lg:px-8 z-10">
                <div className="relative w-72 h-16 lg:w-96 lg:h-20">
                    <Image
                        src={investigatorIcon}
                        alt="investigator icon"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="text-neutral-50 mt-8 text-sm"
                     dangerouslySetInnerHTML={{
                         __html:props.bottomIntroduction
                     }}
                >
                </div>
            </div>
            <ContactUs {...props} className="lg:mx-4 px-4 sm:px-6 z-10"/>
        </div>
    );
}
