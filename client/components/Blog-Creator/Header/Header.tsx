import { FC, useEffect, useState } from 'react';
import header__style from './header.module.css';
import { useAppSelector } from 'hooks/redux-hooks';
import { generateNewHash } from '../Forms/Title/title-slice';
import { useSession } from 'next-auth/react';

const Header: FC<{
  monument: string;
  subtitle: string;
  Button: JSX.Element;
}> = ({ monument, subtitle, Button }) => {
  useEffect(() => {
    generateNewHash();
  }, []);

  return (
    <div className={header__style.container}>
      <div className={header__style.action__info}>{subtitle}</div>
      <div className={header__style.main__content}>
        {monument}
        <div className={header__style.actions}>{Button}</div>
      </div>
    </div>
  );
};

export default Header;
