import {ButtonHTMLAttributes, ReactNode} from 'react';

interface TransparentButtonProps {
    children?: ReactNode;
    className?: string;
    onClick?: any;
    buttonProps?: ButtonHTMLAttributes<any>
}

export default function TransparentButton({
                                              children,
                                              className,
                                              onClick,
                                              buttonProps
                                          }: TransparentButtonProps) {
    return (
        <button {...buttonProps} onClick={onClick} style={{background: "linear-gradient(90deg, white 50%, transparent 50%)"}}
                className={[
                    'text-white py-4 px-6 border border-solid border-white',
                    '!bg-[length:200%_100%] !bg-[left_calc(100%)_top_calc(0%)] transition-[background] ease-[cubic-bezier(.03,.65,.48,1)] duration-[600ms]',
                    'hover:!bg-[left_calc(100%)] hover:text-black',
                    className
                ].join(' ')}>
            {children}
        </button>
    );
}
