import React from 'react';

interface SectionProps {
    children?: React.ReactNode;
    className?: string;
}

export default function Section({
                                    className,
                                    children
                                }: SectionProps) {
    return (
        <div className={['mt-24', 'mb-12', className].join(' ')}>
            {children}
        </div>
    );
}
