import Link from 'next/link';
import ZoomInImage from './ui/ZoomInImage';
import {useState} from 'react';

export interface OrganizationProps {
    className?: string;
    imageClass?: string;
    imgUrl: string;
    title: string;
    link: string;
}

export default function OrganizationCard({
                                             className = '',
                                             imageClass = '',
                                             imgUrl,
                                             title = '',
                                             link
                                         }: OrganizationProps) {
    const target = '_blank';
    const [hovered, setHovered] = useState(false);
    return (
        <div className={[className].join(' ')}
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}>
            <ZoomInImage
                imgUrl={imgUrl}
                title={title}
                link={link}
                target={target}
                className={["border border-[#e7e7e7] border-solid", imageClass].join(' ')}
                imageClass="!object-center"
                hovered={hovered}
            />
            <article className="my-4 text-center">
                <Link href={link ?? ''} passHref>
                    <a target={target}
                       className={[
                           "text-lg text-center  cursor-pointer hover:text-tcci-orange-o70",
                           hovered ? 'text-tcci-orange-o70' : 'text-tcci-blue'
                       ].join(' ')}>
                        {title}
                    </a>
                </Link>
            </article>
        </div>
    );
}
