import React, {useState} from 'react';
import {useTranslation} from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import Menu, {MenuItem, SubMenu,} from 'rc-menu';
import {useRouter} from 'next/router';
import {ChevronDownIcon} from '@heroicons/react/20/solid';
import Search from './Search';
import {Drawer} from 'antd';
import Cookies from 'js-cookie';

function assignIds(data) {
    let count = 0; // 计数器，用于分配唯一编号
    const traverse = (node, path) => {
        count++;
        const id = path.length === 0 ? `${count}` : `${path.join('-')}-${count}`;
        node.id = id;
        node.children?.forEach((child, i) => traverse(child, [...path, count]));
    };
    data.forEach((node, i) => traverse(node, []));
    return data;
}

function getNodesWithChildren(treeData) {
    const ids = [];
    treeData.forEach((node) => {
        if (node.children && node.children.length > 0) {
            ids.push(node.id);
            ids.push(...getNodesWithChildren(node.children));
        }
    });
    return ids;
}

interface NavigationMenuProps {
    transparent?: boolean;
    navMenus?: [];
}

/*const generateTitleWithExpandIcon: (title: string) => JSX.Element = (title) => (
    <div className="flex justify-between">
        <p>{title}</p> <ChevronDownIcon className='ml-2 w-5 h-5 self-center'/>
    </div>
)*/

export default function NavigationMenu({transparent = false, navMenus = []}: NavigationMenuProps): JSX.Element {
    const router = useRouter();
    const changeTo: string = router.locale === 'en' ? 'zh' : 'en';


    // const navmenus = data?.navmenu?.translation?.navMenus?.navmenus || []
    const navmenus = navMenus || []


    const menus = assignIds(JSON.parse(JSON.stringify(navmenus)))
    const nodeIds = getNodesWithChildren(menus);


    const [open, setOpen] = useState(false);

    function toggleLang(lang: string) {
        let seconds = 3600;
        // @ts-ignore
        let expires = new Date(new Date() * 1 + seconds * 1000);
        // const Cookies = (await import('js-cookie')).default
        Cookies.set('NEXT_LOCALE', lang, {expires});
        if (lang === 'en') {
            window.location.href = '/'
        } else {
            window.location.href = '/zh'
        }
    }

    interface menuProp {
        id: string;
        title: string | JSX.Element;
        link: string;
        parent?: boolean;
        open?: boolean;
        children?: menuProp[];
    }

    function isLeaf(menu: menuProp): boolean {
        return menu.children == null || menu.children.length === 0;
    }

    function generateSubMenu(menu: menuProp): JSX.Element {

        if (isLeaf(menu)) {
            return (
                <MenuItem key={menu.id}
                          className="font-extralight"
                >
                    <Link href={menu.link ?? ''} className="font-extralight">
                        <a target={menu.open ? '_blank' : '_self'}>
                            {/*@ts-ignore*/}
                            <div dangerouslySetInnerHTML={{__html: menu.title}}></div>
                        </a>
                    </Link>
                </MenuItem>
            );
        }
        const titleWithLink: JSX.Element =
            <Link href={menu.link} className="font-extralight">
                <a target={menu.open ? '_blank' : '_self'}>
                    <div className="flex justify-between">
                        {/*@ts-ignore*/}
                        <p dangerouslySetInnerHTML={{__html: menu.title}}></p> <ChevronDownIcon
                        className='ml-2 w-5 h-5 self-center'/>
                    </div>
                </a>
            </Link>


        return (
            <SubMenu
                expandIcon={<div></div>}
                key={menu.id}
                title={titleWithLink}
                className="font-extralight"
                popupClassName="z-10 select-none cursor-pointer tcci-nav-rc-menu-sub font-extralight">
                {menu.children.map((item, index) => generateSubMenu(item))}
            </SubMenu>
        )
    }

    const {t} = useTranslation('common');
    const [locale, setLocale] = useState(router.locale);


    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div
                className={['tcci-nav', locale + '-tcci-nav', "flex py-4", "max-w-7xl mx-auto px-4 sm:px-6 md:px-8"].join(' ')}>
                <div className="w-[150px] md:w-[200px] items-center">
                    <Link href="/">
                        <a className={['block', 'relative', 'left-[-30px]'].join(' ')}>
                            <Image
                                src="/images/logo.png"
                                alt="logo"
                                height="64"
                                width="200"
                                objectFit="contain"
                            />
                        </a>
                    </Link>
                </div>


                <Menu
                    mode="horizontal"
                    className={['flex-grow flex justify-around items-center', locale + '-menu'].join(' ')}
                    selectable={false}
                    motion={{
                        motionName: 'rc-menu-open-slide-up',
                        motionAppear: true,
                        motionEnter: true,
                        motionLeave: true
                    }}
                >
                    {menus.map((item) => generateSubMenu(item))}
                </Menu>


                <div className="flex content-center text-neutral-50 items-center">

                    <div className={`w-nav-control mr-4 ${open && 'active'}`}
                         onClick={showDrawer}
                    >
                        <div className="w-nav-icon"><i></i></div>
                    </div>


                    <Search/>
                    <button className="m-4 hover:text-tcci-orange-o70 !mr-0"
                            onClick={() => toggleLang(changeTo)}>{t('To lang', {changeTo})}</button>
                </div>
            </div>
            <Drawer
                className='m-tcci-nav'
                placement="right"
                onClose={onClose}
                open={open}
                contentWrapperStyle={{
                    width: '100%'
                }}
            >

                <Menu
                    mode="inline"
                    forceSubMenuRender={true}
                    className={['m-' + locale + '-menu'].join(' ')}
                    selectable={false}
                    defaultOpenKeys={nodeIds}
                >
                    {menus.map((item) => generateSubMenu(item))}
                </Menu>

            </Drawer>
        </>
    );
}

// NavigationMenu.query = gql`
// query GetMenuData($language: LanguageCodeEnum = EN) {
//   navmenu(id: "11891", idType: DATABASE_ID) {
//     translation(language: $language) {
//       navMenus {
//         navmenus {
//           link
//           parent
//           title
//           children {
//             link
//             title
//             children {
//               link
//               title
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `;
