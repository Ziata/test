import React from 'react';
import Link from 'next/link';
import OverlappingItems, {generateOverlappingImage} from '../OverlappingItems';
import {ChevronRightIcon} from '@heroicons/react/20/solid';

export interface PartnershipProps {
    direction?: 'left' | 'right';
    title: string;
    content: string;
    links: LinkProps[];
    overlappingImages: string[];
    className?: string;
}

interface LinkProps {
    link: string;
    linkTitle: string;
}

export default function Partnership(
    {
        direction = 'left',
        title,
        content,
        links,
        overlappingImages
    }: PartnershipProps
) {

    const text = (
        <div
            className={['md:w-9/12  self-center text-base', direction == 'left' ? 'md:mr-12 mb-8 md:mb-0' : 'md:ml-12 mt-8 md:mt-0'].join(' ')}>
            <div>
                <div dangerouslySetInnerHTML={{__html: content}} className="text-neutral-500 mt-2"></div>
                {links && links.length && links.map((item) => (
                    <Link key={item.link} href={item.link ?? ''}>
                        <a target='_blank' className="hover:text-tcci-orange-o70 block mt-6">{item.linkTitle}
                            <ChevronRightIcon
                                className="w-5 h-5 inline-block" aria-hidden={true}/></a>
                    </Link>
                ))}
            </div>
        </div>
    );
    const image = (direction) => {
        if (direction == 'left') {

            return (
                <div className="w-full h-[18rem] sm:w-[25rem] sm:h-[22rem] relative">
                    <div className="block relative w-2/3 h-2/3 back-item  left-1/3">{
                        generateOverlappingImage(overlappingImages[0])
                    }
                    </div>
                    <div
                        className="block relative w-2/3 h-2/3 front-item -top-1/3  w-2/3 h-2/3 ">{generateOverlappingImage(overlappingImages[1])}</div>
                </div>
            );
        }

        return (

            <div className="w-full h-[18rem] sm:w-[25rem] sm:h-[22rem] relative">
                {<OverlappingItems backItem={generateOverlappingImage(overlappingImages[0])}
                                   frontItem={generateOverlappingImage(overlappingImages[1])}/>}
            </div>
        )
    }

    const left = direction === 'left' ? text : image(direction);
    const right = direction === 'left' ? image(direction) : text;

    return (
        <article data-direction={direction} className={direction == 'left' ? 'mt-8 md:mt-12' : ''}>
            <h1 className="my-8">
                <span className="text-3xl">{title}</span>
            </h1>
            <div className="md:flex justify-around">
                {left}
                {right}
            </div>

        </article>
    );
}
