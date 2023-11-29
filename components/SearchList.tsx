import SearchCard, {SearchCardProp} from './SearchCard';
import ChevronRightLink from './ui/ChevronRightLink';
import {useTranslation} from 'next-i18next';

export interface SearchListProps {
    categoryTitle: string;
    posts: SearchCardProp[]
    highlightText: string;
    moreLink: string;
}

export default function SearchList({
                                       categoryTitle,
                                       posts,
                                       highlightText,
                                       moreLink
                                   }: SearchListProps) {
    const {t} = useTranslation('common');
    return (
        <div className="space-y-4">
            <h2 className="mb-4 text-3xl font-bold"><span>{categoryTitle}</span></h2>
            <ul className="space-y-2 divide-y divide-solid">
                {posts?.map((item) => <li key={item.title} className="pt-2">
                    <SearchCard post={item} highlightTest={highlightText}/>
                </li>)}
            </ul>
            <div className="w-full flex justify-end">
                <ChevronRightLink link={moreLink ?? ''} content={t('See More')}/>
            </div>
        </div>
    )
}
