import Link from 'next/link';
import React from 'react';

export interface PlainMenuProp {
    id: string;
    title: string | JSX.Element;
    link?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface PlainMenuProps {
    menus: PlainMenuProp[],
    textClass?: string;
    className?: string;
    selectId?: string;
    selectClass?: string;
}

function PlainMenu({
                       menus,
                       textClass = "hover:text-tcci-orange-o70",
                       className,
                       selectId,
                       selectClass = "hover:text-tcci-orange-o70"
                   }: PlainMenuProps): JSX.Element {
    return (
        <ul className={["", className].join(' ')}>
            {menus.map((item) => (
                <li key={item.id}
                    className={[
                        "text-tcci-blue select-none cursor-pointer",
                        textClass,
                        selectId === item.id ? selectClass : ''
                    ].join(' ')}>
                    {item.link && <Link href={item.link}>{item.title}</Link>}
                    {item.onClick &&
											<span onClick={(event) => item.onClick(event)} className="truncate">{item.title}</span>}
                </li>
            ))}
        </ul>
    );
}

export default PlainMenu;
