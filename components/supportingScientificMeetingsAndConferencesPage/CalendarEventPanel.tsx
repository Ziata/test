import {CalendarDropBoxProps} from './CalendarDropBox';
import CategoryTag from '../CategoryTag';
import Link from 'next/link';
import FormattedDate from '../ui/FormattedDate';
import React from 'react';
import ChevronRightLink from '../ui/ChevronRightLink';
import {useTranslation} from 'next-i18next';

export default function CalendarEventPanel({
                                               event
                                           }: CalendarDropBoxProps) {
    const {t} = useTranslation('common');
    return (
        <div
            className={[
                'text-tcci-blue relative h-auto min-h-fit p-2 max-w-[18rem]',
                'flex flex-wrap',
            ].join(' ')}>
            <div className="w-full">
                <div>
                    <div className={["text-xl mb-2 line-clamp-1"].join(' ')}>
                        <CategoryTag tag={event.category}/>
                    </div>
                    <div className="font-bold text-2xl line-clamp-3 mb-2">
                        <Link href={(event.link ?? '')}><a className="hover:text-tcci-blue">{event.title}</a></Link>
                    </div>
                    <div className="font-light">
                        <FormattedDate dates={event.date}/>
                    </div>
                </div>
            </div>
            <div className="self-end">
                {event.excerpt && event.excerpt.length > 0 && <p className="mt-2 line-clamp-3">{event.excerpt}</p>}
            </div>
            <ChevronRightLink className="text-lg text-tcci-orange hover:text-tcci-orange"
                              iconClass="w-6 h-6"
                              content={t('See Event Detail')}
                              link={event.link}/>
        </div>
    );
}
