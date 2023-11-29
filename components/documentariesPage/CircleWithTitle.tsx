interface CircleWithTitleProps {
    className?: string
    color?: string;
    title: string;
    index?: number;
    onClick?: () => void;
}

export default function CircleWithTitle(
    {
        className,
        color,
        index,
        title,
        onClick
    }: CircleWithTitleProps
) {
    return (
        <div className={["md:inline-flex inline-block text-center flex-col items-center", className].join(' ')}>
            {
                index == 0 && (
                    <svg className="js-dot-icon md:mt-0 md:ml-auto md:mr-auto mb-[-40px] dot-icon cursor-pointer" onClick={onClick} xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 200 200">
                        <g className="dot-icon-dot">
                            <circle data-start-amount="1" data-end-amount="2" className="dot-1-st0" cx="100.5" cy="100.1"
                                    r="11"/>
                        </g>
                        <g className="dot-icon-dot">
                            <circle data-start-amount="1" data-end-amount="6" className="dot-1-st1" cx="100.5" cy="100.1"
                                    r="11"/>
                        </g>
                        <g className="dot-icon-dot">
                            <circle data-start-amount="1" data-end-amount="8" className="dot-1-st1" cx="100.5" cy="100.1"
                                    r="11"/>
                        </g>
                        <g className="dot-icon-circle">
                            <circle data-start-amount="0" data-end-amount="90" cx="100" cy="100" r="42"
                                    strokeDasharray="3.97 9.92"
                                    fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="2"/>
                        </g>
                        <g className="dot-icon-circle">
                            <circle data-start-amount="0" data-end-amount="-90" cx="100" cy="100" r="47"
                                    strokeDasharray="4.02 3.01"
                                    fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="2"/>
                        </g>
                    </svg>
                )
            }

            {
                index == 1 && (
                    <svg className="js-dot-icon ml-auto md:mt-0 md:ml-auto md:mr-auto mb-[-40px] dot-icon cursor-pointer" onClick={onClick} xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 200 200">
                        <g className="dot-icon-dot">
                            <circle data-start-amount="1" data-end-amount="2" className="dot-2-st0" cx="100.5" cy="100.1"
                                    r="11"/>
                        </g>
                        <g className="dot-icon-dot">
                            <circle data-start-amount="1" data-end-amount="6" className="dot-2-st1" cx="100.5" cy="100.1"
                                    r="11"/>
                        </g>
                        <g className="dot-icon-dot">
                            <circle data-start-amount="1" data-end-amount="8" className="dot-2-st1" cx="100.5" cy="100.1"
                                    r="11"/>
                        </g>
                        <g className="dot-icon-circle">
                            <circle data-start-amount="0" data-end-amount="90" cx="100" cy="100" r="42"
                                    strokeDasharray="3.97 9.92"
                                    fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="2"/>
                        </g>
                        <g className="dot-icon-circle">
                            <circle data-start-amount="0" data-end-amount="-90" cx="100" cy="100" r="47"
                                    strokeDasharray="4.02 3.01"
                                    fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="2"/>
                        </g>
                    </svg>
                )
            }
            {
                index == 2 && (
                    <svg className="js-dot-icon md:mt-0 md:ml-auto md:mr-auto mb-[-40px] dot-icon cursor-pointer" onClick={onClick} xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 200 200">
                        <g className="dot-icon-dot">
                            <circle data-start-amount="1" data-end-amount="2" className="dot-3-st0" cx="100.5" cy="100.1"
                                    r="11"/>
                        </g>
                        <g className="dot-icon-dot">
                            <circle data-start-amount="1" data-end-amount="6" className="dot-3-st1" cx="100.5" cy="100.1"
                                    r="11"/>
                        </g>
                        <g className="dot-icon-dot">
                            <circle data-start-amount="1" data-end-amount="8" className="dot-3-st1" cx="100.5" cy="100.1"
                                    r="11"/>
                        </g>
                        <g className="dot-icon-circle">
                            <circle data-start-amount="0" data-end-amount="90" cx="100" cy="100" r="42"
                                    strokeDasharray="3.97 9.92"
                                    fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="2"/>
                        </g>
                        <g className="dot-icon-circle">
                            <circle data-start-amount="0" data-end-amount="-90" cx="100" cy="100" r="47"
                                    strokeDasharray="4.02 3.01"
                                    fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="2"/>
                        </g>
                    </svg>
                )
            }
            {
                index == 3 && (
                    <svg className="js-dot-icon md:mt-0 md:ml-auto md:mr-auto mb-[-40px] dot-icon cursor-pointer" onClick={onClick} xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 200 200">
                        <g className="dot-icon-dot">
                            <circle data-start-amount="1" data-end-amount="2" className="dot-4-st0" cx="100.5" cy="100.1"
                                    r="11"/>
                        </g>
                        <g className="dot-icon-dot">
                            <circle data-start-amount="1" data-end-amount="6" className="dot-4-st1" cx="100.5" cy="100.1"
                                    r="11"/>
                        </g>
                        <g className="dot-icon-dot">
                            <circle data-start-amount="1" data-end-amount="8" className="dot-4-st1" cx="100.5" cy="100.1"
                                    r="11"/>
                        </g>
                        <g className="dot-icon-circle">
                            <circle data-start-amount="0" data-end-amount="90" cx="100" cy="100" r="42"
                                    strokeDasharray="3.97 9.92"
                                    fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="2"/>
                        </g>
                        <g className="dot-icon-circle">
                            <circle data-start-amount="0" data-end-amount="-90" cx="100" cy="100" r="47"
                                    strokeDasharray="4.02 3.01"
                                    fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="2"/>
                        </g>
                    </svg>
                )
            }


            <p className="text-white text-base md:text-4xl">{title}</p>
        </div>
    );
}
