import {ReactNode} from 'react';

interface GridProps {
    rowCount?: 2 | 3 | 4 | 5 | 6;
    children?: ReactNode;
}

export default function Grid({
                                 rowCount = 4,
                                 children
                             }: GridProps) {
    let className = '';
    switch (rowCount) {
        case 2:
            className = 'gap-x-4 gap-y-6 grid-cols-auto-fill-100';
            break;
        case 3:
            className = 'gap-x-4 gap-y-6 grid-cols-auto-fill-80';
            break;
        case 4:
            className = 'gap-x-4 gap-y-6 grid-cols-auto-fill-64';
            break;
        case 5:
            className = 'gap-x-4 gap-y-6 grid-cols-auto-fill-48';
            break;
        case 6:
            className = 'gap-x-4 gap-y-6 grid-cols-auto-fill-20';
            break;
        default:
            break;
    }

    return (
        <section className={["grid", className].join(' ')}>
            {children}
        </section>
    );
}
