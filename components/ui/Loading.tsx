import ReactLoading from 'react-loading';

export default function Loading({className}: { className?: string }) {
    return (
        // @ts-ignore
        <ReactLoading type="cubes" color="rgba(240, 80, 34, 1)" className={["mx-auto my-16", className].join(' ')}/>
    );
}
