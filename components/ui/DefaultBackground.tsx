import {ReactNode} from 'react';

interface DefaultBackgroundProps {
    className?: string;
    style?: object;
    children?: ReactNode
}

export default function DefaultBackground({className = '',  children}: DefaultBackgroundProps) {
    return (
        <div
            className={["bg-cover bg-center bg-[url('/images/tcci_site_bg.png')] -z-50", className].join(' ')}>{children}</div>
    );
}
