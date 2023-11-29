import {toLocaleDateString} from '../../utils/i18n';
import {PostCardProp} from '../PostCard';
import {useRouter} from 'next/router';
import CategoryTag from '../CategoryTag';
import {Category} from '../../utils/category';
import Link from 'next/link';

interface ListViewMonthProps {
    events: PostCardProp[];
}

export const isTCCIEvent: (tag: Category) => boolean = (tag) => {
    return tag === 'tcci-event' || tag === 'tcci-event-zh';
}

const generateSingleEvent: (event: PostCardProp, locale: string, first: boolean, last: boolean, borderBottomClass: string) => JSX.Element
    = (event, locale, first = false, last = false, borderBottomClass = '') => {
    const eventStart: Date = event?.date[0];
    const textColor = isTCCIEvent(event.category) ? 'text-white' : 'text-tcci-blue';
    const bgColor = isTCCIEvent(event.category) ? 'bg-tcci-orange' : 'bg-tcci-grey';
    const radiusTopClass = first ? 'rounded-t-[20px]' : '';
    const radiusBottomClass = last ? 'rounded-b-[20px]' : '';
    return (
        <div className={['flex', bgColor, textColor, radiusTopClass, radiusBottomClass, borderBottomClass].join(' ')}>
            <time className="mr-4 p-6">
                <p className="text-sm">{eventStart?.toLocaleDateString(locale, {weekday: 'short'})}</p>
                <p className="text-center font-bold text-lg">{`0${eventStart?.getDate()}`.slice(-2)}</p>
            </time>
            <Link href={event.link ?? ''}>
                <a className={["font-bold self-center flex-grow line-clamp-1 list-view-title"].join(' ')}>{event.title}</a>
            </Link>
            <CategoryTag className="inline-block self-center p-6" tag={event.category} highlightColor={textColor}/>
        </div>
    );
}

export default function ListViewMonth({
                                          events
                                      }: ListViewMonthProps) {
    const router = useRouter();
    const {locale} = router;
    return (
        <div className="text-tcci-blue space-y-4">
            <time>{toLocaleDateString(events[0].date[0], router, true)}</time>
            <div>
                {events.length && events.map((item, index, array) => {
                    const isFirst = index === 0;
                    const isLast = array.length - 1 === index;
                    const borderBottomGrey = (index < array.length - 1) && !isTCCIEvent(item.category) && !isTCCIEvent(array[index + 1].category);
                    const borderBottomOrange = (index < array.length - 1) && isTCCIEvent(item.category) && isTCCIEvent(array[index + 1].category);
                    let borderBottomClass: string = '';
                    if (borderBottomGrey) {
                        borderBottomClass = 'border-b border-solid border-neutral-300';
                    } else if (borderBottomOrange) {
                        borderBottomClass = 'border-b border-solid border-red-600';
                    }
                    return <div
                        key={item.id}>{generateSingleEvent(item, locale, isFirst, isLast, borderBottomClass)}</div>;
                })}
            </div>
        </div>
    );
}
