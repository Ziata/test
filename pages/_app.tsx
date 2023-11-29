// @ts-nocheck
import '../faust.config';
import React from 'react';
import {useRouter} from 'next/router';
import {FaustProvider} from '@faustwp/core';
import 'rc-menu/assets/index.css';
import 'rc-pagination/assets/index.css';
import 'animate.css';
import '../styles/antd-calendar.css';
import '../styles/rc-menu.scss';
import '../styles/other.css';
import '../styles/global.scss';
import {appWithTranslation} from 'next-i18next';
import type {AppProps} from 'next/app';
import ReactGA from "react-ga4";
import { GA_TRACKING_ID } from '../utils/gtag.js'


function App({Component, pageProps}: AppProps) {
    const router = useRouter();
    ReactGA.initialize(GA_TRACKING_ID);

    return (
        <FaustProvider pageProps={pageProps}>
            <Component {...pageProps} key={router.asPath}></Component>
        </FaustProvider>
    );
}

export default appWithTranslation(App);
