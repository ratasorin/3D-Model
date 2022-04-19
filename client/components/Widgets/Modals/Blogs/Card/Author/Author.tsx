import { User } from '@prisma/client';
import { FC } from 'react';
import author__style from './author.module.css';
const Author: FC<{ author: User | null }> = ({ author }) => {
  return (
    <div className={author__style.author__info}>
      <div className={author__style.icon}>
        <img src={author ? author.image : ''} alt="PFP" />
      </div>
      {author ? author.name : null}
    </div>
  );
};

export default Author;
