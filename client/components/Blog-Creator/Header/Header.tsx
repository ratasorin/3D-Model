import { FC } from 'react';
import header__style from './header.module.css';
import Dispatch from 'components/Widgets/Button/Dispatch/Dispatch';
import Submit from 'components/Widgets/Button/Submit/Submit';
import { useSession } from 'next-auth/react';
import { editorState$ } from '../Forms/Editor/Editor';
import { map } from 'rxjs';
import { useAppSelector } from 'hooks/redux-hooks';
import { convertToRaw } from 'draft-js';

const makePost = (blogID: string, monument: string) => {
  return editorState$.pipe(
    map((editorState) => ({
      content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      id: blogID,
      monument,
    })),
    map((blogContent) => {
      if (!blogContent.content) throw new Error('Blogurile nu pot fi goale!');
      else return blogContent;
    })
  );
};

const Header: FC<{ monument: string }> = ({ monument }) => {
  const user = useSession().data?.user;
  const title = useAppSelector(({ title }) => title);
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
            data={makePost(title.postHash, monument)}
            path={`/api/blogs/${user?.name}/${title.title || title.postHash}`}
            stringify={true}
          ></Submit>
        </div>
      </div>
    </div>
  );
};

export default Header;
