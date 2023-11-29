import {Fragment, useEffect, useState} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import {CheckIcon} from '@heroicons/react/20/solid';
import {PlainMenuProp} from '../PlainMenu';
import {ListBoxProps} from './ListBox';

interface ListBoxPlainProps extends ListBoxProps {
    menuTitle?: string
    allId?: string;
    buttonClassName?: string;
    titleClassName?: string;
    optionsClassName?: string;
}

export default function ListBoxPlain(
    {
        menuTitle,
        allId = 'All',
        menus,
        className = '',
        buttonClassName = '',
        titleClassName = '',
        optionsClassName = '',
        selectId,
        onChange = () => {
        }
    }: ListBoxPlainProps) {
    const filteredMenu = menus.filter((menus) => menus.id === selectId);
    const initMenu = filteredMenu.length ? filteredMenu[0] : menus[0];

    const [selected, setSelected] = useState(initMenu);

    useEffect(() => {
        setSelected(menus.filter((menus) => menus.id === selectId)[0]);
    }, [menus, selectId]);

    function changeHandler(menu: PlainMenuProp) {
        setSelected(menu);
        onChange(menu.id);
    }



    return (
        <div className={['text-tcci-blue inline-block', className].join(' ')}>
            <Listbox value={selected} onChange={changeHandler}>
                <div className="relative mt-1">
                    <Listbox.Button
                        className={['relative w-full min-h-[4rem] cursor-pointer py-2 pl-10 pr-10 text-left focus:outline-none focus-visible:border-tcci-orange-o70 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm', buttonClassName].join(' ')}>
                        <span
                            className={["block truncate transition-all duration-500", selected?.id === allId ? 'text-base' : 'hidden', titleClassName].join(' ')}>{menuTitle}</span>
                        <span title={selected?.title as string ?? ''}
                              className={["block truncate transition-all duration-500 text-tcci-orange text-base", selected?.id === allId ? 'h-0' : 'h-6',].join(' ')}>{selected?.title}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">

            <span
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 6" fill="none" width="11" height="6"><path
                    d="M1.49519 0L5.23257 3.75L8.96994 0L10.4649 0.75L5.23257 6L0.000244142 0.75L1.49519 0Z"
                    fill="#002C47"></path></svg>
            </span>



            </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className={[
                                "absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10",
                                optionsClassName,
                            ].join(' ')}>
                            {menus.map((item, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({active}) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-tcci-orange-o70 text-neutral-50' : 'text-neutral-900'
                                        }`

                                    }
                                    value={item}
                                >
                                    {({selected}) => (
                                        <>
                      <span
                          className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                          }`}
                          title={item?.title as string ?? ''}
                      >
                        {item?.title}
                      </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 text-tcci-orange-o70`}>
                          <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
