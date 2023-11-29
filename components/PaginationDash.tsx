import RCPagination from 'rc-pagination';
import {ChevronLeftIcon, ChevronRightIcon, MinusIcon} from '@heroicons/react/20/solid';

const stripItemRender = (current, type, element) => {
    if (type === 'page') {
        return <MinusIcon className="w-5 h-5 text-inherit hover:text-tcci-orange-o70" aria-hidden={true}/>;
    }
    if (type === 'prev') {
        return <ChevronLeftIcon className="w-5 h-5 text-neutral-500 hover:text-tcci-orange-o70" aria-hidden={true}/>
    }
    if (type === 'next') {
        return <ChevronRightIcon className="w-5 h-5 text-neutral-500 hover:text-tcci-orange-o70" aria-hidden={true}/>
    }
    return element;
}

export interface PaginationProps {
    state?: object;
    className?: string;
    total: number;
    pageSize: number;
    current: number;
    onChange: (current: number, pageSize: number) => void;
}

export default function PaginationDash({
                                           className = '',
                                           total,
                                           current,
                                           pageSize,
                                           onChange
                                       }: PaginationProps) {
    return (
        // @ts-ignore
        <RCPagination
            className={['space-x-3', className].join(' ')}
            total={total}
            pageSize={pageSize}
            itemRender={stripItemRender}
            current={current}
            onChange={onChange}
        />
    );
}
