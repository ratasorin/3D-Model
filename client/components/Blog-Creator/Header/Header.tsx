import { FC } from 'react';
import header__style from './header.module.css';
import Dispatch from 'components/Widgets/Button/Dispatch/Dispatch';
import Submit from 'components/Widgets/Button/Submit/Submit';
import { map, of } from 'rxjs';
import { editorState$ } from '../Forms/Editor/Editor';
import { convertToRaw } from 'draft-js';
import { submit } from 'lib/submit';

const post = () =>
  of(1).pipe(
    submit(
      editorState$.pipe(
        map((editor) => convertToRaw(editor.getCurrentContent()))
      ),
      '/api/blogs/user-draft01'
    )
  );
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
            payload="SALVEAZA"
          ></Dispatch>
          <Submit payload="POSTEAZA" onClick={post()}></Submit>
        </div>
      </div>
    </div>
  );
};

export default Header;
