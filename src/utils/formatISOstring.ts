import { formatRelative, parseISO,  } from 'date-fns';
import ru from 'date-fns/locale/ru';

export const formatISOstring = (ISOstring: string): string => {
    return formatRelative(parseISO(ISOstring), new Date(), { locale: ru });
};