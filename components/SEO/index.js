import Head from 'next/head';
import Script from 'next/script';

/**
 * Provide SEO related meta tags to a page.
 *
 * @param {Props} props The props object.
 * @param {string} props.title Used for the page title, og:title, twitter:title, etc.
 * @param {string} props.description Used for the meta description, og:description, twitter:description, etc.
 * @param {string} props.imageUrl Used for the og:image and twitter:image. NOTE: Must be an absolute url.
 * @param {string} props.url Used for the og:url and twitter:url.
 *
 * @returns {React.ReactElement} The SEO component
 */
export default function SEO({title, description, content = '', imageUrl, url}) {
    if (!title && !description && !imageUrl && !url) {
        return null;
    }

    const htmlDecodeByRegExp = function (str) {
        let temp = "";
        if (str.length == 0) return "";
        temp = str.replace(/&amp;/g, "&");
        temp = temp.replace(/&lt;/g, "<");
        temp = temp.replace(/&gt;/g, ">");
        temp = temp.replace(/&nbsp;/g, " ");
        temp = temp.replace(/&#39;/g, "\'");
        temp = temp.replace(/&quot;/g, "\"");
        return temp;
    }
    const reg = /<[^>]+>/g;
    let text = content.replace(reg, '');

    return (
        <>

            <Head>
                <meta property="og:type" content="website"/>
                <meta property="twitter:card" content="summary_large_image"/>


                {title && (
                    <>
                        <title>{htmlDecodeByRegExp(title)}</title>
                        <meta name="title" content={title}/>
                        <meta property="og:title" content={title}/>
                        <meta property="twitter:title" content={title}/>
                        <meta name="og:site_name" contect={title}/>
                    </>
                )}

                {description && (
                    <>
                        <meta name="description" content={text || description}/>
                        <meta property="og:description" content={text || description}/>
                        <meta name="description" property="og:description" content={text || description}/>
                        <meta property="twitter:description" content={text || description}/>
                        <meta name="author" content={description}/>
                    </>
                )}

                {imageUrl && (
                    <>
                        <meta property="og:image" content={imageUrl}/>
                        <meta property="twitter:image" content={imageUrl}/>
                    </>
                )}

                {url && (
                    <>
                        <meta property="og:url" content={url}/>
                        <meta property="twitter:url" content={url}/>
                    </>
                )}

            </Head>



        </>
    );
}
