interface CircleIconProps {
    className?: string;
    color?: string;
    onClick?: () => void;
}

export default function CircleIcon({
                                       className,
                                       color,
                                       onClick
                                   }: CircleIconProps) {

    // useEffect(() => {
    //   if (typeof window !== 'undefined') {
    //     gsap.registerPlugin(MotionPathPlugin);
    //     gsap.to("#inner-circle", {
    //       duration: 3.3,
    //       repeat: -1,
    //       ease: Linear.easeNone,
    //       motionPath:{
    //         path: "#inner-path", // 沿着轨迹运动
    //         align: "#inner-path",
    //         autoRotate: true,
    //         alignOrigin: [0.5, 0.5]
    //       }
    //     });
    //   }
    // }, []);

    return (
        <svg width="101px" height="101px" viewBox="0 0 101 101" version="1.1" xmlns="http://www.w3.org/2000/svg"
             className={className}
             onClick={onClick}
             xmlnsXlink="http://www.w3.org/1999/xlink">
            <defs>
                <path
                    d="M1263.5,746 C1287.52439,746 1307,726.524387 1307,702.5 C1307,678.475613 1287.52439,659 1263.5,659 C1239.47561,659 1220,678.475613 1220,702.5 C1220,726.524387 1239.47561,746 1263.5,746 Z"
                    id="path-rg710d7u2w-1"/>
                <mask id="mask-rg710d7u2w-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x={0} y={0}
                      width={87} height={87} fill="white">
                    <use xlinkHref="#path-rg710d7u2w-1"/>
                </mask>
                <path
                    d="M1263.5,753 C1291.39038,753 1314,730.39038 1314,702.5 C1314,674.60962 1291.39038,652 1263.5,652 C1235.60962,652 1213,674.60962 1213,702.5 C1213,730.39038 1235.60962,753 1263.5,753 Z"
                    id="path-rg710d7u2w-3"/>
                <mask id="mask-rg710d7u2w-4" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x={0} y={0}
                      width={101} height={101} fill="white">
                    <use xlinkHref="#path-rg710d7u2w-3"/>
                </mask>
            </defs>
            <g id="页面-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <g id="Studio-Display" transform="translate(-1213.000000, -652.000000)">
                    <use id="inner-circle" stroke="#FFFFFF" mask="url(#mask-rg710d7u2w-2)" strokeWidth={6}
                         fillOpacity={0}
                         fill="#FFFFFF" strokeDasharray="6,6" xlinkHref="#path-rg710d7u2w-1"/>
                    <use id="out-circle" stroke="#FFFFFF" mask="url(#mask-rg710d7u2w-4)" strokeWidth={6} fillOpacity={0}
                         fill="#FFFFFF" strokeDasharray="4,4" xlinkHref="#path-rg710d7u2w-3"/>
                    <circle id="center" fill="#9013FE" cx={1263} cy={703} r={11}/>
                    {/*<path d="M1263,744.995027 C1274.33333,744.995027 1285.68917,739.418599 1297.06751,728.265742" id="inner-path" stroke="#979797" />*/}
                </g>
            </g>
        </svg>
    );
}
