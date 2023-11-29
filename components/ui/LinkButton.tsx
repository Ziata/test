import Link from 'next/link';
import React from 'react';

export interface ButtonProps {
    link?: string;
    children?: React.ReactNode;
    className?: string;
    aClass?: string;
    themeColor?: 'orange' | 'purple' | 'light-orange';
    blank?: boolean;
    onClick?: (selected: boolean) => void;
    selected?: boolean
    type?: 'link' | 'button';
}

export default function LinkButton({
                                       link,
                                       children,
                                       className,
                                       aClass,
                                       themeColor = 'orange',
                                       blank = false,
                                       onClick,
                                       selected = false,
                                       type = 'link'
                                   }: ButtonProps): JSX.Element {

    let color: string = 'tcci-orange-o70';
    let externalClass: string = 'text-neutral-50 hover:text-neutral-50 visited:text-neutral-50 border-none';
    switch (themeColor) {
        case 'orange':
            color = 'bg-tcci-orange-o70';
            break;
        case 'purple':
            color = 'bg-tcci-purple';
            break;
        case 'light-orange':
            color = 'bg-white/0';
            externalClass = selected
                ? 'bg-tcci-light-orange border-2 border-solid border-tcci-orange-o70 text-neutral-900 hover:text-neutral-900 visited:text-neutral-900'
                : 'hover:bg-tcci-light-orange border-2 border-solid border-white/0 hover:border-tcci-orange-o70 text-neutral-900 hover:text-neutral-900 visited:text-neutral-900 transition-all duration-500';
            break;
        default:
            break;
    }
    const themeClass = `px-5 py-2.5 rounded-full ${color} inline-block m-6 select-none cursor-pointer ${externalClass}`;
    return (
        <>
            {type === 'link'
                ? <Link href={link ?? ''} passHref={blank}>
                    <a
                        target={blank ? '_blank' : '_self'}
                        className={[
                            themeClass,
                            className].join(' ')
                        }
                    >
                        {children}
                    </a>
                </Link>
                : <button onClick={(e) => onClick(selected)} className={className}>
                    <a
                        className={[themeClass, aClass].join(' ')}
                    >
                        {children}
                    </a>
                </button>
            }
        </>
    )
        ;
}
