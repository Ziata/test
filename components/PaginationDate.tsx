import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid';
import {useState} from 'react';

export interface PaginationProps {
    className?: string;
    date: Date;
    type: 'year' | 'month';
    onChange: (date: Date) => void;
}


export default function PaginationDate({
                                           className = '',
                                           date,
                                           type,
                                           onChange
                                       }: PaginationProps) {
    const [currentDate, setCurrentData] = useState(date);


    const minusHandler = (date: Date, type: 'year' | 'month'): Date => {
        let newDate;
        if (type === 'year') {
            newDate = new Date(date.getFullYear() - 1, date.getMonth());
        } else {
            newDate = new Date(date.getFullYear(), date.getMonth() - 1);
        }
        setCurrentData(newDate);
        return newDate;
    }

    const addHandler = (date: Date, type: 'year' | 'month'): Date => {
        let newDate;
        if (type === 'year') {
            newDate = new Date(date.getFullYear() + 1, date.getMonth());
        } else {
            newDate = new Date(date.getFullYear(), date.getMonth() + 1);
        }
        setCurrentData(newDate);
        return newDate;
    }
    const PrevIcon = <ChevronLeftIcon className="cursor-pointer w-5 h-5 text-neutral-500 hover:text-tcci-orange-o70"
                                      aria-hidden={true}
                                      onClick={() => onChange(minusHandler(date, type))}/>;
    const DotIcon = <div className="select-none">•</div>;
    const NextIcon = <ChevronRightIcon className="cursor-pointer w-5 h-5 text-neutral-500 hover:text-tcci-orange-o70"
                                       aria-hidden={true}
                                       onClick={() => onChange(addHandler(date, type))}/>;
    return (
        <div className={['flex items-center space-x-4', className].join(' ')}>
            {PrevIcon}
            {DotIcon}
            {NextIcon}
        </div>
    );
}
