import React from 'react';
import NavigationMenu from './NavigationMenu';

interface HeaderProps {
    transparent?: boolean;
    className?: string;
    navMenus?: [];
}

function Header({transparent = false, className, navMenus = []}: HeaderProps) {
    const externalClass = transparent ? 'absolute top-0 left-0 right-0 h-16' : ''
    return (
        <header
            className={
                [
                    "select-none cursor-pointer z-10",
                    externalClass,
                    transparent ? '' : 'bg-tcci-blue',
                    className
                ].join(' ')
            }>
            <NavigationMenu navMenus={navMenus} transparent={transparent}/>
        </header>
    )
}

export default Header;
