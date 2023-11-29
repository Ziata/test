import {useTranslation} from 'next-i18next';
import {PlainMenuProp} from '../PlainMenu';
import ListBoxPlain from '../ui/ListBoxPlain';
import {useState} from 'react';

const useYear = (t) => {
    const thisYear = new Date().getFullYear();
    const yearOptions: PlainMenuProp[] = Array.from(Array(thisYear - 2022 + 2)).map((_, index) => ({
        id: index ? (thisYear - index + 1).toString() : 'All',
        title: index ? (thisYear - index + 1).toString() : t('All')
    }));
    return {
        yearOptions
    }
}

const useCategory = (t) => {
    const categoryOptions = [
        {
            id: 'All',
            category: 'meeting-reports',
            title: t('All')
        },
        {
            id: 'Stanford eWear',
            category: 'meeting-reports',
            title: t('Stanford eWear')
        },
        {
            id: 'General',
            category: 'meeting-reports',
            title: t('General')
        }
    ];

    return {
        categoryOptions
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
                                      yearType,
                                      categoryType,
                                      meetingReportType,
                                      onChange
                                  }: FilterBarProps) {
    const {t} = useTranslation('common');
    const {
        yearOptions
    } = useYear(t);
    const {
        categoryOptions
    } = useCategory(t);

    const [state, setState] = useState({
        yearType,
        categoryType,
        meetingReportType,
    });


    // useEffect(() => {
    //     onChange(state);
    // }, [state])

    return (
        <div className="mb-4">
            <div className="flex justify-between">
                <h1 className="self-center">
                    <span className="text-3xl text-tcci-blue">{t('Browse Meeting Reports')}</span></h1>
                <div className="hidden sm:flex">
                    <ListBoxPlain menus={yearOptions}
                                  selectId={state.yearType}
                                  buttonClassName='!py-0 !min-h-0 !min-w-0'
                                  optionsClassName='lg:w-auto'
                                  titleClassName='text-right'
                                  onChange={(id) => {
                                      if (state.yearType == id) return
                                      // setState((newState) => {
                                      //     return {
                                      //         ...newState,
                                      //         yearType: id
                                      //     }
                                      // })
                                      onChange({
                                          ...state,
                                          yearType: id
                                      })
                                  }}
                                  menuTitle={t('Year')}/>
                    <ListBoxPlain menus={categoryOptions}
                                  selectId={state.meetingReportType}
                                  buttonClassName='!py-0 !min-h-0'
                                  optionsClassName='lg:w-auto right-0'
                                  titleClassName='text-right'
                                  menuTitle={t('Program')}
                                  onChange={(id) => {
                                      if (state.meetingReportType == id) return
                                      /*let meetingReportType = id;
                                      setState((newState) => {
                                          return {
                                              ...newState,
                                              meetingReportType
                                          }
                                      })*/
                                      onChange({
                                          ...state,
                                          meetingReportType: id
                                      })
                                  }}
                    />
                </div>
            </div>
            <div className="flex sm:hidden mt-4">
                <ListBoxPlain menus={yearOptions}
                              selectId={state.yearType}
                              buttonClassName='!py-0 !min-h-0'
                              className=''
                              optionsClassName='w-auto'
                              titleClassName='text-left'
                              onChange={(id) => {
                                  if (state.yearType == id) return
                                  /*setState((newState) => {
                                      return {
                                          ...newState,
                                          yearType: id
                                      }
                                  })*/
                                  onChange({
                                      ...state,
                                      yearType: id
                                  })
                              }}
                              menuTitle={t('Year')}/>
                <ListBoxPlain menus={categoryOptions}
                              selectId={state.meetingReportType}
                              buttonClassName='!py-0 !min-h-0'
                              optionsClassName='w-auto'
                              titleClassName='text-left'
                              menuTitle={t('Program')}
                              onChange={(id) => {
                                  if (state.meetingReportType == id) return
                                  /*let meetingReportType = id;
                                  setState((newState) => {
                                      return {
                                          ...newState,
                                          meetingReportType
                                      }
                                  })*/
                                  onChange({
                                      ...state,
                                      meetingReportType: id
                                  })
                              }}
                />
            </div>
        </div>
    );
}
