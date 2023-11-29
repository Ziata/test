import ListBoxPlain from '../ui/ListBoxPlain';
import {useTranslation} from 'next-i18next';
import {PlainMenuProp} from '../PlainMenu';
import DateDropBox from '../ui/DateDropBox';
import ListBox from '../ui/ListBox';
import PaginationDate from '../PaginationDate';
import dayjs from 'dayjs';
import {toLocaleDateString, toLocaleYearDateString} from '../../utils/i18n';
import {useRouter} from 'next/router';
import SelectIcon from "../icons/SelectIcon";
import {useState} from "react";

const useEventType = (t) => {
    const eventTypeMenu: PlainMenuProp[] = [
        {
            id: 'All',
            title: t('All Events')
        },
        {
            id: 'tcci-event',
            title: t('TCCI Events')
        },
        {
            id: 'tcci-sponsored-event',
            title: t('TCCI Sponsored Events')
        },
    ];
    return eventTypeMenu;
};

const useViewType = (viewType: viewType, t) => {
    const viewTypeOptions: PlainMenuProp[] = [
        {
            id: 'Photo View',
            title: t('Photo View')
        },
        {
            id: 'Calendar View',
            title: t('Calendar View')
        },
        {
            id: 'List View',
            title: t('List View')
        },
    ];
    return {
        viewTypeOptions
    };
}

export type viewType = 'Photo View' | 'Calendar View' | 'List View';

export interface FilterProps {
    eventType: string;
    organizerType: string;
    locationType: string;
    researchFieldType: string;
    startDate: Date;
    endDate: Date;
    viewType: viewType;
}

export interface FilterBarProps extends FilterProps {
    pageTitle?: string;
    className?: string;
    onChange: (filterProps: FilterProps) => void;
    organizerMenu: PlainMenuProp[];
    locationMenu: PlainMenuProp[];
    researchFieldMenu: PlainMenuProp[];
}


