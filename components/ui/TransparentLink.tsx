import Link from 'next/link';
import {ReactNode} from 'react';

interface TransparentLinkProps {
    link: string;
    className?: string;
    children?: ReactNode
}

export default function TransparentLink({
                                            link,
                                            children,
                                            className,
                                        }: TransparentLinkProps) {
    return (
        <Link href={link ?? ''} passHref>
            <a style={{background: "linear-gradient(90deg, white 50%, transparent 50%)"}}
               className={[
                   'text-white py-6 px-10 border border-solid border-white',
                   '!bg-[length:200%_100%] !bg-[left_calc(100%)_top_calc(0%)] transition-[background] ease-[cubic-bezier(.03,.65,.48,1)] duration-[600ms]',
                   'hover:!bg-[left_calc(100%)] hover:text-black',
                   className
               ].join(' ')}>
                {children}
            </a>
        </Link>
    );
}
