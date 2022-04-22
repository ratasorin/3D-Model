import { FC, useCallback } from 'react';
import { openModal } from 'store/widgets/actions/modals-actions';
import { Blog } from '../../../Blog/blog-slice';
import title__style from './title.module.css';

const Title: FC<{
  title: string;
  author: string;
  content: string;
  likes: number;
}> = ({ title, author, content, likes }) => {
  const openBlog = useCallback(() => {
    openModal('blog-modal', { author, content, likes, title } as Blog);
  }, [content, title, author, likes]);

  return (
    <button onClick={openBlog} className={title__style.title}>
      {title}
    </button>
  );
};

export default Title;
