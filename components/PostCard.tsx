import ZoomInImage from './ui/ZoomInImage';
import Link from 'next/link';
import {useTranslation} from 'next-i18next';
import {PostInfoProp} from './PostCardSmall';
import React, {useState} from 'react';
import ChevronRightLink from './ui/ChevronRightLink';
import FormattedDate from './ui/FormattedDate';
import CategoryTag from './CategoryTag';

export interface PostCardProp extends PostInfoProp {
    excerpt?: string;
    location?: string;
    reportLinks?: string[];
}

export interface PostCardProps {
    post: PostCardProp;
    className?: string;
    showImage?: boolean;
    showReadLink?: boolean;
    showExcerpt?: boolean;
}

export const isMeetingReport: (category: string) => boolean
    = (category) => (category === 'meeting-reports' || category === 'meeting-reports-zh');

export const isNewsletter = (category: string): boolean => (
    /past-newsletter/.test(category)
);

export const isAnnualReport = (category: string): boolean => (
    /annual-report/.test(category)
);

export const judgeCategoryType = (category: string): {
    isMR: boolean;
    isNL: boolean;
    isAR: boolean;
    isBlankPost: boolean;
} => {
    const isMR = isMeetingReport(category);
    const isNL = isNewsletter(category);
    const isAR = isAnnualReport(category);
    const isBlankPost = (isMR || isNL || isAR);
    return {
        isMR,
        isNL,
        isAR,
        isBlankPost
    }
}

export const getReadLinkText = (
    isMR: boolean,
    isNL: boolean,
    isAR: boolean,
    reportLinks: string[],
    index: number,
    t
): string => {
    if (isMR) {
        return t('Read the Report') + (reportLinks.length > 1 ? ` #${index + 1}` : '')
    }
    if (isNL) {
        return t('Read the Newsletter');
    }
    if (isAR) {
        return t('Read the Annual Report');
    }
    return '';
};

export const getPostLink = (post: PostCardProp, isBlankPost: boolean): string => {
    // const firstReadLink = post?.reportLinks?.length ? post.reportLinks[0] : '';
    // return isBlankPost ? firstReadLink : post.link;
    return post.link;
}

function PostCard({
                      post,
                      className = '',
                      showImage = true,
                      showReadLink = true,
                      showExcerpt = true
                  }: PostCardProps) {
    const {t} = useTranslation('common');
    const [hovered, setHovered] = useState(false);

    const {
        isMR,
        isNL,
        isAR,
        isBlankPost
    } = judgeCategoryType(post.category)

    const target = isBlankPost ? '_blank' : '_self';
    const link = getPostLink(post, isBlankPost);

    return (
        <div
            className={[
                'text-tcci-blue relative bg-white h-auto min-h-fit p-4 w-full hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-500',
                'flex flex-wrap justify-between',
                isMR ? 'border-b-2 border-tcci-orange-o70 border-solid' : '',
                className
            ].join(' ')}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <div className="w-full">
                {showImage && <ZoomInImage
									link={link ?? ''}
									imgUrl={post.image}
									title={post.title}
									className="h-36 mb-4"
									imageClass="!object-center"
									hovered={hovered}
									target={target}
								/>}
                <div>
                    <div className={["text-xl mb-2 line-clamp-1"].join(' ')}>
                        <CategoryTag tag={post.category}
                                     className={'text-[#8fa0ab]'}
                                     defaultColor={'text-[#8fa0ab] hover:text-tcci-blue'}
                        />
                    </div>
                    <div className="font-bold text-2xl line-clamp-3 mb-2 photo-view-title">
                        <Link href={link ?? ''} passHref>
                            <a target={target}>{post.title}</a>
                        </Link>
                    </div>
                    <div className="font-light">
                        <FormattedDate className={'text-[#8fa0ab]'} dates={post.date}/>
                    </div>
                </div>
            </div>
            <div className="self-end">
                {showExcerpt && post.excerpt && post.excerpt.length > 0 &&
									<div className="mt-2 line-clamp-5 text-neutral-500"
									     dangerouslySetInnerHTML={{__html: post.excerpt}}></div>}
                {showReadLink && post.reportLinks && <div className="mt-2 flex flex-col">
                    {post.reportLinks.map((item, index) => (
                        <ChevronRightLink
                            key={index}
                            link={item}
                            target="_blank"
                            content={getReadLinkText(isMR, isNL, isAR, post.reportLinks, index, t)}
                            className="text-lg"
                        />))
                    }
								</div>}
            </div>
        </div>
    );

}

export default PostCard;
