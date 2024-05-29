import { Currencies, ICurrencies } from '../models/currency.model';

export const getCurrencySymbolByAbbreviation = (abbreviation: string) => {
  if (!abbreviation) return '';
  const cur = Currencies.find(
    c => abbreviation.toLocaleUpperCase() === c.currencyId.toLocaleUpperCase()
  );
  if (!cur || !cur?.charCode?.length) return '';
  return String.fromCharCode(...cur.charCode);
};

export const getNbRbCurrencies = (sortBy: keyof ICurrencies = 'name') => {
  const filtered = Currencies.filter(el => !!el.nbrb);
  return filtered.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.toLowerCase().localeCompare(bValue.toLowerCase());
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue;
    } else {
      return -1;
    }
  });
};
