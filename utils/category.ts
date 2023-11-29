import {NextRouter} from 'next/router';

export type Category = 'tcci-in-the-news'
  | 'tcci-in-the-news-zh'
  | 'announcements'
  | 'announcements-zh'
  | 'research-news'
  | 'research-news-zh'
  | 'meeting-reports'
  | 'meeting-reports-zh'
  | 'uncategorized'
  | 'uncategorized-zh'
  | 'other'
  | 'other-zh'
  | 'tcci-event'
  | 'tcci-event-zh'
  | 'tcci-sponsored-event'
  | 'tcci-sponsored-event-zh'
  | 'tcci-meeting-reports'
  | 'tcci-meeting-reports-zh'
  | 'past-newsletter-2018'
  | 'past-newsletter-2018-zh'
  | 'past-newsletter-2019'
  | 'past-newsletter-2019-zh'
  | 'past-newsletter-2020'
  | 'past-newsletter-2020-zh'
  | 'past-newsletter-2021'
  | 'past-newsletter-2021-zh'
  | 'past-newsletter-2022'
  | 'past-newsletter-2022-zh'
  | 'past-newsletter-2023'
  | 'past-newsletter-2023-zh'
  | 'past-newsletter-2024'
  | 'past-newsletter-2024-zh'
  | 'past-newsletter-2025'
  | 'past-newsletter-2025-zh'
  | 'annual-report'
  | 'annual-report-zh'
  ;

export const toLocaleCategory = (category: Category, router:NextRouter, locale?: 'zh' | 'en'): Category => {
  let result = category;
  let localeStr = 'en';
  if (router) {
    localeStr = router.locale;
  } else {
    localeStr = locale;
  }
  if (localeStr === 'en') {
    result = category.replace(/-zh$/, '') as Category;
  } else if (router.locale === 'zh') {
    if(category.endsWith('-zh')) {
      result = category;
    } else {
      result = `${category}-zh` as Category;
    }
  }
  return result;
}

export function getLinkByCategory(tag: Category) {
  const enCategory = toLocaleCategory(tag, undefined, 'en');
  switch (enCategory) {
    case 'tcci-event':
    case 'tcci-event-zh':
      return '/supporting-scientific-meetings-and-conferences?event=tcci-event'
    case 'tcci-sponsored-event':
    case 'tcci-sponsored-event-zh':
      return '/supporting-scientific-meetings-and-conferences?event=tcci-sponsored-event';
    case 'past-newsletter-2018':
    case 'past-newsletter-2018-zh':
        return '/newsletter?year=2018';
    case 'past-newsletter-2019':
    case 'past-newsletter-2019-zh':
      return '/newsletter?year=2019';
    case 'past-newsletter-2020':
    case 'past-newsletter-2020-zh':
      return '/newsletter?year=2020';
    case 'past-newsletter-2021':
    case 'past-newsletter-2021-zh':
      return '/newsletter?year=2021';
    case 'past-newsletter-2022':
    case 'past-newsletter-2022-zh':
      return '/newsletter?year=2022';
    case 'past-newsletter-2023':
    case 'past-newsletter-2023-zh':
      return '/newsletter?year=2023';
    case 'past-newsletter-2024':
    case 'past-newsletter-2024-zh':
      return '/newsletter?year=2024';
    case 'past-newsletter-2025':
    case 'past-newsletter-2025-zh':
      return '/newsletter?year=2025';
    default:
      return `/newsroom?category=${enCategory}`;
  }
}

export function redirectCategory(tag: Category):Category {
  switch (tag) {
    case 'tcci-meeting-reports':
      return 'meeting-reports';
    case 'tcci-meeting-reports-zh':
      return 'meeting-reports-zh';
    default:
      return tag;
  }
}
