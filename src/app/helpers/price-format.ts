const CURRENCY_UNIT = 'đ';

export const priceFormat = (
   number: number | string,
   space: string = '.',
   currencyUnit: string = CURRENCY_UNIT,
): string => {
   if (!number || number === 0) {
      return 0 + currencyUnit;
   }
   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, space) + ' ' + currencyUnit;
};
