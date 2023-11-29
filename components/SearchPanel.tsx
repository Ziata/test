import React, {forwardRef} from 'react';
import SearchList, {SearchListProps} from './SearchList';
import Loading from './ui/Loading';
import {useTranslation} from 'next-i18next';

export interface SearchPanelProps {
    categorizedPosts?: SearchListProps[],
    inputValue?: string
    onInputChange?: (value: string) => void;
    loading: boolean;
    onClose?: any
}


// eslint-disable-next-line react/display-name
const SearchPanel = forwardRef<HTMLInputElement, SearchPanelProps>((props, ref) => {
    const {t} = useTranslation('common');
    const noResults: JSX.Element = <p
        className="h-64 flex justify-center items-center text-lg text-neutral-500">{t('No results for search')}</p>;

    const hasSearchResult = props.categorizedPosts && props.categorizedPosts.some((item) => item?.posts?.length > 0);
    return (
        <div
            className="w-11/12 md:w-full md:max-w-[40rem] relative top-24 left-1/2 -translate-x-1/2 inline-flex flex-col items-center"

        >
            <input
                placeholder={t('Search')}
                type="text"
                ref={ref}
                value={props.inputValue}
                onChange={(e) => props.onInputChange(e.target.value)}
                className={[
                    "max-w-[40rem] w-full px-4 py-2 w-full rounded-full border border-neutral-400 focus:border-tcci-orange focus:outline-none border-solid",
                ].join(' ')}/>
            <div className={[
                "max-w-[40rem] w-full max-h-[70vh] min-h-64 bg-white mt-2 rounded-3xl overflow-auto border-[1.5rem] border-solid border-white",
                props.inputValue.length > 0 ? 'block' : 'hidden'
            ].join(' ')}
            >
                {props.loading ?
                    <div className="h-64 flex justify-center items-center overflow-hidden"><Loading/></div> : (
                        hasSearchResult ? <ul className="space-y-4 divide-tcci-blue divide-y divide-solid">
                            {props.categorizedPosts?.map((item) => item?.posts?.length > 0 &&
															<li className="pt-4" key={item.categoryTitle}>
																<SearchList posts={item.posts} categoryTitle={item.categoryTitle}
																            highlightText={item.highlightText} moreLink={item.moreLink}/>
															</li>)}
                        </ul> : noResults
                    )}
            </div>
        </div>
    )
});

export default SearchPanel;