export default function FilterBar({
                                      className = '',
                                      pageTitle = '',
                                      eventType,
                                      organizerType,
                                      locationType,
                                      researchFieldType,
                                      startDate,
                                      endDate,
                                      viewType,
                                      onChange,
                                      organizerMenu,
                                      locationMenu,
                                      researchFieldMenu
                                  }: FilterBarProps) {
    const router = useRouter();
    const {t} = useTranslation('common');
    const eventTypeMenu = useEventType(t);
    const [show, setShow] = useState(false)

    const {
        viewTypeOptions
    } = useViewType(viewType, t);

    const props: FilterProps = {
        eventType,
        organizerType,
        locationType,
        researchFieldType,
        startDate,
        endDate,
        viewType
    };
    const showPaginationDate = viewType !== 'Photo View';
    const PaginationDateType = viewType === 'Calendar View' ? 'month' : 'year';


    return (
        <div className={className}>
            <div className="flex justify-between">
                <h1 className="self-center">
                    <span className="text-3xl text-tcci-blue">{pageTitle}</span>
                </h1>
                <div className={[
                    "mt-2 flex items-center",
                    // showPaginationDate ? 'justify-between' : 'justify-end'
                ].join(' ')}>

                    {
                        (viewType == 'List View') && (
                            <div className="mr-4">
                                <time>{toLocaleYearDateString(dayjs(startDate).toDate(), router)}</time>
                            </div>
                        )
                    }
                    {
                        (viewType == 'Calendar View') && (
                            <div className="mr-4">
                                <time>{toLocaleDateString(dayjs(startDate).toDate(), router, true)}</time>
                            </div>
                        )
                    }

                    {showPaginationDate && (
                        <PaginationDate
                            type={PaginationDateType}
                            date={startDate}
                            onChange={
                                (date) => onChange({
                                    ...props,
                                    startDate: dayjs(date).startOf(PaginationDateType).toDate(),
                                    endDate: dayjs(date).endOf(PaginationDateType).toDate()
                                })
                            }/>
                    )}

                </div>
            </div>

            <div className="flex justify-between items-center  meeting-event-type-wrap">

                <button
                    onClick={() => setShow(!show)}
                    className="filter-btn relative w-auto cursor-default py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-tcci-orange-o70 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-base hidden pl-0"
                    id="headlessui-listbox-button-14" type="button" aria-haspopup="listbox" aria-expanded="false"
                    data-headlessui-state=""><span className="block truncate text-[#1A73E8]">{t('Filter')}</span><span
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"><SelectIcon/>
            </span></button>

                <div className="flex items-center meeting-event-type-list">
                    <ListBoxPlain menus={eventTypeMenu}
                                  selectId={eventType}
                                  onChange={(id) => {
                                      if (eventType == id) return
                                      onChange({...props, eventType: id})
                                  }}
                                  className="event-type"
                                  buttonClassName="!pl-0"
                                  optionsClassName='lg:w-auto'
                                  menuTitle={t('Event Type')}/>
                    <ListBoxPlain menus={organizerMenu}
                                  selectId={organizerType}
                                  onChange={(id) => {
                                      if (organizerType == id) return
                                      onChange({...props, organizerType: id})
                                  }}
                                  className="event-type"
                                  buttonClassName=" "
                                  optionsClassName='lg:w-auto'
                                  menuTitle={t('Organizer')}/>
                    <ListBoxPlain menus={locationMenu}
                                  selectId={locationType}
                                  onChange={(id) => {
                                      if (locationType == id) return
                                      onChange({...props, locationType: id})
                                  }}
                                  className="event-type"
                                  buttonClassName=" "
                                  optionsClassName='lg:w-auto'
                                  menuTitle={t('Location')}/>
                    <ListBoxPlain menus={researchFieldMenu}
                                  selectId={researchFieldType}
                                  onChange={(id) => {
                                      if (researchFieldType == id) return

                                      onChange({...props, researchFieldType: id})
                                  }}
                                  className="event-type"
                                  buttonClassName=" "
                                  optionsClassName='lg:w-auto'
                                  menuTitle={t('Research Field')}/>
                    <DateDropBox menuTitle={t('Date Range')}
                                 onChange={(startDate, endDate) => {


                                     onChange({...props, startDate, endDate})
                                 }}
                                 dates={[startDate, endDate]}
                                 className="event-type"
                                 buttonClassName=" "
                    />
                </div>


                <div className='flex hidden-select'>
                    <ListBox
                        menus={viewTypeOptions}
                        selectId={viewType}
                        onChange={(id) => {
                            if (viewType == id) return
                            onChange({...props, viewType: id as viewType})
                        }}
                    />
                </div>
            </div>
            <div className={[
                'flex justify-between items-center meeting-event-type-wrap',
                show ? 'm-show' : 'm-hide'
            ].join(' ')}>
                <div className="flex m-meeting-event-type-list">
                    <ListBoxPlain menus={eventTypeMenu}
                                  selectId={eventType}
                                  onChange={(id) => {
                                      if (eventType == id) return
                                      onChange({...props, eventType: id})
                                  }}
                                  className="event-type"
                                  buttonClassName="!pl-0"
                                  optionsClassName='lg:w-auto'
                                  menuTitle={t('Event Type')}/>
                    <ListBoxPlain menus={organizerMenu}
                                  selectId={organizerType}
                                  onChange={(id) => {
                                      if (organizerType == id) return
                                      onChange({...props, organizerType: id})
                                  }}
                                  className="event-type"
                                  buttonClassName=" "
                                  optionsClassName='lg:w-auto'
                                  menuTitle={t('Organizer')}/>
                    <ListBoxPlain menus={locationMenu}
                                  selectId={locationType}
                                  onChange={(id) => {
                                      if (locationType == id) return
                                      onChange({...props, locationType: id})
                                  }}
                                  className="event-type"
                                  buttonClassName=" "
                                  optionsClassName='lg:w-auto'
                                  menuTitle={t('Location')}/>
                    <ListBoxPlain menus={researchFieldMenu}
                                  selectId={researchFieldType}
                                  onChange={(id) => {
                                      if (researchFieldType == id) return
                                      onChange({...props, researchFieldType: id})
                                  }}
                                  className="event-type"
                                  buttonClassName=" "
                                  optionsClassName='lg:w-auto'
                                  menuTitle={t('Research Field')}/>
                    <DateDropBox menuTitle={t('Date Range')}
                                 onChange={(startDate, endDate) => {

                                     onChange({...props, startDate, endDate})
                                 } }
                                 dates={[startDate, endDate]}
                                 className="event-type"
                                 buttonClassName=" "
                    />
                </div>
            </div>

        </div>
    );
}
