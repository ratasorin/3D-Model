import { FC } from 'react';
import date__style from './date.module.css';

const PostDate: FC<{ date: string }> = ({ date }) => {
  return <div className={date__style.info__text}>{date}</div>;
};

export default PostDate;
