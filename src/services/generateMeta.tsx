import Head from "next/head";

interface Props {
    title: string,
}

function HeadSEO(props: Props) {
    return <Head><title>{props.title}</title>
            <meta name="description" content={'rgerg'} />
            <meta property="og:image" content={'https://nextquestion.g-team.org/wp-content/uploads/2023/11/next_question_logo_h_w_cm.svg'}/>
            <link rel="icon" href={'efwegwerg'} />
    </Head>
}

export default HeadSEO