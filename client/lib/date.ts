const MONTHS = [
  'IAN',
  'FEB',
  'MAR',
  'APR',
  'MAI',
  'IUN',
  'IUL',
  'AUG',
  'SEP',
  'OCT',
  'NOI',
  'DEC',
] as const;

export const parsedDate = (date: string) => {
  const month = Number(date.split('/')[0]);
  const day = date.split('/')[1];
  const year = date.split('/')[2];
  return `${day} ${MONTHS[month - 1]} ${year}`;
};
