import RCPagination from 'rc-pagination';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid';
import {PaginationProps} from './PaginationDash';
import Link from 'next/link';
import dayjs from "dayjs";
import React from "react";
import {useRouter} from "next/router";

const stripItemRender = (current, type, element, state, router) => {

    let linkData: any = {
        event: '',
        organizer: '',
        location: '',
        researchField: '',
        startDate: '',
        endDate: '',
        view: 'Photo View',
        page: 1,
        PAGE_TYPE: '',
    }
    let linkStr = ''

    if (state?.PAGE_TYPE == 'SupportingScientificMeetingsAndConferences') {

        let startDate: string = dayjs(state.startDate).format('YYYY-MM-DD');
        let endDate: string = dayjs(state.endDate).format('YYYY-MM-DD');


        linkData = {
            event: state.eventType == 'All' ? "" : state.eventType,
            organizer: state.organizerType == 'All' ? "" : state.organizerType,
            location: state.locationType == 'All' ? "" : state.locationType,
            researchField: state.researchFieldType == 'All' ? "" : state.researchFieldType,
            startDate,
            endDate,
            view: 'Photo View',
            page: state.page,
        }
        if (startDate == '2016-01-01') {
            linkData.startDate = ''
        }
        if (endDate == '2099-01-01') {
            linkData.endDate = ''
        }

        linkStr = window.location.pathname + `?event=${linkData.event}&organizer=${linkData.organizer}&location=${linkData.location}&researchField=${linkData.researchField}&startDate=${linkData.startDate}&endDate=${linkData.endDate}&view=${linkData.view}&page=${current}`
    }

    if (state?.PAGE_TYPE == 'MeetingReports') {

        linkData = {
            year: state.yearType == 'All' ? "" : state.yearType,
            meetingReports: state.meetingReportType == 'All' ? "" : state.meetingReportType,
            page: state.page,
        }
        if (linkData.meetingReports == undefined) {
            linkData.meetingReports = ''
        }


        linkStr = window.location.pathname + `?year=${linkData.year}&meetingReports=${linkData.meetingReports}&page=${current}`
    }

    if (state?.PAGE_TYPE == 'Newsroom') {

        linkData = {
            year: state.yearType == 'All' ? "" : state.yearType,
            meetingReports: state.meetingReportType == 'All' ? "" : state.meetingReportType,
            category: state.categoryType == 'All' ? "" : state.categoryType,
            page: state.page,
        }
        if (linkData.meetingReports == undefined) {
            linkData.meetingReports = ''
        }


        linkStr = window.location.pathname + `?year=${linkData.year}&category=${linkData.category}&meetingReports=${linkData.meetingReports}&page=${current}`
    }

    if (state?.PAGE_TYPE == 'Search' || state?.PAGE_TYPE == 'SearchPhotoView') {
        linkStr = window.location.pathname + `?type=${router.query.type}&search=${router.query.search}&page=${current}`
    }


    if (type === 'page') {
        let num = current.toString();
        if (current < 10) {
            num = '0' + current;
        }
        if (state) {

            return (
                <Link href={linkStr} passHref>
                    <a className="w-5 h-5 text-tcci-orange-o70 hover:text-tcci-orange-o70 pr-2">
                        <span aria-hidden={true}>{num}</span>
                    </a>
                </Link>
            )
        }
        return <span className="w-5 h-5 text-inherit hover:text-tcci-orange-o70 pr-2" aria-hidden={true}>{num}</span>;
    }
    if (type === 'prev') {
        if (state) {
            return (
                <Link href={linkStr} passHref>
                    <a className="inline">
                        <ChevronLeftIcon className="w-6 h-6 text-neutral-500 hover:text-tcci-orange-o70"
                                         aria-hidden={true}/>
                    </a>
                </Link>
            )
        }
        return <ChevronLeftIcon className="w-6 h-6 text-neutral-500 hover:text-tcci-orange-o70" aria-hidden={true}/>
    }
    if (type === 'next') {
        if (state) {
            return (
                <Link href={linkStr} passHref>
                    <a className="inlb">
                        <ChevronRightIcon className="w-6 h-6 text-neutral-500 hover:text-tcci-orange-o70"
                                          aria-hidden={true}/>
                    </a>
                </Link>
            )
        }
        return <ChevronRightIcon className="w-6 h-6 text-neutral-500 hover:text-tcci-orange-o70" aria-hidden={true}/>
    }
    return element;
}

export default function PaginationNumber(
    {
        className = '',
        total,
        state,
        current,
        pageSize,
        onChange
    }: PaginationProps
) {
    const router = useRouter();

    return (
        <>
            {
                // @ts-ignore
                total ? (<RCPagination
                    className={['space-x-3', className].join(' ')}
                    total={total}
                    pageSize={pageSize}
                    itemRender={(current, type, element) => {
                        return stripItemRender(current, type, element, state, router)
                    }}
                    current={current}
                    onChange={onChange}
                />) : null
            }
        </>


    );
}
