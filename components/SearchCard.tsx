import Link from 'next/link';
import highlightWords, {HighlightWords} from 'highlight-words';
import {split} from 'sentence-splitter';

export interface SearchCardProp {
    title: string;
    content: string;
    link?: string;
}


export interface SearchCardProps {
    post: SearchCardProp;
    highlightTest: string;
}

const generateHighlightText = (chunk: HighlightWords.Chunk[]): JSX.Element[] => chunk.map(
    (item, index) => {
        if (item.match) {
            return <mark key={index}>{item.text}</mark>;
        }
        return <span key={index}>{item.text}</span>;
    }
);

const stripHTML = (text: string): string => {
    if (!text) return ''
    return text.replace(/<[^>]*>?/gm, '')
        .replaceAll('\n', '')
        .replaceAll('\t', '')
        .replaceAll('&nbsp;', '');
}

export default function SearchCard({
                                       post,
                                       highlightTest = ''
                                   }: SearchCardProps) {

    const titleChunks = highlightWords({
        text: stripHTML(post.title),
        query: highlightTest
    });

    let sentences = split(stripHTML(post.content)).map((item) => item.raw).filter((item) => item.toLowerCase().includes(highlightTest.toLowerCase()));
    sentences = sentences.map((item) => (item.startsWith("”，") ? item.replace("”，", '') : item)).slice(0, 2);
    const allContentChunks = sentences.map((item) => highlightWords({
        text: item,
        query: highlightTest
    }));

    return (
        <Link href={post.link ?? ''}>
            <a className="box-content hover:bg-tcci-grey block" target="_blank">
                <h3 className="font-bold mb-2">{generateHighlightText(titleChunks)}</h3>
                {allContentChunks.map((item, index) => <p key={index}>{generateHighlightText(item)}</p>)}

            </a>
        </Link>
    );
}
