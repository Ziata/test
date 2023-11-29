import {ReactNode} from 'react';

interface MainProps {
    className?: string;
    children?: ReactNode
}

function Main({className = '', children}: MainProps) {
    return (
        <div className={["max-w-7xl mx-auto px-4 sm:px-6 md:px-8", className].join(' ')}>{children}</div>
    );
}

export default Main;
