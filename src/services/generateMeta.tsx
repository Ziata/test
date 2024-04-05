import Head from "next/head";

interface Props {
    title: string
}

function HeadSEO(props: Props) {
    return <Head><title>{props.title}</title>
            <meta name="description" content={'rgerg'} />
            <meta property="og:image" content={'egwreg'}/>
            <link rel="icon" href={'efwegwerg'} />
    </Head>
}

export default HeadSEO