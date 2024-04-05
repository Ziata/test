import { IHeader } from "@/services/interface";
import Head from "next/head";



function HeadSEO({headerData}: {headerData:IHeader}) {
    return <Head>
            <title>{headerData.site_title}</title>
            <meta property="og:image" content={headerData.site_icon}/>
            <link rel="icon" href={headerData.site_icon} />
            </Head>
}

export default HeadSEO