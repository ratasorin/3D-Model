import { FC, useEffect } from 'react';
import header__style from './header.module.css';
import { generateNewHash } from '../Forms/Title/title-slice';
import { useAppDispatch } from 'hooks/redux-hooks';

const Header: FC<{
  monument: string;
  subtitle: string;
  Button: JSX.Element;
}> = ({ monument, subtitle, Button }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // generate a new id everytime the user intends to write a post
    dispatch(generateNewHash());
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
