import bgImage from '../../public/images/newsroomPage/TCCI_SignUp_Newsletter_BG.jpg';
import Image from 'next/future/image'
import LinkButton from '../ui/LinkButton';

export default function SignUpNewsletter({
                                             subscribe
                                         }) {
    return (
        <div className="w-full h-80 flex mb-12">
            <div
                className="bg-black w-full sm:w-1/2 h-full flex flex-wrap justify-around items-center px-4 sm:px-16 py-4">
                <p className="text-white text-2xl" dangerouslySetInnerHTML={{__html: subscribe.title}}></p>
                <p className="text-neutral-50 text-center" dangerouslySetInnerHTML={{__html: subscribe.content}}></p>
                <LinkButton type="link" blank
                            className='hover:bg-tcci-orange-o50'
                            link={subscribe?.link?.url}
                            themeColor="orange" aClass="my-0">{subscribe?.link?.text}</LinkButton>
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
