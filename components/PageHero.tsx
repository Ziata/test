import Image from 'next/future/image';
import React from 'react';

interface PageHeroProps {
    title: string;
    content?: string | JSX.Element;
    heroImageUrl: string;
    isImageBottom?: boolean;
    articleInfo?: JSX.Element;
    contentClass?: any;
    imageClass?: string;
    imageWrapClass?: string;
}

export default function PageHero({
                                     title,
                                     content,
                                     heroImageUrl,
                                     isImageBottom = true,
                                     articleInfo,
                                     contentClass,
                                     imageClass = '',
                                     imageWrapClass = ''
                                 }: PageHeroProps) {

    let contentElement: JSX.Element = null;
    if (typeof content === 'string') {
        contentElement = <div dangerouslySetInnerHTML={{__html: content}}
                              className={["text-neutral-500 my-8", contentClass].join(' ')}></div>;
    } else {
        contentElement = <div className={["text-neutral-500 my-8", contentClass].join(' ')}>{content}</div>;
    }


    return (
        <section className="mt-0 page-content">
            <header className="text-tcci-blue">
                <h1 className="mb-8">
                    <span className="text-3xl capitalize-title">{title}</span>
                </h1>
                {articleInfo && <h2 className="my-8 text-sm"><span>{articleInfo}</span></h2>}
            </header>
            {isImageBottom && contentElement}
            <div
                className={["w-full h-[22.5rem] relative", imageWrapClass].join(' ')}
                style={{backdropFilter: 'blur(10px)'}}
            >
                {
                    heroImageUrl && (
                        <Image
                            fill
                            src={heroImageUrl ?? ''}
                            alt={title}
                            priority={true}
                            className={["w-full h-64 object-cover bg-center", imageClass].join(' ')}
                        />
                    )
                }

            </div>
            {!isImageBottom && contentElement}
        </section>
    );
}
