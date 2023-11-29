import {ReactNode} from 'react';

interface BodyProps {
    className?: string;
    children?: ReactNode
}

export default function Body({className = '', children}: BodyProps) {
    return (
        <div className={["pt-8", className].join(' ')}>{children}</div>
    );
}
