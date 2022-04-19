import { parsedDate } from 'lib/date';
import { FC } from 'react';
import date__style from './date.module.css';

const normalizeDate = (date: string) => {
  return parsedDate(new Date(date).toLocaleDateString());
};

const PostDate: FC<{ date: string }> = ({ date }) => {
  return <div className={date__style.info__text}>{normalizeDate(date)}</div>;
};

export default PostDate;
