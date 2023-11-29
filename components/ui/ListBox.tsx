import {Fragment, useEffect, useState} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import {CheckIcon} from '@heroicons/react/20/solid';
import {PlainMenuProp} from '../PlainMenu';
import SelectIcon from '../icons/SelectIcon'

export interface ListBoxProps {
    menus: PlainMenuProp[];
    className?: string;
    optionsClassName?: string;
    position?: string;
    selectId?: string;
    onChange?: (selectId: string) => void;
}

export default function ListBox(
    {
        menus,
        position,
        className = '',
        optionsClassName = '',
        selectId,
        onChange = () => {
        }
    }
        : ListBoxProps) {
    const [selected, setSelected] = useState(menus.filter((menus) => menus.id === decodeURIComponent(selectId))[0]);

    useEffect(() => {
        setSelected(menus.filter((menus) => menus.id === selectId)[0]);
    }, [menus, selectId],);

    function changeHandler(menu: PlainMenuProp) {
        setSelected(menu);
        onChange(menu.id);
    }



    return (
        <div className={["", className].join(' ')}>
            <Listbox value={selected} onChange={changeHandler}>
                <div className="relative mt-1">
                    <Listbox.Button
                        className="relative w-auto  cursor-default py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-tcci-orange-o70 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-base">
                        <span className="block truncate text-[#1A73E8]">{selected.title}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {/*<ChevronUpDownIcon
                  className="h-5 w-5 text-neutral-400"
                  aria-hidden="true"
              />*/}
                            <SelectIcon/>
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
                            className={
                                [
                                    'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10 min-w-[150px]',
                                    position == 'left' ? '-left-full' : '',
                                    optionsClassName
                                ].join(' ')
                            }
                        >
                            {menus.map((item, index) => (
                                <Listbox.Option
                                    data-type={item.id}
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
                      >
                        {item.title}
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
