import { selectFrom } from 'store/widgets/actions/modals-actions';
import ModalTemplate from '../Modals';
import blogs__styles from './blogs.module.css';
import Dispatch from 'components/Widgets/Button/Dispatch/Dispatch';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { descriptionFrom } from 'utils/description-from-content';
import { dateFrom } from 'utils/date';
import Loading from 'components/Loading/Loading';
import { ServerResponse } from 'types/server';
import { Blogs } from '@prisma/client';
import { useEffect, useCallback, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux-hooks';
import { setBlogsForSubject } from './blog-posts-slice';
const Card = dynamic(() => import('./Card/Card'));

const Blog = () => {
  const router = useRouter();
  const { name, visible } = selectFrom<{ name: string }>('blogs-modal');
  const blogs = useAppSelector(({ blogPosts }) => blogPosts[name]);
  const fetchBlogs = useCallback(async () => {
    const response = await fetch(`/api/blogs/get-blogs/${name}`);
    return (await response.json()) as ServerResponse<Blogs[]>;
  }, [name]);

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const useBlogs = async () => {
      if (!blogs) {
        setLoading(true);
        const response = await fetchBlogs();
        if (response.error) return;
        dispatch(
          setBlogsForSubject({
            blogs: response.payload,
            subject: name,
          })
        );
        setLoading(false);
      }
    };

    useBlogs();
  }, [name, blogs, visible]);

  return visible ? (
    <ModalTemplate
      header={{
        subtitle: 'Arhiva culturala',
        title: name,
      }}
      useMaxHeight={true}
      modal="blogs-modal"
    >
      <div className={blogs__styles.container}>
        <div className={blogs__styles.options__container}>
          <Dispatch
            action={() => {
              router.push(`/create-blog/${name}`);
            }}
            payload="Scrie o postare"
          ></Dispatch>
        </div>
        {loading ? (
          <Loading />
        ) : blogs?.length ? (
          blogs.map((blog, index) => (
            <Card
              golden={index === 0}
              key={blog.blogId + blog.userId}
              authorID={blog.userId}
              date={dateFrom(blog.createdAt)}
              likes={blog.likeCount}
              description={descriptionFrom(blog.content)}
              title={blog.title}
              blogID={blog.blogId}
              monument={name}
              rawContent={blog.content}
            />
          ))
        ) : (
          <div className={blogs__styles.nothing_to_see}>
            Se pare ca nu au mai fost scrise bloguri despre {name}
          </div>
        )}
      </div>
    </ModalTemplate>
  ) : null;
};

export default Blog;
