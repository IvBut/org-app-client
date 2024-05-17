import { Currencies } from '../constants/currency';

export const getCurrencySymbolByAbbreviation = (abbreviation: string) => {
  if (!abbreviation) return '';
  const cur = Currencies.find(
    c => abbreviation.toLocaleUpperCase() === c.currencyId.toLocaleUpperCase()
  );
  if (!cur || !cur?.charCode?.length) return '';
  return String.fromCharCode(...cur.charCode);
};
