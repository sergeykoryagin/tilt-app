import { formatRelative, parseISO,  } from 'date-fns';
import ru from 'date-fns/locale/ru';

export const formatISOstring = (ISOstring: string | null): string | null => {
    return ISOstring && formatRelative(parseISO(ISOstring), new Date(), { locale: ru });
};