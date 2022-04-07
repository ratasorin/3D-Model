import { FC } from 'react';
import header__style from './header.module.css';
import Dispatch from 'components/Widgets/Button/Dispatch/Dispatch';
import Submit from 'components/Widgets/Button/Submit/Submit';
import { useSession } from 'next-auth/react';
import { editorState$ } from '../Forms/Editor/Editor';
import { map } from 'rxjs';

const Header: FC<{ monument: string }> = ({ monument }) => {
  const user = useSession().data?.user;
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
            payload="SALVEAZA"
          ></Dispatch>
          <Submit
            payload="POSTEAZA"
            data={editorState$.pipe(
              map((editorState) =>
                editorState.getCurrentContent().getPlainText()
              )
            )}
            path={`/api/blogs/${user?.name}/draft-01`}
            stringify={true}
          ></Submit>
        </div>
      </div>
    </div>
  );
};

export default Header;
