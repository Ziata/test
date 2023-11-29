import {NextRouter} from 'next/router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function isDefaultLocale(router: NextRouter): boolean {
    return router.locale === router.defaultLocale;
}

export function toLocaleString(router: NextRouter): string {
    const {locale} = router;
    switch (locale) {
        case 'en':
            return 'en-US';
        case 'zh':
            return 'zh-CN';
        default:
            return 'en-US';
    }
}

export function toLocaleDateString(date: Date, router: NextRouter, yearMonthMode = false): string {

    if (date instanceof Date) {

        const {locale} = router;
        const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const year: number = date.getFullYear();
        const month: number = date.getMonth();
        const day: string = `0${date.getDate()}`.slice(-2);

        if (yearMonthMode) {
            switch (locale) {
                case 'en':
                    return `${months[month]} ${year}`;
                case 'zh':
                    const monthZh: string = `0${month + 1}`.slice(-2);
                    return `${year}年${monthZh}月`;
            }
        } else {
            switch (locale) {
                case 'en':
                    return `${months[month]} ${day}, ${year}`;
                case 'zh':
                    const monthZh: string = `0${month + 1}`.slice(-2);
                    return `${year}年${monthZh}月${day}日`;
            }
        }
    }
    return '';
}
export function toLocaleYearDateString(date: Date, router: NextRouter): string {
    if (date instanceof Date) {
        const {locale} = router;
        const year: number = date.getFullYear();

        switch (locale) {
            case 'en':
                return `${year}`;
            case 'zh':
                return `${year}年`;
        }
    }
    return '';
}

export function toUpperLocale(router: NextRouter): string {
    return router.locale.toUpperCase();
}

export function getUpperLocaleByUri(uri: string): string {
    if (typeof uri === 'string') {
        const arr: string[] = uri.split('/');
        if (arr[0].toUpperCase() === 'ZH') {
            return 'ZH';
        }
    }
    return 'EN';
}
