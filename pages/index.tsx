import {getWordPressProps, WordPressTemplate} from '@faustwp/core';
import {GetStaticPropsContext} from 'next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';


export default function Page(props) {
    return <WordPressTemplate {...props} />;
}

export async function getStaticProps(ctx: GetStaticPropsContext) {

    const wpProps = await getWordPressProps({ctx});
    if ((wpProps as any).props) {
        Object.assign((wpProps as any).props, await serverSideTranslations(ctx.locale, ['common']), {locale: ctx.locale})
    }
    return {
        ...wpProps,
        revalidate: 120
    };
}
