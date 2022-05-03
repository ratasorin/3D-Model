import { parsedDate } from 'lib/date';

export const dateFrom = (createAt: Date) => {
  return parsedDate(new Date(createAt).toLocaleDateString());
};
