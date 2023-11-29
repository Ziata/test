import CalendarEventPanel from './CalendarEventPanel';
import {Popover} from 'antd';
import {isTCCIEvent} from './ListViewMonth';
import {PostCardProp} from '../PostCard';

export interface CalendarDropBoxProps {
    event: PostCardProp;
}

export default function CalendarDropBox({
                                            event
                                        }: CalendarDropBoxProps) {
    const borderColor = isTCCIEvent(event.category) ? 'border-tcci-orange' : 'border-tcci-grey';

    return (
        <Popover placement="right"
                 content={<CalendarEventPanel event={event}/>}
                 trigger="click">
            <p className={["calendar-view-title border-l-8 border-solid pl-2 line-clamp-2 hover:text-tcci-orange-o70", borderColor].join(' ')}>
                {event.title}
            </p>
        </Popover>
    );
}
