export function getPlurals<T>(num: number, options: T[]): T {
  if (num === 0) return options[2];
  if (num === 1) return options[0];
  if (num >= 2 && num <= 4) return options[1];
  if (num >= 5 && num <= 20) return options[2];

  // Обработка чисел от 21 и выше
  const arr = String(num).split('');
  const lastNumber = Number(arr[arr.length - 1]);

  if (lastNumber === 0) return options[2];
  if (lastNumber === 1) return options[0];
  if (lastNumber >= 2 && lastNumber <= 4) return options[1];
  if (lastNumber >= 5 && lastNumber <= 9) return options[2];

  return options[2];
}
