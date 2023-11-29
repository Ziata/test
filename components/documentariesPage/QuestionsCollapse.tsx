import {useTranslation} from 'next-i18next';
import {Collapse} from 'antd';
import {useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';

const {Panel} = Collapse;


export default function QuestionsCollapse(
    {
        className,
        index
    }: { className?: string, index: any }
) {
    const {t} = useTranslation('common');
    const panelMenu: { title: string, content: string }[] = [
        {
            title: t('Why does neuroscience matter'),
            content: t('Question Answer1'),
        },
        {
            title: t('Why do you young scientists play such an important role'),
            content: t('Question Answer3')
        },
    ];
    const panelMenu2: { title: string, content: string }[] = [
        {
            title: t('Why is more support needed for fundamental brain science'),
            content: t('Question Answer2'),
        },
        {
            title: t('Why Did the Tianqiao and Chrissy Chen Institute make this film'),
            content: t('Question Answer4'),
        },
    ];

    const [activeKey, setActiveKey] = useState(0);

    return (
        <div className={[
            "md:w-1/2",
            "w-full",
            className].join(' ')}>
            {/*<h3 className="text-3xl text-tcci-blue text-center">{t('Questions')}</h3>*/}
            {/*<p className="max-w-4xl mx-auto text-center">*/}
            {/*    {t('Frequently Asked Questions')}*/}
            {/*</p>*/}
            {index == 0 && (
                <div className="w-full md:pr-6">
                    <Collapse accordion={true}
                              ghost
                              expandIconPosition="end"
                              className="font-din question-panel"
                              expandIcon={({isActive}) => <PlusOutlined style={{color: "#FFF"}}
                                                                        rotate={isActive ? 360 : 0}/>}
                              >
                        {panelMenu.map((item, index) => (
                            <Panel
                                className='panel-border'
                                header={<h4
                                    className={["text-lg", 'text-white'].join(' ')}>{item.title}</h4>}
                                key={index}>
                                <div className="text-white text-base px-6 pb-8 pt-6 q-content"
                                     style={{
                                         listStyle:'initial'
                                     }}
                                     dangerouslySetInnerHTML={{
                                         // @ts-ignore
                                         __html: item.content
                                     }}
                                ></div>
                            </Panel>
                        ))}
                    </Collapse>
                </div>
            )}
            {index == 1 && (
                <div className="w-full md:pl-6">
                    <Collapse accordion={true}
                              ghost
                              expandIconPosition="end"
                              className="font-din question-panel"
                              expandIcon={({isActive}) => <PlusOutlined style={{color: "#FFF"}}
                                                                        rotate={isActive ? 360 : 0}/>}
                              >
                        {panelMenu2.map((item, index) => (
                            <Panel
                                className='panel-border'
                                header={<h4
                                    className={["text-lg", 'text-white'].join(' ')}>{item.title}</h4>}
                                key={index}>
                                <div className="text-white text-base px-6 pb-8 pt-6 q-content"
                                     dangerouslySetInnerHTML={{
                                         // @ts-ignore
                                         __html: item.content
                                     }}
                                ></div>
                            </Panel>
                        ))}
                    </Collapse>

                </div>
            )}
        </div>
    );
}
