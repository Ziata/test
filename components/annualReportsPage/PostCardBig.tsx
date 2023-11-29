import Image from 'next/future/image';
import Link from 'next/link';
import FormattedDate from '../ui/FormattedDate';
import CategoryTag from '../CategoryTag';
import React from 'react';
import {PostInfoProp} from '../PostCardSmall';
import ChevronRightLink from '../ui/ChevronRightLink';
import {useTranslation} from 'next-i18next';
import {getPostLink, getReadLinkText, judgeCategoryType} from '../PostCard';

export interface PostCardProp extends PostInfoProp {
    reportLinks?: string[];
}

interface PostCardBigProps {
    post: PostCardProp;
    className?: string;
    showTag?: boolean;
    readLinkTitle?: string;
    showReadLink?: boolean;
    showDate?: boolean;
}

export default function PostCardBig({
                                        post,
                                        className = '',
                                        showTag = true,
                                        showReadLink = true,
                                        showDate = true
                                    }: PostCardBigProps) {
    const {t} = useTranslation('common');
    const {
        isMR,
        isNL,
        isAR,
        isBlankPost
    } = judgeCategoryType(post.category);

    const target = isBlankPost ? '_blank' : '_self';
    const link = getPostLink(post, isBlankPost);

    return (
        <div
            className={[isMR ? 'border-2 border-b-tcci-orange border-solid' : '', className].join(' ')}
        >
            <div className={["h-full w-full"].join(' ')}>
                <div className="w-full h-full relative">
                    <Image
                        src={post.image ?? ''}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0">
                        <div className="p-8 bg-gradient-to-b from-white/0 to-black/90 text-xl">
                            {showTag && <CategoryTag tag={post.category} defaultColor="text-white/90"/>}
                            <div className="font-normal	 text-lg	 line-clamp-1 text-white">
                                <Link href={link ?? ''} passHref><a target={target}>{post.title}</a></Link>
                            </div>
                            {showDate && <div className="font-light text-white/90 text-base">
															<FormattedDate dates={post.date}/>
														</div>}
                            {showReadLink && post.reportLinks && <div className="text-white mt-2 space-x-4">
                                {post.reportLinks.map((item, index) => (
                                    <ChevronRightLink
                                        key={index}
                                        link={item}
                                        target="_blank"
                                        content={getReadLinkText(isMR, isNL, isAR, post.reportLinks, index, t)}
                                        className="text-base font-extralight"
                                    />))
                                }
														</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
