import FormattedDate from '../ui/FormattedDate';
import Link from 'next/link';
import LinkedInIcon from '../icons/LinkedInIcon';
import TwitterIcon from '../icons/TwitterIcon';
import {SocialProps} from '../Footer';
import {className} from 'postcss-selector-parser';
import CategoryTag from '../CategoryTag';
import {Category} from '../../utils/category';

interface ArticleInfoProps {
    dates: Date | Date[];
    tag: Category;
    className?: string;
    title?: string;
    url?: string;
    locale?: string;
}

export default function ArticleInfo({
                                        dates,
                                        title,
                                        url,
                                        tag,
                                        locale
                                    }: ArticleInfoProps) {

    const iconClass: string = "w-5 h-5 fill-tcci-blue hover:fill-tcci-orange-o70";

    const socialIcons: SocialProps[] = [
        {
            id: '1',
            icon: <LinkedInIcon className={iconClass}/>,
            link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
        },
        {
            id: '2',
            icon: <TwitterIcon className={iconClass}/>,
            link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        },
        // {
        //   id: '3',
        //   icon: <WeChatIcon className={iconClass}/>,
        //   link: ''
        // }
    ];

    return (
        <ul className={["flex md:space-x-4 none-list-style flex-wrap md:flex-nowrap", className].join(' ')}>
            <li className='w-full md:w-auto'>
                <FormattedDate dates={dates}/>
            </li>
            <li className='ml-0 mt-4 mr-4 md:m-0'>
                <CategoryTag locale={locale} tag={tag} defaultColor="text-tcci-blue" highlightColor="text-tcci-blue"
                             className="font-normal"/>
            </li>
            {socialIcons.map((item) => (
                <li className='mt-4 mr-4 md:m-0' key={item.id}>
                    <Link href={item.link ?? ''} passHref>
                        <a target="_blank">{item.icon}</a>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
