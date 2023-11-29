import React, {ReactNode, useEffect} from 'react';

interface ModalProps {
    className?: string;
    active: boolean;
    children?: ReactNode;
    onEscape?: (active: boolean) => void;
    onClick?: (active: boolean) => void;
}

export default function Modal({
                                  className,
                                  active,
                                  children,
                                  onEscape,
                                  onClick
                              }: ModalProps) {
    useEffect(() => {
        if (window) {
            if (active) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    }, [active]);
    return (
        <div
            className={[
                "fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-50 cursor-default",
                active ? 'block' : 'hidden',
                className
            ].join(' ')}
            onKeyUp={(e) => e.key === 'Escape' && onEscape(active)}>
            <div className="fixed top-0 left-0 w-screen h-screen" onClick={() => onClick(active)}>
            </div>
            {children}
        </div>
    );
}
