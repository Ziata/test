import {toLocaleDateString} from '../../utils/i18n';
import {useRouter} from 'next/router';

export default function FormattedDate({
                                          dates,
                                          className = ''
                                      }: {
                                          dates: Date | Date[];
                                          className?: string;
                                      }
) {
    const router = useRouter();
    const datesArr: Date[] = Array.isArray(dates) ? dates : [dates];

    const formattedDates: string[] = datesArr.map((item) => toLocaleDateString(item, router));

    if (formattedDates.length && (formattedDates[0] == formattedDates[1])) {

        return  (
            <time className={className}>{formattedDates[0]}</time>
        )
    }
    return (
        <time
            className={className}>{formattedDates[0]}{formattedDates.length > 1 ? ` - ${formattedDates[1]}` : ''}</time>
    );
}
