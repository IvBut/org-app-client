export const CurrencyModel = {
  AED: 'AED',
  AFA: 'AFA',
  AFN: 'AFN',
  ALL: 'ALL',
  AMD: 'AMD',
  ARS: 'ARS',
  ATS: 'ATS',
  AUD: 'AUD',
  AZM: 'AZM',
  AZN: 'AZN',
  BEF: 'BEF',
  BGL: 'BGL',
  BGN: 'BGN',
  BRL: 'BRL',
  CAD: 'CAD',
  CHF: 'CHF',
  CLP: 'CLP',
  CNY: 'CNY',
  COP: 'COP',
  CYP: 'CYP',
  CZK: 'CZK',
  DKK: 'DKK',
  DZD: 'DZD',
  EEK: 'EEK',
  EGP: 'EGP',
  ESP: 'ESP',
  ETB: 'ETB',
  EUR: 'EUR',
  FIM: 'FIM',
  FRF: 'FRF',
  GBP: 'GBP',
  GEL: 'GEL',
  GRD: 'GRD',
  HKD: 'HKD',
  HRK: 'HRK',
  HUF: 'HUF',
  IDR: 'IDR',
  IEP: 'IEP',
  ILS: 'ILS',
  INR: 'INR',
  IQD: 'IQD',
  IRR: 'IRR',
  ISK: 'ISK',
  ITL: 'ITL',
  JOD: 'JOD',
  JPY: 'JPY',
  KES: 'KES',
  KGS: 'KGS',
  KRW: 'KRW',
  KWD: 'KWD',
  KZT: 'KZT',
  LAK: 'LAK',
  LBP: 'LBP',
  LKR: 'LKR',
  LTL: 'LTL',
  LUF: 'LUF',
  LVL: 'LVL',
  LYD: 'LYD',
  MAD: 'MAD',
  MDL: 'MDL',
  MKD: 'MKD',
  MNT: 'MNT',
  MXN: 'MXN',
  MYR: 'MYR',
  NGN: 'NGN',
  NLG: 'NLG',
  NOK: 'NOK',
  NPR: 'NPR',
  NZD: 'NZD',
  PEN: 'PEN',
  PHP: 'PHP',
  PKR: 'PKR',
  PLN: 'PLN',
  ROL: 'ROL',
  RON: 'RON',
  RSD: 'RSD',
  RUB: 'RUB',
  RUR: 'RUR',
  SAR: 'SAR',
  SDD: 'SDD',
  SDG: 'SDG',
  SEK: 'SEK',
  SGD: 'SGD',
  SIT: 'SIT',
  SKK: 'SKK',
  SYP: 'SYP',
  THB: 'THB',
  TJS: 'TJS',
  TMM: 'TMM',
  TMT: 'TMT',
  TND: 'TND',
  TRL: 'TRL',
  TRY: 'TRY',
  TWD: 'TWD',
  UAH: 'UAH',
  USD: 'USD',
  UYU: 'UYU',
  UZS: 'UZS',
  VEB: 'VEB',
  VEF: 'VEF',
  VND: 'VND',
  XDR: 'XDR',
  YUM: 'YUM',
  ZAR: 'ZAR',
  PLZ: 'PLZ',
  PTE: 'PTE',
  YUN: 'YUN',
  GEK: 'GEK',
  UAK: 'UAK',
  TJR: 'TJR',
  VES: 'VES'
} as const;

export interface ICurrencies {
  currencyId: string;
  name: string;
  engName: string;
  code?: string;
  charCode?: number[];
  nbrb?: {
    curId: number;
    curScale: number;
  };
}

