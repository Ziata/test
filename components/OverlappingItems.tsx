import React from 'react';
import Image from 'next/future/image';
import BlurImage from '../public/images/blur.png'

export interface OverlappingItemsProps {
    backItem: JSX.Element;
    frontItem: JSX.Element;
    direction?: 'bottom-right' | 'bottom-left';
    backClassName?: string;
    frontClassName?: string;
    percentage?: '1/3' | '1/4';
}

export const generateOverlappingImage: (string) => JSX.Element = (imageUrl) => (
    imageUrl && <Image
			fill
			src={imageUrl ?? BlurImage}
			alt="Overlapping Image"
			className="w-full h-full object-cover bg-center"
		/>
);

export default function OverlappingItems({
                                             backItem,
                                             frontItem,
                                             direction = 'bottom-right',
                                             backClassName,
                                             frontClassName,
                                             percentage = '1/3'
                                         }: OverlappingItemsProps): JSX.Element {
    let backClass = '';
    let frontClass = '';
    switch (direction) {
        case 'bottom-right':
            if (percentage === '1/3') {
                frontClass = '-top-1/3 left-1/3 w-2/3 h-2/3';
            } else {
                frontClass = '-top-1/4 left-1/4 w-2/3 h-2/3';
            }
            break;
        case 'bottom-left':
            if (percentage === '1/3') {
                backClass = 'left-1/3 w-2/3 h-2/3';
                frontClass = '-top-1/4 w-2/3 h-2/3';
            } else {
                backClass = 'left-1/2 w-2/3 h-2/3';
                frontClass = '-top-1/4 w-2/3 h-2/3';
            }
            break;
        default:
            break;
    }

    return (
        <>
            <div className={['block relative w-2/3 h-2/3 back-item', backClass, backClassName].join(' ')}>
                {backItem}
            </div>
            <div className={['block relative w-2/3 h-2/3 front-item', frontClass, frontClassName].join(' ')}>
                {frontItem}
            </div>
        </>
    );
}
