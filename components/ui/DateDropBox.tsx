import {Fragment, useEffect, useState} from 'react';
import {Popover, Transition} from '@headlessui/react';
import {DateRange} from 'react-date-range';
import {usePopper} from 'react-popper';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import {useRouter} from 'next/router';
import {toUpperLocale} from '../../utils/i18n'; // theme css file
import FormattedDate from './FormattedDate';
import {enUS, zhCN} from 'date-fns/locale'
import getSearchParams from "../../utils/getSearchParams";

const usePositioningPopper = () => {
    const [referenceElement, setReferenceElement] = useState();
    const [popperElement, setPopperElement] = useState();
    const {styles, attributes} = usePopper(referenceElement, popperElement);
    return {
        referenceElement,
        setReferenceElement,
        popperElement,
        setPopperElement,
        styles,
        attributes
    }
};

// const showMenuTitle: (startDate: Date, endDate: Date, open: boolean) => boolean = (startDate, endDate, open,) => {
//   return open || (!open && startDate == null && endDate == null);
// };
// const showMenuTitleCurried = _.curry(showMenuTitle);

interface DateDropBoxProps {
    menuTitle: string;
    className?: string;
    buttonClassName?: string;
    dates?: [Date, Date];
    onChange: (startDate: Date, endDate: Date) => void;
}

// const startDateString: string = '2016-01-01';
// const endDateString: string = '2099-01-01';

export default function DateDropBox(
    {
        menuTitle,
        className = '',
        buttonClassName = '',
        dates,
        onChange
    }: DateDropBoxProps) {
    // let params = getSearchParams()

    let firstChange = false
    let dateRange = [{
        startDate: dates[0] ? dates[0] : new Date(),
        endDate: dates[1] ? dates[1] : new Date(),
        key: 'selection'
    }]
    // if (
    //     (params.startDate && (params.startDate != startDateString))
    //     &&
    //     (params.endDate && (params.endDate != endDateString))
    // ) {
    //     firstChange = true
    //     dateRange = [{
    //         startDate: dates[0] ? dates[0] : new Date(),
    //         endDate: dates[1] ? dates[1] : new Date(),
    //         key: 'selection'
    //     }]
    // }


    const [state, setState] = useState({
        firstChange,
        dateRange
    });


    // const isShowMenuTitle = showMenuTitleCurried(state.dateRange[0].startDate, state.dateRange[0].endDate);

    const {
        setReferenceElement,
        setPopperElement,
        styles,
        attributes
    } = usePositioningPopper();

    const locale = toUpperLocale(useRouter()) === 'ZH' ? zhCN : enUS;

    useEffect(() => {
        if (state.firstChange) {
            onChange(state.dateRange[0].startDate, state.dateRange[0].endDate);
        }
    }, [state]);

    return (
        <Popover className={['relative h-16', className].join(' ')}>
            {({open}) => {
                return (
                    <>
                        <Popover.Button
                            // @ts-ignore
                            ref={setReferenceElement}
                            className={['relative w-full min-w-[8rem] min-h-[4rem] cursor-pointer pb-2 pt-3 pl-10 pr-10 text-left sm:text-sm focus:outline-none', buttonClassName].join(' ')}>
        <span
            className={["block truncate transition-all duration-500", (!open && !state.firstChange) ? 'text-base' : 'text-sm'].join(' ')}>{(!open && !state.firstChange) ? menuTitle :
            <FormattedDate dates={state.dateRange[0].startDate}/>}</span>
                            <span
                                className={["block truncate transition-all duration-500 text-tcci-orange text-sm", (!open && !state.firstChange) ? 'h-0' : 'h-6'].join(' ')}>{(!open && !state.firstChange) ? '' :
                                <FormattedDate dates={state.dateRange[0].endDate}/>}</span>

                            <span
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 pt-1"><svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 6" fill="none" width="11" height="6"><path
                                d="M1.49519 0L5.23257 3.75L8.96994 0L10.4649 0.75L5.23257 6L0.000244142 0.75L1.49519 0Z"
                                fill="#002C47"></path></svg></span>


                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition-opacity duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Popover.Panel
                                // @ts-ignore
                                ref={setPopperElement}
                                style={styles.popper}
                                {...attributes.popper}
                                className="absolute z-10 p-4 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <DateRange
                                    onChange={(item) => {
                                        setState({firstChange: true, dateRange: [item.selection]})
                                    }}
                                    ranges={state.dateRange}
                                    moveRangeOnFirstSelection={false}
                                    locale={locale}
                                    rangeColors={['rgba(240, 80, 34, .7)']}
                                    editableDateInputs={true}
                                />
                            </Popover.Panel>
                        </Transition>
                    </>)
            }}
        </Popover>
    )
}
