import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export function getDatesArray(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  const dateCursor = new Date(start);
  const dateEnd = new Date(end);
  for(;dateCursor <= dateEnd; dateCursor.setDate(dateCursor.getDate() + 1)){
    dates.push(new Date(dateCursor));
  }
  return dates;
}

export function toFormattedDateString(date: Date):string {
  return dayjs(date).format('YYYY-MM-DD');
}

export const LosAngeles = 'America/Los_Angeles';

export function serverDateStringToLocalDate(dateStr:string):Date {
  dayjs.extend(timezone);
  dayjs.extend(utc);
  return dayjs.tz(dateStr, LosAngeles).toDate();
}

export function localeDateTpServerDateString(date: Date):string {
  dayjs.extend(timezone);
  dayjs.extend(utc);

  return dayjs(date).tz(LosAngeles).format('YYYY-MM-DD HH:mm:ss');
}

