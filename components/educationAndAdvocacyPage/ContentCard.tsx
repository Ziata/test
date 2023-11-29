import ChevronRightLinkHtml from './ChevronRightLinkHtml';
import Image from 'next/future/image';

export interface ContentCardProps {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    backgroundColor: string;
    className?: string;
    links?: [any];
}

export default function ContentCard({
                                        title,
                                        description,
                                        imageUrl,
                                        links,
                                        backgroundColor,
                                        className = ''
                                    }: ContentCardProps) {


    const renderLinks = () => {
        if (!links.length) return null

        return links.map((itme, index) => {
            return (
                <div className="inline mb-4" key={index}>
                    {
                        itme.linkText&&(<div className="inline text-[#6d6d6d]" dangerouslySetInnerHTML={{__html:itme.linkText}}></div>)
                    }

                    <ChevronRightLinkHtml
                        content={itme.linkDescription}
                        link={itme.link}
                        target="_blank"
                        key={index}/>
                </div>
            )
        })
    }

    return (
        <div className={["flex flex-col lg:flex-row lg:items-center", backgroundColor, className].join(' ')}>
            <div
                className="flex flex-col lg:w-1/2 h-1/2 lg:h-full items-center justify-center  p-6 lg:p-12 text-center">
                <h3 className="text-2xl font-bold text-tcci-orange">{title}</h3>
                <div className="mt-4 text-[#6d6d6d] mb-12" dangerouslySetInnerHTML={{__html: description}}></div>

                {
                    renderLinks()
                }

            </div>
            <div
                className="h-[20rem]  lg:h-full relative  lg:absolute lg:right-0 lg:top-0 flex justify-center lg:w-1/2 ">
                <Image
                    src={imageUrl ?? ''}
                    alt={title}
                    fill
                    className="w-full  lg:h-1/2 lg:w-1/2 h-full object-cover"
                />
            </div>
        </div>
    );
}
