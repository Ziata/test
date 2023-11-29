import {Collapse} from 'antd';
import Image from 'next/future/image';
import {useState} from 'react';

const {Panel} = Collapse;


export default function OurPriorities({className, visionPage}: { className?: string, visionPage: any }) {
    const imageMenu = [];
    const panelMenu = visionPage.list || [];
    panelMenu.forEach((item) => {
        imageMenu.push(item.image.sourceUrl)
    });

    const [activeKey, setActiveKey] = useState(0);



    return (
        <div className={["text-neutral-500 space-y-8 page-content", className].join(' ')}>
            <h3 className="text-3xl text-tcci-blue text-center"
                dangerouslySetInnerHTML={{__html: visionPage.title}}></h3>
            <div className="max-w-4xl mx-auto text-center"
               dangerouslySetInnerHTML={{__html: visionPage.content}}
            ></div>
            <div className="  flex flex-col lg:flex-row lg:items-center">
                <div className="relative h-[20rem] sm:h-[36rem]  w-full lg:w-1/2">
                    {
                        imageMenu.map((item, index) => {
                            return (
                                <Image
                                    key={index}
                                    src={item}
                                    alt={'title'}
                                    fill
                                    className={[
                                        'w-full h-full object-cover ',
                                        index == activeKey ? 'block' : 'hidden'
                                    ].join(' ')}
                                />
                            )
                        })
                    }

                </div>
                <div className="w-full lg:w-1/2 py-8 lg:px-8">
                    <Collapse accordion={true}
                              ghost
                              expandIconPosition="end"
                              className="font-din"
                              defaultActiveKey={activeKey}
                              onChange={(key) => {
                                  [0, 1, 2].includes(Number(key))
                                      ? setActiveKey(Number(key))
                                      : setActiveKey(0);
                              }}>
                        {panelMenu.map((item, index) => (
                            <Panel
                                forceRender={true}
                                className='panel-border'
                                header={<h4
                                    className={["text-lg", activeKey === index ? 'text-tcci-orange' : 'text-tcci-blue'].join(' ')} dangerouslySetInnerHTML={{__html:item.title}}></h4>}
                                key={index}>
                                <div className="text-neutral-500 text-base" dangerouslySetInnerHTML={{__html:item.content}}></div>
                            </Panel>
                        ))}
                    </Collapse>
                </div>
            </div>
        </div>
    );
}
