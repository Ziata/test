import bgImage from '../../public/images/newsroomPage/TCCI_SignUp_Newsletter_BG.jpg';
import Image from 'next/future/image'
import {useTranslation} from 'next-i18next';
import LinkButton from '../ui/LinkButton';

export default function SignUpNewsletter() {
    const {t} = useTranslation('common');
    return (
        <div className="w-full h-80 flex mb-12">
            <div className="bg-black w-full sm:w-1/2 h-full flex flex-wrap justify-around items-center px-4 sm:px-16 py-4">
                <p className="text-white text-2xl">{t('Sign up for our newsletter')}</p>
                <p className="text-neutral-50 text-center">{t('Enter your email to receive the latest news and updates from Tianqiao and Chrissy Chen Institute News')}</p>
                <LinkButton type="link" blank
                            link="https://shanda.us17.list-manage.com/subscribe?u=52012dde9962674edda12541c&id=d582baebcb"
                            themeColor="orange" aClass="my-0">{t('Subscribe')}</LinkButton>
            </div>
            <div className="hidden sm:block w-1/2 h-full relative">
                <Image
                    src={bgImage ?? ''}
                    alt="Sign up newsletter"
                    fill
                />
            </div>
        </div>
    );
}
