import { useRouter } from 'next/router';
import Header from 'components/Blog-Creator/Header/Header';
import monument_creator__style from './monument-creator.module.css';
import dynamic from 'next/dynamic';
import Tools from 'components/Widgets/Popup/Tools/Tools';
import Success from 'components/Widgets/Popup/Success/Success';
import Authenticate from 'components/Widgets/Modals/Authenticate/Authenticate';
import Submit from 'components/Widgets/Button/Submit/Submit';
const Forms = dynamic(() => import('components/Blog-Creator/Forms/Forms'), {
  ssr: false,
});
import { editorState$ } from 'components/Blog-Creator/Forms/Editor/Editor';
import { map } from 'rxjs';
import { convertToRaw } from 'draft-js';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { useSession } from 'next-auth/react';
import { invalidateCache } from 'components/Widgets/Modals/Blogs/blog-posts-slice';

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

const Monument = () => {
  const router = useRouter();
  const user = useSession().data?.user;
  const title = useAppSelector(({ title }) => title);
  const [path, setPath] = useState(
    `/api/blogs/${user?.name}/${title.postHash}`
  );
  useEffect(() => {
    setPath(`/api/blogs/${user?.name}/${title.title || title.postHash}`);
  }, [title.title, user?.name]);
  const monument = (router.query.monument as string) || '';
  const dispatch = useAppDispatch();
  return (
    <div className={monument_creator__style.fullpage}>
      <Tools />
      <Header
        monument={monument}
        subtitle="Creeaza o postare pentru"
        Button={
          <Submit
            payload="POSTEAZA"
            data={makePost(title.postHash, monument)}
            path={path}
            stringify={true}
            then={() => {
              dispatch(invalidateCache(monument.toLocaleLowerCase()));
              router.push('/');
            }}
          ></Submit>
        }
      />
      <Forms />
      <Success></Success>
      <Authenticate></Authenticate>
    </div>
  );
};

export default Monument;
