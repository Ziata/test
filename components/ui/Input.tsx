import {InputHTMLAttributes} from 'react';

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
    return <input type="text" placeholder={props?.placeholder ?? '' + (props.required ? ' *' : '')} {...props}
                  className={["px-4 py-2 w-full rounded-xl border border-neutral-400 focus:border-tcci-orange focus:outline-none border-solid", props.className].join(' ')}/>;
}
