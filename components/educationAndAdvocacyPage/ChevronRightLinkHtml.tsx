import {ChevronRightIcon} from '@heroicons/react/20/solid';
import Link from 'next/link';
import React, {HTMLAttributeAnchorTarget} from 'react';

export interface ChevronRightLinkProps {
    content: string;
    link: string;
    target?: HTMLAttributeAnchorTarget | undefined;
    className?: string;
    iconClass?: string;
}

export default function ChevronRightLink({
                                             content,
                                             link,
                                             target = '_self',
                                             className = '',
                                             iconClass = ''
                                         }: ChevronRightLinkProps) {
    return (
        <Link href={link ?? ''} passHref>
            <a target={target}
               className={["hover:text-tcci-orange-o70 mt-0 inline-flex", className].join(' ')}>

                <div style={{display: "inline"}} dangerouslySetInnerHTML={{
                    __html: content
                }}></div>

                <ChevronRightIcon
                    className={["w-5 h-5 inline-block self-center", iconClass].join(' ')} aria-hidden={true}/>
            </a>
        </Link>
    );
}
