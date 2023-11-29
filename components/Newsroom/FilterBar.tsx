import {useTranslation} from 'next-i18next';
import {PlainMenuProp} from '../PlainMenu';
import ListBoxPlain from '../ui/ListBoxPlain';
import {useState} from 'react';
import {isMeetingReport} from '../PostCard';
import SelectIcon from "../icons/SelectIcon";

const useYear = (t) => {
    const thisYear = new Date().getFullYear();
    const yearOptions: PlainMenuProp[] = Array.from(Array(thisYear - 2016 + 2)).map((_, index) => ({
        id: index ? (thisYear - index + 1).toString() : 'All',
        title: index ? (thisYear - index + 1).toString() : t('All')
    }));
    return {
        yearOptions
    }
}

const useCategory = (t) => {
    const categoryOptions: PlainMenuProp[] = [
        {
            id: 'All',
            title: t('All')
        },
        {
            id: 'tcci-in-the-news',
            title: t('TCCI in the News')
        },
        {
            id: 'announcements',
            title: t('Announcements')
        },
        {
            id: 'research-news',
            title: t('Research News')
        },
        {
            id: 'meeting-reports',
            title: t('Meeting Reports')
        }
    ];

    return {
        categoryOptions
    };
}

const useMeetingReports = (t) => {
    const meetingReportsOptions: PlainMenuProp[] = [
        {
            id: 'All',
            title: t('All')
        },
        {
            id: 'Stanford eWear',
            title: t('Stanford eWear')
        },
        {
            id: 'General',
            title: t('General')
        }
    ];

    return {
        meetingReportsOptions
    };
}

interface FilterProps {
    yearType: string;
    categoryType: string;
    meetingReportType: string;
}

interface FilterBarProps extends FilterProps {
    onChange: (filter: FilterProps) => void;
}

export default function FilterBar({
                                      meetingTitle,
                                      yearType,
                                      categoryType,
                                      meetingReportType,
                                      onChange
                                  }) {
    const {t} = useTranslation('common');
    const [show, setShow] = useState(false)

    const {
        yearOptions
    } = useYear(t);
    const {
        categoryOptions
    } = useCategory(t);
    const {meetingReportsOptions} = useMeetingReports(t);

    const [state, setState] = useState({
        yearType,
        categoryType,
        meetingReportType,
    });

    const meetingReportsClickHandler = (selected: boolean, type: string) => {
        if (selected && state.meetingReportType === type) {
            setState({
                ...state,
                meetingReportType: 'All'
            })
        } else {
            setState({
                ...state,
                meetingReportType: type
            })
        }
    }

    // useEffect(() => {
    //     onChange(state);
    // }, [state])

    return (
        <div className="">
            <div className="flex justify-between">
                <h1 className="self-center">
                    <span className="text-3xl text-tcci-blue" dangerouslySetInnerHTML={{__html: meetingTitle}}></span>
                </h1>
                <div className="flex hidden md769:block">
                    <ListBoxPlain menus={yearOptions}
                                  selectId={state.yearType}
                                  buttonClassName='!py-0 !min-w-0'
                                  optionsClassName='lg:w-auto right-0'
                                  onChange={(id) => {
                                      if (state.yearType == id) return
                                      onChange({
                                          ...state,
                                          yearType: id
                                      })
                                      // setState({...state, yearType: id})
                                      // setState((newState) => {
                                      //     return {
                                      //         ...newState,
                                      //         yearType: id
                                      //     }
                                      // })
                                  }}
                                  menuTitle={t('Year')}/>
                    <ListBoxPlain menus={categoryOptions}
                                  selectId={state.categoryType}
                                  optionsClassName='lg:w-auto right-0'
                                  menuTitle={t('Category')}
                                  onChange={(id) => {

                                      if (state.categoryType == id) return

                                      let meetingReportType = state.meetingReportType;
                                      if (id !== 'meeting-reports') {
                                          meetingReportType = 'All';
                                      }

                                      onChange({
                                          ...state,
                                          categoryType: id,
                                          meetingReportType
                                      })
                                      // setState({...state, categoryType: id, meetingReportType});
                                      // setState((newState) => {
                                      //     return {
                                      //         ...newState,
                                      //         categoryType: id,
                                      //         meetingReportType
                                      //     }
                                      // })
                                  }}/>

                    {
                        isMeetingReport(state.categoryType) && (
                            <ListBoxPlain menus={meetingReportsOptions}
                                          selectId={state.meetingReportType}
                                          buttonClassName='!py-0'
                                          titleClassName='text-right'
                                          optionsClassName='lg:w-auto right-0'
                                          menuTitle={t('Program')}
                                          onChange={(id) => {
                                              if (state.meetingReportType == id) return
                                              let meetingReportType = id;
                                              onChange({
                                                  ...state,
                                                  meetingReportType
                                              })

                                              // setState((newState) => {
                                              //     return {
                                              //         ...newState,
                                              //         meetingReportType
                                              //     }
                                              // })
                                          }}
                            />
                        )
                    }

                </div>
            </div>

            <button
                onClick={() => setShow(!show)}
                className="filter-btn relative w-auto cursor-default py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-tcci-orange-o70 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-base block md769:hidden pl-0"
                id="headlessui-listbox-button-14" type="button" aria-haspopup="listbox" aria-expanded="false"
                data-headlessui-state=""><span className="block truncate text-[#1A73E8]">{t('Filter')}</span><span
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"><SelectIcon/>
            </span></button>

            <div className={[
                'flex block md769:hidden',
                show ? '!flex !block' : '!hidden'
            ].join(' ')}>
                <ListBoxPlain menus={yearOptions}
                              selectId={state.yearType}
                              buttonClassName='!py-0 !min-w-0'
                              optionsClassName='w-auto'
                              onChange={(id) => {
                                  if (state.yearType == id) return
                                  onChange({
                                      ...state,
                                      yearType: id
                                  })
                                  // setState({...state, yearType: id})
                                  // setState((newState) => {
                                  //     return {
                                  //         ...newState,
                                  //         yearType: id
                                  //     }
                                  // })
                              }}
                              menuTitle={t('Year')}/>
                <ListBoxPlain menus={categoryOptions}
                              selectId={state.categoryType}
                              menuTitle={t('Category')}
                              optionsClassName='w-auto right-0'
                              onChange={(id) => {
                                  if (state.categoryType == id) return

                                  let meetingReportType = state.meetingReportType;
                                  if (id !== 'meeting-reports') {
                                      meetingReportType = 'All';
                                  }

                                  onChange({
                                      ...state,
                                      categoryType: id,
                                      meetingReportType
                                  })
                                  // setState({...state, categoryType: id, meetingReportType});
                                  // setState((newState) => {
                                  //     return {
                                  //         ...newState,
                                  //         categoryType: id,
                                  //         meetingReportType
                                  //     }
                                  // })
                              }}/>

                {
                    isMeetingReport(state.categoryType) && (
                        <ListBoxPlain menus={meetingReportsOptions}
                                      selectId={state.meetingReportType}
                                      buttonClassName='!py-0'
                                      titleClassName='text-right'
                                      optionsClassName='w-auto right-0'
                                      menuTitle={t('Program')}
                                      onChange={(id) => {
                                          if (state.meetingReportType == id) return
                                          let meetingReportType = id;
                                          onChange({
                                              ...state,
                                              meetingReportType
                                          })
                                          // setState((newState) => {
                                          //     return {
                                          //         ...newState,
                                          //         meetingReportType
                                          //     }
                                          // })
                                      }}
                        />
                    )
                }

            </div>

        </div>
    );
}
