import { selectFrom } from 'store/widgets/actions/modals-actions';
import ModalTemplate from '../Modals';
import blogs__styles from './blogs.module.css';
import Dispatch from 'components/Widgets/Button/Dispatch/Dispatch';
import { useRouter } from 'next/router';
import Filter from './Filter/Filter';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { FailResponse, SuccessResponse } from 'pages/api/church-info/[church]';
import { Blogs } from '@prisma/client';
import { openPopup } from 'store/widgets/actions/popup-actions';
import { PopupBuilder } from 'store/widgets/widgets-actions';
import { convertFromRaw, RawDraftContentState } from 'draft-js';
const Card = dynamic(() => import('./Card/Card'));

const contentFrom = (rawContent: string) => {
  return convertFromRaw(
    JSON.parse(rawContent) as RawDraftContentState
  ).getPlainText();
};

const Blog = () => {
  const router = useRouter();
  const { name, visible } = selectFrom<{ name: string }>('blogs-modal');
  const [blogs, setBlogs] = useState<Blogs[] | null>([]);
  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetch(`/api/blogs/get-blogs/${name}`);
      const fetchedBlogs = (await response.json()) as
        | SuccessResponse<Blogs[]>
        | FailResponse;
      if (fetchedBlogs.error)
        openPopup('success-popup', {
          payload: fetchedBlogs.payload,
          type: 'Error',
        } as PopupBuilder);
      else setBlogs(fetchedBlogs.payload);
    };
    visible ? getBlogs() : null;
  }, [visible]);
  return visible ? (
    <ModalTemplate
      header={{
        subtitle: 'Arhiva culturala',
        title: name,
      }}
      modal="blogs-modal"
    >
      <div className={blogs__styles.container}>
        <div className={blogs__styles.options__container}>
          <Filter></Filter>
          <Dispatch
            action={() => {
              console.log('ACTION');
              router.push(`/create-blog/${name}`);
            }}
            payload="Scrie o postare"
          ></Dispatch>
        </div>
        {blogs?.map((blog, index) => (
          <Card
            golden={index === 0}
            key={blog.blogId + blog.userId}
            authorID={blog.userId}
            date={blog.createdAt as unknown as string}
            likes={blog.likes}
            content={contentFrom(blog.content)}
            title={blog.title}
            blogID={blog.blogId}
            monument={name}
          />
        ))}
      </div>
    </ModalTemplate>
  ) : null;
};

export default Blog;
