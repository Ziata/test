import {useTranslation} from 'next-i18next';
import React from 'react';
import {Category} from '../utils/category';

interface CategoryTagBigProps {
    tag: Category;
    className?: string;
}

export default function CategoryTagBig(
    {
        tag,
        className = '',
    }: CategoryTagBigProps
) {
    const {t} = useTranslation('common');
    const defaultClass: string = 'text-tcci-blue font-light';

    let tagLocal: Category = tag;
    return <span className={[defaultClass, className].join(' ')}>{'#' + t(tagLocal)}</span>;
}
