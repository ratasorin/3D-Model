import { selectFrom } from 'store/widgets/actions/modals-actions';
import ModalTemplate from '../Modals';
import blogs__styles from './blogs.module.css';
import Dispatch from 'components/Widgets/Button/Dispatch/Dispatch';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useBlogs } from 'hooks/useBlogs';
import { descriptionFrom } from 'utils/description-from-content';
import { dateFrom } from 'utils/date';
import Loading from 'components/Loading/Loading';
import { ServerResponse } from 'types/server';
import { Blogs } from '@prisma/client';
import { useEffect } from 'react';
const Card = dynamic(() => import('./Card/Card'));

const Blog = () => {
  const router = useRouter();
  const { name, visible } = selectFrom<{ name: string }>('blogs-modal');
  const { blogs, loading, trigger } = useBlogs(name, async () => {
    const response = await fetch(`/api/blogs/get-blogs/${name}`);
    return (await response.json()) as ServerResponse<Blogs[]>;
  });

  useEffect(() => {
    if (visible) trigger(true);
  }, [visible]);

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
              console.log('ACTION');
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
