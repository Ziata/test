import {useTranslation} from 'next-i18next';
import React from 'react';
import {Category, getLinkByCategory, toLocaleCategory} from '../utils/category';
import Link from 'next/link';

interface CategoryTagProps {
    tag: Category;
    className?: string;
    defaultColor?: string;
    highlightColor?: string;
    locale?: string;
}

export default function CategoryTag(
    {
        tag,
        className = '',
        defaultColor = 'text-tcci-blue',
        highlightColor = 'text-tcci-orange',
        locale = 'en',
    }: CategoryTagProps
) {
    const {t} = useTranslation('common');
    let tagLink = getLinkByCategory(toLocaleCategory(tag, undefined, 'en'));



    if (locale == 'zh' && tagLink == '/supporting-scientific-meetings-and-conferences?event=tcci-event') {
        tagLink = '/会议?event=tcci-event'
    } else if (locale == 'en' && tagLink == '/supporting-scientific-meetings-and-conferences?event=tcci-event') {
        tagLink = '/meetings?event=tcci-event'
    } else if (locale == 'zh' && tagLink == '/supporting-scientific-meetings-and-conferences?event=tcci-sponsored-event') {
        tagLink = '/会议?event=tcci-sponsored-event'
    } else if (locale == 'en' && tagLink == '/supporting-scientific-meetings-and-conferences?event=tcci-sponsored-event') {
        tagLink = '/meetings?event=tcci-sponsored-event'
    }


    let tagText: JSX.Element;
    switch (tag) {
        case 'meeting-reports':
        case 'meeting-reports-zh':
            tagText = <span className={['font-normal', highlightColor].join(' ')}>{t(tag) + ':'}</span>;
            break;
        case 'tcci-event':
        case'tcci-event-zh':
            tagText = <span className={[highlightColor].join(' ')}>{'#' + t(tag)}</span>;
            break;
        default:
            tagText = <span className={[defaultColor].join(' ')}>{'#' + t(tag)}</span>;
            break;
    }
    return (
        <Link href={tagLink ?? ''} passHref>
            <a className={["font-light", className].join(' ')}>{tagText}</a>
        </Link>
    );
}
