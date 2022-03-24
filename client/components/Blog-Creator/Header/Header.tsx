import { FC } from 'react';
import header__style from './header.module.css';
import Dispatch from 'components/Widgets/Button/Dispatch/Dispatch';
const Header: FC<{ monument: string }> = ({ monument }) => {
  return (
    <div className={header__style.container}>
      <div className={header__style.action__info}>Creeaza o postare pentru</div>
      <div className={header__style.main__content}>
        {monument}
        <div className={header__style.actions}>
          <Dispatch
            action={() => {
              //
            }}
            payload="Salveaza"
          ></Dispatch>
          <Dispatch
            action={() => {
              //
            }}
            payload="Posteaza"
          ></Dispatch>
        </div>
      </div>
    </div>
  );
};

export default Header;
