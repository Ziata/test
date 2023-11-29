import Link from 'next/link';
import Image from 'next/future/image';
import {HTMLAttributeAnchorTarget} from 'react';

interface ZoomInImageProps {
    link: string;
    imgUrl: string;
    title?: string;
    className?: string;
    imageClass?: string;
    target?: HTMLAttributeAnchorTarget | undefined
    hovered?: boolean
}

export default function ZoomInImage({
                                        link,
                                        imgUrl,
                                        title = 'image',
                                        className = '',
                                        imageClass = '',
                                        target = "_self",
                                        hovered = false
                                    }: ZoomInImageProps) {
    return (
        <figure className={["relative w-full h-64 overflow-hidden", className].join(' ')}>
            <Link href={link ?? ''} passHref>
                <a target={target}>
                    <Image
                        src={imgUrl ?? ''}
                        alt={title}
                        fill
                        className={[
                            "object-cover object-top cursor-pointer hover:scale-110 transition-all duration-500",
                            hovered ? 'scale-110' : 'scale-100',
                            imageClass
                        ].join(' ')}
                    />
                </a>
            </Link>
        </figure>
    );
}
