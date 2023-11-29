import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid';

interface PaginationPrevNextIconProps {
    className?: string;
    type: 'next' | 'prev';
    onClick: () => void;
}

export default function PaginationPrevNextIcon({
                                                   className,
                                                   type,
                                                   onClick
                                               }: PaginationPrevNextIconProps) {
    const Icon: JSX.Element = type === 'next'
        ? <ChevronRightIcon className="w-6 h-5 inline-block" aria-hidden={true}/>
        : <ChevronLeftIcon className="w-6 h-5 inline-block" aria-hidden={true}/>
    return (
        <div className={['rounded-full bg-white p-1 inline-block text-base cursor-pointer', className].join(' ')}
             onClick={() => onClick()}>
            {Icon}
        </div>
    );
}
