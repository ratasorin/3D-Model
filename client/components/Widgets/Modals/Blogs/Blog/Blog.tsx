import mediaBlockRenderer from 'components/Blog-Creator/Forms/Editor/Media/Media';
import {
  convertFromRaw,
  RawDraftContentState,
  Editor,
  EditorState,
} from 'draft-js';

import { selectFrom } from 'store/widgets/actions/modals-actions';
import ModalTemplate from '../../Modals';
import { Blog as BlogType } from './blog-slice';
import blog__style from './blog.module.css';

const Blog = () => {
  const { visible, author, content, likes, title } =
    selectFrom<BlogType>('blog-modal');

  return visible ? (
    <ModalTemplate
      header={{
        subtitle: author,
        title,
      }}
      modal="blog-modal"
    >
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
    </ModalTemplate>
  ) : null;
};

export default Blog;
