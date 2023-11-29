import {PostCardProp} from '../PostCard';
import {Calendar, ConfigProvider} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import {useRouter} from 'next/router';
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import {getDatesArray} from '../../utils/date';
import {useTranslation} from 'next-i18next';
import {useState} from 'react';
import CalendarDropBox from './CalendarDropBox';
import {ViewProps} from './PhotoView';

interface CalendarViewProps extends ViewProps {
    date: Date;
    onChange: (startDate: Date, endDate: Date) => void;
}

const listEventsByDate = (events: PostCardProp[]): PostCardProp[][][][] => {
    const listedEvents: PostCardProp[][][][] = [];
    events.forEach((event) => {
        const dates = getDatesArray(event.date[0], event.date[1]);
        dates.forEach((date) => {
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            if (!listedEvents[year]) {
                listedEvents[year] = [];
            }
            if (!listedEvents[year][month]) {
                listedEvents[year][month] = [];
            }
            if (!listedEvents[year][month][day]) {
                listedEvents[year][month][day] = [];
            }
            listedEvents[year][month][day].push(event);
        });
    });
    return listedEvents;
}

const getEventsByDate = (date: Dayjs, listedEvents: PostCardProp[][][][]): PostCardProp[] => {
    const year = date.year();
    const month = date.month();
    const day = date.date();
    return listedEvents?.[year]?.[month]?.[day] ?? [];
}

const DateCellRender = (date: Dayjs, listedEvents: PostCardProp[][][][], t): JSX.Element => {
    const listData = getEventsByDate(date, listedEvents);
    const showData = listData.slice(0, 2);
    const restData = listData.slice(2);
    const [showRest, setShowRest] = useState(false);


    return (
        <ul className="space-y-4 pb-4">
            {showData.map((item) => (
                <li key={item.id}>
                    <CalendarDropBox event={item}/>
                </li>)
            )}
            {showRest
                ? <>
                    {restData.map((item) => (
                        <li key={item.id}>
                            <CalendarDropBox event={item}/>
                        </li>
                    ))}
                </>
                : (restData.length > 0 &&
								<li>
									<p className="line-clamp-1 underline hover:text-tcci-orange-o70"
									   onClick={() => {
                         setShowRest(true);
                     }}>
                      {t(`And ${restData.length} more`)}
									</p>
								</li>
                )
            }
        </ul>
    );
}

export default function CalendarView({
                                         events,
                                         date,
                                         onChange
                                     }: CalendarViewProps) {
    const router = useRouter();
    const locale = router?.locale === 'zh' ? zhCN : enUS;
    const listedEvents = listEventsByDate(events);
    const {t} = useTranslation('common');
    const start = dayjs(date).startOf('month');
    const end = dayjs(date).endOf('month');

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'rgba(240, 80, 34, .7)',
                    fontFamily: 'D-DIN, Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif;'
                },
            }}
            locale={locale}>
            <Calendar className="text-tcci-blue text-base"
                      headerRender={({value}) => {
                          return null
                          /*return (
                              <div className="mb-4 bg-white/0">
                                  <time>{toLocaleDateString(start.toDate(), router, true)}</time>
                              </div>)*/
                      }}
                      dateCellRender={(date) => DateCellRender(date, listedEvents, t)}
                      value={start}
                      defaultValue={start}
                      onChange={(date) => onChange(start.toDate(), end.toDate())}
            />
        </ConfigProvider>
    );
}
