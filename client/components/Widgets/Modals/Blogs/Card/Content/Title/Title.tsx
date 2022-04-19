import { FC } from 'react';
import title__style from './title.module.css';

const Title: FC<{
  title: string;
}> = ({ title }) => {
  return <div className={title__style.title}>{title}</div>;
};

export default Title;
