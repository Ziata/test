import Link from 'next/link';
import ZoomInImage from './ui/ZoomInImage';
import {HTMLAttributeAnchorTarget, useState} from 'react';

export interface FigureCardProps {
    className?: string;
    imageClass?: string;
    imgUrl: string;
    name: string;
    titles: string[];
    link: string;
    target?: HTMLAttributeAnchorTarget | undefined;
}

export default function FigureCard({
                                       className = '',
                                       imageClass = '',
                                       imgUrl,
                                       name = '',
                                       titles = [],
                                       link,
                                       target = '_self'
                                   }: FigureCardProps) {
    const [hovered, setHovered] = useState(false);

    const nameLink = <a href={link ?? ''}
                        target={target}
                        className="my-4 text-tcci-blue font-bold cursor-pointer hover:text-tcci-orange-o70">
        {name}
    </a>;
    return (
        <div
            className={[
                'hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-500',
                className
            ].join(' ')}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <ZoomInImage imgUrl={imgUrl} title={name} link={link} target={target} hovered={hovered}
                         className={imageClass}/>
            <article className="p-2">
                {target === '_self'
                    ? <Link href={link ?? ''} passHref>{nameLink}</Link>
                    : nameLink
                }
                {titles.map((item) => (
                    <p key={item} className="text-neutral-500 my-2">{item}</p>
                ))}
            </article>
        </div>
    );
}
