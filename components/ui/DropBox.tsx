import React, {Fragment, useState} from 'react';
import {Popover, Transition} from '@headlessui/react';
import {usePopper} from 'react-popper';
import {right} from '@popperjs/core';

const usePositioningPopper = () => {
    const [referenceElement, setReferenceElement] = useState();
    const [popperElement, setPopperElement] = useState();
    const {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: right
    });
    return {
        referenceElement,
        setReferenceElement,
        popperElement,
        setPopperElement,
        styles,
        attributes
    }
};

interface DropBoxProps {
    className?: string;
    button: React.ReactNode;
    panel: React.ReactNode;
}

export default function DropBox(
    {
        className = '',
        button,
        panel
    }: DropBoxProps) {


    const {
        setReferenceElement,
        setPopperElement,
        styles,
        attributes
    } = usePositioningPopper();

    return (
        <Popover className={[className].join(' ')}>
            {({open}) => (
                <>
                    <Popover.Button
                        // @ts-ignore
                        ref={setReferenceElement}
                        className="w-full h-full cursor-pointer sm:text-sm focus:outline-none">
                        {button}
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Popover.Panel
                            // @ts-ignore
                            ref={setPopperElement}
                            style={styles.popper}
                            {...attributes.popper}
                            className="z-10 p-4 rounded-md bg-white py-1 text-base shadow-lg sm:text-sm">
                            {panel}
                        </Popover.Panel>
                    </Transition>
                </>)}
        </Popover>
    )
}
