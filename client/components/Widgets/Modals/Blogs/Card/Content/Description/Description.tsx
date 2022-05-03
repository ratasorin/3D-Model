import { FC } from 'react';
import description__style from './description.module.css';

const Description: FC<{ description: string }> = ({ description }) => {
  console.log(description);
  return <div className={description__style.subtitle}>{description}</div>;
};

export default Description;
