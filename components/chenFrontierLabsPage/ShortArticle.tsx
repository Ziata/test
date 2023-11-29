interface ShortArticleProps {
    title: string;
    content?: string;
    className?: string;
    smallText?: boolean
}

export default function ShortArticle({
                                         title,
                                         content = '',
                                         className = '',
                                         smallText = false
                                     }: ShortArticleProps): JSX.Element {
    return (
        <section className={className}>
            <h2 className='text-center'><span className={smallText ? 'text-xl' : 'text-3xl'}
                                              dangerouslySetInnerHTML={{__html: title}}></span></h2>
            <p className={["text-neutral-500 text-center", smallText ? 'text-sm' : 'text-base'].join(' ')}
               dangerouslySetInnerHTML={{__html: content}}></p>
        </section>
    );
};
