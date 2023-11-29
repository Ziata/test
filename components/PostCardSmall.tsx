import type {Category} from 'utils/category';
import Image from 'next/future/image';
import Link from 'next/link';
import {ChevronRightIcon} from '@heroicons/react/20/solid/';
import FormattedDate from './ui/FormattedDate';
import CategoryTag from './CategoryTag';
import {useState} from 'react';
import {isAnnualReport, isMeetingReport, isNewsletter} from './PostCard';

export interface PostInfoProp {
    id: string;
    image: string;
    category: Category;
    title: string;
    date: Date | Date[];
    link: string;
    reportLinks?: string[];
}

interface PostCardSmallProps {
    post: PostInfoProp;
}

function PostCardSmall({
                           post
                       }: PostCardSmallProps) {
    const [hovered, setHovered] = useState(false);

    const isMR = isMeetingReport(post.category);
    const isNL = isNewsletter(post.category);
    const isAR = isAnnualReport(post.category);
    const target = (isMR || isNL || isAR) ? '_blank' : '_self';

    const firstReportLink = post?.reportLinks?.length > 0 ? post.reportLinks[0] : 'javascript:void(0);';
    const link = isMR ? firstReportLink : post.link;

    return (
        <li
            className="border-b border-solid border-neutral-300 h-auto min-h-fit p-2 pr-0 w-full flex items-center text-tcci-blue hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-500"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden">
                <div className={["h-full w-full transition-all duration-500", hovered ? 'scale-125' : ''].join(' ')}>
                    <Link href={link ?? ''} passHref>
                        <a target={target}>
                            <div className="w-full h-full relative">
                                <Image
                                    src={post.image ?? ''}
                                    alt={post.title}
                                    fill
                                    className="object-cover cursor-pointer"
                                />
                            </div>
                        </a>
                    </Link>
                </div>
            </div>

            <div className="pl-4 grow">
                <div>
                    <CategoryTag tag={post.category}
                                 className={'text-[#8fa0ab]'}
                                 defaultColor={'text-[#8fa0ab] hover:text-tcci-blue'}
                    />
                </div>
                <div className="font-bold h-12 line-clamp-2">
                    <Link href={link ?? ''} passHref><a target={target}>{post.title}</a></Link>
                </div>
                <div className="font-light">
                    <FormattedDate className={'text-[#8fa0ab]'} dates={post.date}/>
                </div>
            </div>
            <div className={["ml-4", hovered ? 'text-tcci-orange-o70' : ''].join(' ')}>
                <Link href={link ?? ''} passHref>
                    <a target={target}><ChevronRightIcon className="w-5 h-5" aria-hidden={true}/></a>
                </Link>
            </div>
        </li>
    );

}

export default PostCardSmall;
