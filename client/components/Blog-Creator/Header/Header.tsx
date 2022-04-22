import { FC, useEffect, useState } from 'react';
import header__style from './header.module.css';
import Submit from 'components/Widgets/Button/Submit/Submit';
import { useSession } from 'next-auth/react';
import { editorState$ } from '../Forms/Editor/Editor';
import { map } from 'rxjs';
import { useAppSelector } from 'hooks/redux-hooks';
import { convertToRaw } from 'draft-js';
import { generateNewHash } from '../Forms/Title/title-slice';

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
  const [path, setPath] = useState(
    `/api/blogs/${user?.name}/${title.postHash}`
  );
  useEffect(() => {
    generateNewHash();
  }, []);

  useEffect(() => {
    setPath(`/api/blogs/${user?.name}/${title.title || title.postHash}`);
  }, [title.title, user?.name]);

  return (
    <div className={header__style.container}>
      <div className={header__style.action__info}>Creeaza o postare pentru</div>
      <div className={header__style.main__content}>
        {monument}
        <div className={header__style.actions}>
          <Submit
            payload="POSTEAZA"
            data={makePost(title.postHash, monument)}
            path={path}
            stringify={true}
          ></Submit>
        </div>
      </div>
    </div>
  );
};

export default Header;
