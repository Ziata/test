import {useTranslation} from 'next-i18next';
import Link from 'next/link';
import LinkedInIcon from './icons/LinkedInIcon';
import TwitterIcon from './icons/TwitterIcon';
import Section from './layout/Section';
import React from "react";


export interface SocialProps {
    id: string;
    link: string
    icon?: JSX.Element
}

function Footer({footermenus = []}): JSX.Element {

    const {t} = useTranslation('common');
    const year = new Date().getFullYear();
    const iconClass = "w-6 h-6 fill-neutral-500 hover:fill-tcci-orange-o70"
    const menus = [
        {
            id: '1',
            title: <span>&#169; {year} {t('Tianqiao and Chrissy Chen Institute')}</span>,
            link: '/'
        },
        // {
        //     id: '2',
        //     title: t('Terms of Use'),
        //     link: '/terms-of-use'
        // },
        // {
        //     id: '3',
        //     title: t('Privacy Policy'),
        //     link: '/privacy-policy'
        // },
        // {
        //     id: '4',
        //     title: t('Contact Us'),
        //     link: '/contact-us'
        // },
        // {
        //     id: '5',
        //     title: t('Newsletter'),
        //     link: '/newsletter'
        // }
    ];
    const socialIcons: SocialProps[] = [
        {
            id: '1',
            icon: <LinkedInIcon className={iconClass}/>,
            link: 'https://www.linkedin.com/company/tianqiao_and_chrissy_chen_institute?originalSubdomain=hk'
        },
        {
            id: '2',
            icon: <TwitterIcon className={iconClass}/>,
            link: 'https://twitter.com/ChenInstitute'
        },
        // {
        //   id: '3',
        //   icon: <WeChatIcon className={iconClass}/>,
        //   link: '#'
        // }
    ];


    menus.push(...footermenus);


    return (
        <Section className="!my-0 pb-5">
            <div className='border-t border-solid  border-{rgba(0, 0, 0, 0.2)} mb-5'></div>
            {/*<footer className="flex flex-wrap justify-between lg:justify-between">
                <PlainMenu menus={menus} className="block lg:flex lg:space-x-12"
                           textClass="text-neutral-500 hover:text-tcci-orange-o70 text-sm"></PlainMenu>
                <ul className="flex space-x-4">
                    {socialIcons.map((item) => (
                        <li key={item.id}><Link href={item.link ?? ''} passHref><a
                            target="_blank">{item.icon}</a></Link></li>
                    ))}
                </ul>
            </footer>*/}
            {/*<footer className={[
                "flex flex-wrap justify-between flex-col items-center",
                "lg:flex-row  lg:justify-between"
            ].join(' ')}>
                <PlainMenu menus={menus} className="block lg:flex lg:space-x-12 text-center lg:text-left"
                           textClass="text-neutral-500 hover:text-tcci-orange-o70 text-sm"></PlainMenu>
                <ul className="flex space-x-4 lg:mt-0 mt-2">
                    {socialIcons.map((item) => (
                        <li key={item.id}><Link href={item.link ?? ''} passHref><a
                            target="_blank">{item.icon}</a></Link></li>
                    ))}
                </ul>
            </footer>*/}


            <footer className="flex flex-wrap justify-between">


                <ul className="flex flex-wrap space-x-12 1   hidden lg:flex">
                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm">
                        {menus[0].title}
                    </li>

                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm">
                        {/*@ts-ignore*/}
                        <Link href={menus[1].link}><a dangerouslySetInnerHTML={{__html: menus[1].title}}></a></Link>
                    </li>

                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm ">
                        {/*@ts-ignore*/}
                        <Link href={menus[2].link}><a dangerouslySetInnerHTML={{__html: menus[2].title}}></a></Link>
                    </li>

                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm ">
                        {/*@ts-ignore*/}
                        <Link href={menus[3].link}><a dangerouslySetInnerHTML={{__html: menus[3].title}}></a></Link>
                    </li>

                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm ">
                        {/*@ts-ignore*/}
                        <Link href={menus[4].link}><a dangerouslySetInnerHTML={{__html: menus[4].title}}></a></Link>
                    </li>

                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm ">
                        {/*@ts-ignore*/}
                        <Link href={menus[5].link}><a target='_blank' dangerouslySetInnerHTML={{__html: menus[5].title}}></a></Link>
                    </li>

                    <li className="flex lg:hidden">
                        <Link href={socialIcons[0].link ?? ''} passHref><a
                            className="mr-4"
                            target="_blank">{socialIcons[0].icon}</a></Link>

                        <Link href={socialIcons[1].link ?? ''} passHref><a
                            target="_blank">{socialIcons[1].icon}</a></Link>
                    </li>
                </ul>
                <ul className="space-x-4 lg:mt-0 mt-2 hidden lg:flex">
                    <li>
                        <Link href={socialIcons[0].link ?? ''} passHref><a
                            target="_blank">{socialIcons[0].icon}</a></Link>
                    </li>

                    <li>
                        <Link href={socialIcons[1].link ?? ''} passHref><a
                            target="_blank">{socialIcons[1].icon}</a></Link>
                    </li>
                </ul>


                <ul className="flex flex-wrap space-x-12 sm:flex  md:flex lg:hidden 2 w-full">
                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm w-full">
                        {menus[0].title}
                    </li>
                </ul>
                <ul className="hidden flex-wrap space-x-12 sm:flex  md:flex lg:hidden 3 mt-2 lg:mt-0">

                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm">
                        {/*@ts-ignore*/}
                        <Link href={menus[1].link}><a dangerouslySetInnerHTML={{__html: menus[1].title}}></a></Link>
                    </li>

                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm ">
                        {/*@ts-ignore*/}
                        <Link href={menus[2].link}><a dangerouslySetInnerHTML={{__html: menus[2].title}}></a></Link>
                    </li>

                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm ">
                        {/*@ts-ignore*/}
                        <Link href={menus[3].link}><a dangerouslySetInnerHTML={{__html: menus[3].title}}></a></Link>
                    </li>

                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm ">
                        {/*@ts-ignore*/}
                        <Link href={menus[4].link}><a dangerouslySetInnerHTML={{__html: menus[4].title}}></a></Link>
                    </li>

                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm ">
                        {/*@ts-ignore*/}
                        <Link href={menus[5].link}><a target='_blank' dangerouslySetInnerHTML={{__html: menus[5].title}}></a></Link>
                    </li>



                    <li className="flex lg:hidden">
                        <Link href={socialIcons[0].link ?? ''} passHref><a
                            className="mr-4"
                            target="_blank">{socialIcons[0].icon}</a></Link>

                        <Link href={socialIcons[1].link ?? ''} passHref><a
                            target="_blank">{socialIcons[1].icon}</a></Link>
                    </li>

                </ul>


                <ul className="flex flex-wrap  sm:hidden 4 mt-2 lg:mt-0 w-full">

                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm mr-12">
                        {/*@ts-ignore*/}
                        <Link href={menus[1].link}><a dangerouslySetInnerHTML={{__html: menus[1].title}}></a></Link>
                    </li>

                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm mr-12">
                        {/*@ts-ignore*/}
                        <Link href={menus[2].link}><a dangerouslySetInnerHTML={{__html: menus[2].title}}></a></Link>
                    </li>

                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm ">
                        {/*@ts-ignore*/}
                        <Link href={menus[3].link}><a dangerouslySetInnerHTML={{__html: menus[3].title}}></a></Link>
                    </li>

                </ul>

                <ul className="flex flex-wrap  sm:hidden 5 mt-2 lg:mt-0">

                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm mr-12">
                        {/*@ts-ignore*/}
                        <Link href={menus[4].link}><a dangerouslySetInnerHTML={{__html: menus[4].title}}></a></Link>
                    </li>
                    <li className="text-tcci-blue select-none cursor-pointer text-neutral-500 hover:text-tcci-orange-o70 text-sm mr-4">
                        {/*@ts-ignore*/}
                        <Link href={menus[5].link}><a target='_blank' dangerouslySetInnerHTML={{__html: menus[5].title}}></a></Link>
                    </li>

                    <li className="flex lg:hidden">
                        <Link href={socialIcons[0].link ?? ''} passHref><a
                            className="mr-4"
                            target="_blank">{socialIcons[0].icon}</a></Link>

                        <Link href={socialIcons[1].link ?? ''} passHref><a
                            target="_blank">{socialIcons[1].icon}</a></Link>
                    </li>

                </ul>


            </footer>

        </Section>
    );
}

export default Footer;


