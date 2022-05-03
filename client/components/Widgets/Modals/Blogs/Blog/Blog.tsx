import mediaBlockRenderer from 'components/Blog-Creator/Forms/Editor/Media/Media';
import {
  convertFromRaw,
  RawDraftContentState,
  Editor,
  EditorState,
} from 'draft-js';
import Dispatch from 'components/Widgets/Button/Dispatch/Dispatch';
import { selectFrom } from 'store/widgets/actions/modals-actions';
import ModalTemplate from '../../Modals';
import { Blog as BlogType } from './blog-slice';
import blog__style from './blog.module.css';
import { useSession } from 'next-auth/react';

const Blog = () => {
  const { visible, author, content, title, blogID, authorID, monument } =
    selectFrom<BlogType>('blog-modal');
  const user = useSession().data?.user;
  return visible ? (
    <ModalTemplate
      header={{
        subtitle: author,
        title,
      }}
      modal="blog-modal"
    >
      <div className={blog__style.button_div__container}>
        {author === user?.name ? (
          <div className={blog__style.button__container}>
            <Dispatch
              action={() => {
                fetch(`/api/blogs/blog/${authorID}/${monument}/${blogID}`);
              }}
              payload="Sterge postarea"
            />
          </div>
        ) : null}
        <div className={blog__style.container}>
          <Editor
            onChange={() => {
              // do nothing
            }}
            blockRendererFn={mediaBlockRenderer}
            placeholder="Enter some text..."
            customStyleMap={{
              QUOTE: {
                backgroundColor: 'red',
              },
            }}
            readOnly={true}
            editorState={EditorState.createWithContent(
              convertFromRaw(JSON.parse(content) as RawDraftContentState)
            )}
          />
        </div>
      </div>
    </ModalTemplate>
  ) : null;
};

export default Blog;