// https://www.w3schools.com/charsets/ref_utf_currency.asp
// https://www.htmlsymbols.xyz/currency-symbols
export const Currencies: ICurrencies[] = [
  {
    currencyId: 'AED',
    name: 'Дирхам ОАЭ',
    engName: 'UAE Dirham',
    charCode: [68, 72],
    nbrb: { curId: 513, curScale: 10 },
    code: '784'
  },
  { currencyId: 'AFA', name: 'Афгани', engName: 'Afghani' },
  {
    currencyId: 'AFN',
    name: 'Афгани',
    engName: 'Afghani',
    nbrb: { curId: 467, curScale: 100 },
    code: '971'
  },
  {
    currencyId: 'ALL',
    name: 'Албанский лек',
    engName: 'Albanian Lek',
    nbrb: { curId: 482, curScale: 100 },
    code: '008'
  },
  {
    currencyId: 'AMD',
    name: 'Армянский драм',
    engName: 'Armenian Dram',
    nbrb: { curId: 510, curScale: 1000 },
    code: '051'
  },
  {
    currencyId: 'ARS',
    name: 'Аргентинское песо',
    engName: 'Argentine Peso',
    nbrb: { curId: 466, curScale: 10 },
    code: '032'
  },
  { currencyId: 'ATS', name: 'Австрийский шиллинг', engName: 'Austrian Schilling' },
  {
    currencyId: 'AUD',
    name: 'Австралийский доллар',
    engName: 'Australian Dollar',
    charCode: [65, 36],
    nbrb: { curId: 440, curScale: 1 },
    code: '036'
  },
  { currencyId: 'AZM', name: 'Азербайджанский манат', engName: 'Azerbaijanian Manat' },
  {
    currencyId: 'AZN',
    name: 'Азербайджанский манат',
    engName: 'Azerbaijanian Manat',
    nbrb: { curId: 507, curScale: 1 },
    code: '944'
  },
  { currencyId: 'BEF', name: 'Бельгийский франк', engName: 'Belgian Franc' },
  { currencyId: 'BGL', name: 'Болгарский лев', engName: 'Bulgarian Lev' },
  {
    currencyId: 'BGN',
    name: 'Болгарский лев',
    engName: 'Bulgarian Lev',
    charCode: [1083, 1074],
    nbrb: { curId: 441, curScale: 1 },
    code: '975'
  },
  {
    currencyId: 'BRL',
    name: 'Бразильский реал',
    engName: 'Brazilian Real',
    nbrb: { curId: 514, curScale: 10 },
    code: '986'
  },
  {
    currencyId: 'CAD',
    name: 'Канадский доллар',
    engName: 'Canadian Dollar',
    charCode: [67, 36],
    nbrb: { curId: 371, curScale: 1 },
    code: '124'
  },
  {
    currencyId: 'CHF',
    name: 'Швейцарский франк',
    engName: 'Swiss Franc',
    charCode: [8355],
    nbrb: { curId: 426, curScale: 1 },
    code: '756'
  },
  {
    currencyId: 'CLP',
    name: 'Чилийское песо',
    engName: 'Chilean Peso',
    nbrb: { curId: 374, curScale: 1000 },
    code: '152'
  },
  {
    currencyId: 'CNY',
    name: 'Китайский юань',
    engName: 'Yuan China',
    charCode: [65509],
    nbrb: { curId: 462, curScale: 10 },
    code: '156'
  },
  {
    currencyId: 'COP',
    name: 'Колумбийское песо',
    engName: 'Columbian Peso',
    nbrb: { curId: 479, curScale: 10000 },
    code: '170'
  },
  { currencyId: 'CYP', name: 'Кипрский фунт', engName: 'Cyprus Pound' },
  {
    currencyId: 'CZK',
    name: 'Чешская крона',
    engName: 'Czech Koruna',
    charCode: [75, 269],
    nbrb: { curId: 463, curScale: 100 },
    code: '203'
  },
  {
    currencyId: 'DKK',
    name: 'Датская крона',
    engName: 'Danish Krone',
    charCode: [107, 114],
    nbrb: { curId: 450, curScale: 10 },
    code: '208'
  },
  {
    currencyId: 'DZD',
    name: 'Алжирский динар',
    engName: 'Algerian Dinar',
    nbrb: { curId: 465, curScale: 100 },
    code: '012'
  },
  { currencyId: 'EEK', name: 'Эстонская крона', engName: 'Estonian Crona' },
  {
    currencyId: 'EGP',
    name: 'Египетский фунт',
    engName: 'Egyptian Pound',
    nbrb: { curId: 475, curScale: 10 },
    code: '818'
  },
  { currencyId: 'ESP', name: 'Испанская песета', engName: 'Spanish Peseta' },
  {
    currencyId: 'ETB',
    name: 'Эфиопский быр',
    engName: 'Ethiopian Birr',
    nbrb: { curId: 350, curScale: 100 },
    code: '230'
  },
  {
    currencyId: 'EUR',
    name: 'Евро',
    engName: 'EURO',
    charCode: [8364],
    nbrb: { curId: 451, curScale: 1 },
    code: '978'
  },
  { currencyId: 'FIM', name: 'Финляндская марка', engName: 'Markka' },
  { currencyId: 'FRF', name: 'Французский франк', engName: 'French Franc' },
  {
    currencyId: 'GBP',
    name: 'Фунт стерлингов',
    engName: 'Pound Sterling',
    charCode: [163],
    nbrb: { curId: 429, curScale: 1 },
    code: '826'
  },
  { currencyId: 'GEK', name: 'Грузинский купон', engName: 'Georgian coupon' },
  {
    currencyId: 'GEL',
    name: 'Грузинский лари',
    engName: 'Georgian Lari',
    charCode: [8382],
    nbrb: { curId: 481, curScale: 10 },
    code: '981'
  },
  { currencyId: 'GRD', name: 'Греческая драхма', engName: 'Drachma' },
  {
    currencyId: 'HKD',
    name: 'Гонконгский доллар',
    engName: 'Hong Kong Dollar',
    charCode: [72, 75, 36],
    nbrb: { curId: 471, curScale: 10 },
    code: '344'
  },
  { currencyId: 'HRK', name: 'Хорватская куна', engName: 'Croatian Kuna' },
  {
    currencyId: 'HUF',
    name: 'Венгерский форинт',
    engName: 'Forint',
    nbrb: { curId: 503, curScale: 1000 },
    code: '348'
  },
  {
    currencyId: 'IDR',
    name: 'Индонезийская рупия',
    engName: 'Rupiah',
    nbrb: { curId: 493, curScale: 10000 },
    code: '360'
  },
  { currencyId: 'IEP', name: 'Ирландский фунт', engName: 'Irish Pound' },
  {
    currencyId: 'ILS',
    name: 'Новый израильский шекель',
    engName: 'Shekel',
    nbrb: { curId: 487, curScale: 10 },
    code: '376'
  },
  {
    currencyId: 'INR',
    name: 'Индийская рупия',
    engName: 'Indian Rupee',
    nbrb: { curId: 511, curScale: 100 },
    code: '356'
  },
  {
    currencyId: 'IQD',
    name: 'Иракcкий динар',
    engName: 'Iraqi Dinar',
    nbrb: { curId: 477, curScale: 1000 },
    code: '368'
  },
  {
    currencyId: 'IRR',
    name: 'Иранский риал',
    engName: 'Iranian Rial',
    nbrb: { curId: 461, curScale: 100000 },
    code: '364'
  },
  {
    currencyId: 'ISK',
    name: 'Исландская крона',
    engName: 'Iceland Krona',
    nbrb: { curId: 453, curScale: 100 },
    code: '352'
  },
  { currencyId: 'ITL', name: 'Итальянская лира', engName: 'Italian Lira' },
  {
    currencyId: 'JOD',
    name: 'Иорданский динар',
    engName: 'Jordanian Dinar',
    nbrb: { curId: 392, curScale: 1 },
    code: '400'
  },
  {
    currencyId: 'JPY',
    name: 'Иена',
    engName: 'Yen',
    charCode: [165],
    nbrb: { curId: 508, curScale: 100 },
    code: '392'
  },
  {
    currencyId: 'KES',
    name: 'Кенийский шиллинг',
    engName: 'Kenyan Shilling',
    nbrb: { curId: 478, curScale: 100 },
    code: '404'
  },
  {
    currencyId: 'KGS',
    name: 'Кыргызский сом',
    engName: 'Kyrgyzstan Som',
    nbrb: { curId: 458, curScale: 100 },
    code: '417'
  },
  {
    currencyId: 'KRW',
    name: 'Южнокорейская вона',
    engName: 'Won',
    nbrb: { curId: 470, curScale: 1000 },
    code: '410'
  },
  {
    currencyId: 'KWD',
    name: 'Кувейтский динар',
    engName: 'Kuwaiti Dinar',
    nbrb: { curId: 394, curScale: 1 },
    code: '414'
  },
  {
    currencyId: 'KZT',
    name: 'Казахский тенге',
    engName: 'Kazakhstan Tenge',
    charCode: [8376],
    nbrb: { curId: 459, curScale: 1000 },
    code: '398'
  },
  {
    currencyId: 'LAK',
    name: 'Лаосский кип',
    engName: 'Kip',
    nbrb: { curId: 506, curScale: 10000 },
    code: '418'
  },
  {
    currencyId: 'LBP',
    name: 'Ливанский фунт',
    engName: 'Lebanese Pound',
    nbrb: { curId: 395, curScale: 1000 },
    code: '422'
  },
  {
    currencyId: 'LKR',
    name: 'Шри-Ланкийская рупия',
    engName: 'Sri Lanka Rupee',
    nbrb: { curId: 504, curScale: 100 },
    code: '144'
  },
  { currencyId: 'LTL', name: 'Литовский лит', engName: 'Lithuanian Lit' },
  { currencyId: 'LUF', name: 'Люксембургский франк', engName: 'Luxembourg Franc' },
  { currencyId: 'LVL', name: 'Латвийский лат', engName: 'Latvian Lat' },
  {
    currencyId: 'LYD',
    name: 'Ливийcкий динар',
    engName: 'Libyan Dinar',
    nbrb: { curId: 398, curScale: 1 },
    code: '434'
  },
  {
    currencyId: 'MAD',
    name: 'Марокканский дирхам',
    engName: 'Moroccan Diram',
    nbrb: { curId: 328, curScale: 10 },
    code: '504'
  },
  {
    currencyId: 'MDL',
    name: 'Молдавский лей',
    engName: 'Moldovian Leu',
    nbrb: { curId: 454, curScale: 10 },
    code: '498'
  },
  {
    currencyId: 'MKD',
    name: 'Македонский динар',
    engName: 'Denar',
    nbrb: { curId: 472, curScale: 100 },
    code: '807'
  },
  {
    currencyId: 'MNT',
    name: 'Монгольский тугрик',
    engName: 'Tugrik',
    nbrb: { curId: 446, curScale: 1000 },
    code: '496'
  },
  {
    currencyId: 'MXN',
    name: 'Мексиканское новое песо',
    engName: 'Mexican Nuevo Peso',
    nbrb: { curId: 484, curScale: 10 },
    code: '484'
  },
  {
    currencyId: 'MYR',
    name: 'Малайзийский ринггит',
    engName: 'Malaysian Ringgit',
    nbrb: { curId: 483, curScale: 10 },
    code: '458'
  },
  {
    currencyId: 'NGN',
    name: 'Нигерийская найра',
    engName: 'Naira',
    nbrb: { curId: 485, curScale: 1000 },
    code: '566'
  },
  { currencyId: 'NLG', name: 'Нидерландский гульден', engName: 'Netherlands Guilder' },
  {
    currencyId: 'NOK',
    name: 'Норвежская крона',
    engName: 'Norwegian Krone',
    charCode: [107, 114],
    nbrb: { curId: 455, curScale: 10 },
    code: '578'
  },
  {
    currencyId: 'NPR',
    name: 'Непальcкая рупия',
    engName: 'Nepalese Rupee',
    nbrb: { curId: 486, curScale: 100 },
    code: '524'
  },
  {
    currencyId: 'NZD',
    name: 'Новозеландский доллар',
    engName: 'New Zealand Dollar',
    charCode: [78, 90, 36],
    nbrb: { curId: 448, curScale: 1 },
    code: '554'
  },
  {
    currencyId: 'PEN',
    name: 'Перуанский новый соль',
    engName: 'Nuero',
    nbrb: { curId: 488, curScale: 10 },
    code: '604'
  },
  {
    currencyId: 'PHP',
    name: 'Филиппинcкое песо',
    engName: 'Philippine Peso',
    nbrb: { curId: 502, curScale: 100 },
    code: '608'
  },
  {
    currencyId: 'PKR',
    name: 'Пакистанская рупия',
    engName: 'Pakistan Rupee',
    nbrb: { curId: 491, curScale: 100 },
    code: '586'
  },
  {
    currencyId: 'PLN',
    name: 'Польский злотый',
    engName: 'Polish Zloty',
    charCode: [122, 322],
    nbrb: { curId: 452, curScale: 10 },
    code: '985'
  },
  { currencyId: 'PLZ', name: 'Польский злотый', engName: 'Polish Zloty' },
  { currencyId: 'PTE', name: 'Португальcкое эскудо', engName: 'Portuguese Escudo' },
  { currencyId: 'ROL', name: 'Румынский лей', engName: 'Leu' },
  {
    currencyId: 'RON',
    name: 'Новый лей',
    engName: 'New Leu',
    nbrb: { curId: 492, curScale: 10 },
    code: '946'
  },
  {
    currencyId: 'RSD',
    name: 'Сербский динар',
    engName: 'Serbian Dinar',
    nbrb: { curId: 496, curScale: 100 },
    code: '941'
  },
  {
    currencyId: 'RUB',
    name: 'Российский рубль',
    engName: 'Russian Ruble',
    charCode: [8381],
    nbrb: { curId: 456, curScale: 100 },
    code: '643'
  },
  { currencyId: 'RUR', name: 'Российский рубль', engName: 'Russian Ruble', charCode: [8381] },
  {
    currencyId: 'SAR',
    name: 'Саудовский риал',
    engName: 'Saudi Riyal',
    nbrb: { curId: 495, curScale: 10 },
    code: '682'
  },
  { currencyId: 'SDD', name: 'Суданский динар', engName: 'Sudanese Dinar' },
  {
    currencyId: 'SDG',
    name: 'Суданский фунт',
    engName: 'Sudanese Pound',
    nbrb: { curId: 499, curScale: 10 },
    code: '938'
  },
  {
    currencyId: 'SEK',
    name: 'Шведская крона',
    engName: 'Swedish Krona',
    charCode: [107, 114],
    nbrb: { curId: 464, curScale: 10 },
    code: '752'
  },
  {
    currencyId: 'SGD',
    name: 'Сингапурcкий доллар',
    engName: 'Singapore Dollar',
    charCode: [83, 36],
    nbrb: { curId: 421, curScale: 1 },
    code: '702'
  },
  { currencyId: 'SIT', name: 'Словенский толар', engName: 'Slovenian Tolar' },
  { currencyId: 'SKK', name: 'Словацкая крона', engName: 'Slovak Koruna' },
  {
    currencyId: 'SYP',
    name: 'Сирийский фунт',
    engName: 'Syrian Pound',
    nbrb: { curId: 497, curScale: 1000 },
    code: '760'
  },
  {
    currencyId: 'THB',
    name: 'Таиландский бат',
    engName: 'Baht',
    nbrb: { curId: 468, curScale: 100 },
    code: '764'
  },
  { currencyId: 'TJR', name: 'Таджикский рубль', engName: 'Tajik Ruble' },
  {
    currencyId: 'TJS',
    name: 'Таджикский сомони',
    engName: 'Tajik somony',
    nbrb: { curId: 498, curScale: 10 },
    code: '972'
  },
  { currencyId: 'TMM', name: 'Туркменский манат', engName: 'Turkmenistan Manat' },
  {
    currencyId: 'TMT',
    name: 'Новый манат',
    engName: 'Manat',
    nbrb: { curId: 490, curScale: 10 },
    code: '934'
  },
  {
    currencyId: 'TND',
    name: 'Тунисский динар',
    engName: 'Tunisian Dinar',
    nbrb: { curId: 505, curScale: 10 },
    code: '788'
  },
  { currencyId: 'TRL', name: 'Турецкая лира', engName: 'Turkish Lira' },
  {
    currencyId: 'TRY',
    name: 'Новая турецкая лира',
    engName: 'New Turkish Lira',
    charCode: [8378],
    nbrb: { curId: 460, curScale: 10 },
    code: '949'
  },
  {
    currencyId: 'TWD',
    name: 'Новый тайваньский доллар',
    engName: 'New Taiwan Dollar',
    nbrb: { curId: 489, curScale: 100 },
    code: '901'
  },
  {
    currencyId: 'UAH',
    name: 'Украинская гривна',
    engName: 'Hryvnia',
    charCode: [8372],
    nbrb: { curId: 449, curScale: 100 },
    code: '980'
  },
  { currencyId: 'UAK', name: 'Украинский карбованец', engName: 'Karbovanet' },
  {
    currencyId: 'USD',
    name: 'Доллар США',
    engName: 'US Dollar',
    charCode: [36],
    nbrb: { curId: 431, curScale: 1 },
    code: '840'
  },
  {
    currencyId: 'UYU',
    name: 'Уругвайское песо',
    engName: 'Uruguay Peso',
    nbrb: { curId: 501, curScale: 100 },
    code: '858'
  },
  {
    currencyId: 'UZS',
    name: 'Узбекский сум',
    engName: 'Uzbekistan Sum',
    nbrb: { curId: 500, curScale: 10000 },
    code: '860'
  },
  { currencyId: 'VEB', name: 'Боливар', engName: 'Bolivar Fuerte' },
  { currencyId: 'VEF', name: 'Боливар фуэрте', engName: 'Bolivar Fuerte' },
  {
    currencyId: 'VES',
    name: 'Суверенный боливар',
    engName: 'Bolivar Soberano',
    nbrb: { curId: 509, curScale: 100 },
    code: '928'
  },
  {
    currencyId: 'VND',
    name: 'Вьетнамский донг',
    engName: 'Dong',
    nbrb: { curId: 512, curScale: 100000 },
    code: '704'
  },
  {
    currencyId: 'XDR',
    name: 'СДР ',
    engName: 'SDR',
    nbrb: { curId: 457, curScale: 1 },
    code: '960'
  },
  { currencyId: 'YUM', name: 'Югославский динар', engName: 'Yugoslavian Dinar' },
  { currencyId: 'YUN', name: 'Югославский динар', engName: 'Yugoslavian Dinar' },
  {
    currencyId: 'ZAR',
    name: 'Южноафриканский рэнд',
    engName: 'Rand',
    charCode: [82],
    nbrb: { curId: 494, curScale: 10 },
    code: '710'
  }
] as const;
