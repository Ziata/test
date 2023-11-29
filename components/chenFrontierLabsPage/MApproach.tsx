import React from 'react';
import CircleIcon from './icons/CircleIcon';

const getClass = (active: boolean) => {
    let bgClass = active ? 'bg-tcci-purple' : 'bg-neutral-200';
    let borderClass = active ? 'border-l-tcci-purple' : 'border-l-neutral-200';
    let opacityClass = active ? 'opacity-100' : 'opacity-0';
    let dropClass = active ? 'animate__fadeInUp' : 'animate__fadeOutDown';
    let DownDropClass = active ? 'animate__fadeInDown' : 'animate__fadeOutUp';

    return {bgClass, borderClass, opacityClass, dropClass, DownDropClass};
}

export interface ApproachProps {
    title: string;
    content?: string;
    className?: string;
    showArrow?: boolean;
    isActive?: boolean;
    active?: boolean;
    activeIndex?: number;
    index?: number;
    onMouseEnter?: (active: boolean) => void;
    onMouseLeave?: (active: boolean) => void;
}

export default function Approach(
    {
        title,
        content = '',
        className,
        isActive,
        showArrow = true,
        active = false,
        activeIndex = 0,
        index = 0,
        onMouseEnter,
        onMouseLeave
    }: ApproachProps
) {
    let {bgClass, borderClass, opacityClass, dropClass, DownDropClass} = getClass(active);


    const arrow = () => {

        if (index == 4) return null

        return (
            <>
                {/*<div
                    className={
                        [
                            'w-full h-[12px]  bg-center bg-auto bg-no-repeat',
                            'approach-line',
                            active ? ' visible' : 'invisible'
                        ].join(' ')
                    } style={{
                    backgroundImage: `url(data:image/svg+xml;base64,ICAgICAgCgo8c3ZnIHdpZHRoPSIxMjYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMjYgMTIiIGZpbGw9Im5vbmUiCiAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPHBhdGggZD0iTTEyNiA2TDExNiAwLjIyNjQ5N1YxMS43NzM1TDEyNiA2Wk0wIDdINS4yNVY1SDBWN1pNMTUuNzUgN0gyNi4yNVY1SDE1Ljc1VjdaTTM2Ljc1IDdINDcuMjVWNUgzNi43NVY3Wk01Ny43NSA3SDY4LjI1VjVINTcuNzVWN1pNNzguNzUgN0g4OS4yNVY1SDc4Ljc1VjdaTTk5Ljc1IDdIMTEwLjI1VjVIOTkuNzVWN1oiIGZpbGw9IiNCMTkxQzMiLz4KPC9zdmc+)`
                }}>
                </div>*/}
                <div
                    className={
                        [
                            'm-approach-line-wrap',
                            active ? ' visible' : 'invisible'
                        ].join(' ')
                    }>
                    <div className='approach-line'>
                        <span className='line'></span>
                        <span className='line'></span>
                        <span className='line'></span>
                        <span className='line'></span>
                        <span className='line arrow'></span>
                    </div>
                </div>

            </>
        )
    }

    return (
        <>
            <div
                className={[
                    "flex",
                    "inline-block relative w-full sm:w-40",
                    'approach-dot',
                    className].join(' ')}
                onMouseEnter={() => onMouseEnter(active)}
                onMouseLeave={() => onMouseLeave(active)}>


                <div className="relative rotate-90	 self-center z-10">
                    <div>
                        <CircleIcon
                            type={index == 4 ? 0 : 1}
                            circleFill={active ? '#B191C3' : '#E4E4E4'}
                            circleBg={active ? '#DCCFE3' : 'white'}
                        />
                    </div>


                </div>


                {isActive && (
                    <div className='w-full flex items-center flex-col justify-center'>
                        <div
                            className={['transition-all mx-auto', opacityClass].join(' ')}>
                            {
                                isActive && (
                                    <div className={['animate__animated animate__faster mt-2', dropClass].join(' ')}>
                                        <section className="text-center text-neutral-500">
                                            <h2 className=""><span
                                                className="text-tcci-blue font-normal text-xl">{title}</span>
                                            </h2></section>
                                    </div>)
                            }
                        </div>

                        {
                            content && (
                                <div
                                    className={['transition-all mx-auto', opacityClass].join(' ')}>
                                    <div className={['animate__animated animate__faster mt-2', DownDropClass].join(' ')}>
                                        <section className="text-center text-neutral-500"><p
                                            className="text-neutral-500 text-sm">{content}</p></section>
                                    </div>

                                </div>
                            )
                        }

                    </div>
                )}

                {/*{
                    isActive && (
                        <div className="text-center text-neutral-500 w-1/2 mx-auto self-center block sm:hidden">
                            <p className="text-xl">{title}</p>
                            <p className={active ? 'block' : 'hidden'}>{content}</p>
                        </div>
                    )
                }*/}
            </div>
            {arrow()}
        </>
    );
}
