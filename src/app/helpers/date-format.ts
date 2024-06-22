import { format } from 'date-fns';

export const dateFormat = (date: string | number | Date) => {
   return date ? format(new Date(date), 'dd-MM-yyyy') : '';
};

