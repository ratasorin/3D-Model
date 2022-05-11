import { Blogs } from '@prisma/client';
import Header from 'components/Blog-Creator/Header/Header';
import Loading from 'components/Loading/Loading';
import Dispatch from 'components/Widgets/Button/Dispatch/Dispatch';
import { setBlogsForSubject } from 'components/Widgets/Modals/Blogs/blog-posts-slice';
import Blog from 'components/Widgets/Modals/Blogs/Blog/Blog';
import Card from 'components/Widgets/Modals/Blogs/Card/Card';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { ServerResponse } from 'types/server';
import { dateFrom } from 'utils/date';
import { descriptionFrom } from 'utils/description-from-content';
import cerc__style from './cerc-de-lectura.module.css';

const NAME = 'cerc de lectura';
const CercDeLectura = () => {
  const router = useRouter();
  const blogs = useAppSelector(({ blogPosts }) => blogPosts[NAME]);
  const fetchBlogs = useCallback(async () => {
    const response = await fetch(`/api/blogs/get-blogs/${NAME}`);
    return (await response.json()) as ServerResponse<Blogs[]>;
  }, []);

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
            subject: NAME,
          })
        );
        setLoading(false);
      }
    };

    useBlogs();
  }, [blogs]);
  return (
    <>
      <div className={cerc__style.container}>
        <Header
          monument="Cerc de lectura"
          subtitle="Arhiva culturala"
          Button={
            <Dispatch
              action={() => {
                router.push(`create-blog/Cerc de lectura`);
              }}
              payload="SCRIETI O POSTARE"
            />
          }
        />
        <div className={cerc__style.posts}>
          {loading ? (
            <Loading />
          ) : (
            blogs?.map((blog) => (
              <Card
                authorID={blog.userId}
                blogID={blog.blogId}
                description={descriptionFrom(blog.content)}
                date={dateFrom(blog.createdAt)}
                likes={blog.likeCount}
                monument="cerc de lectura"
                rawContent={blog.content}
                key={blog.content}
                title={blog.title}
                golden={false}
              />
            ))
          )}
        </div>
      </div>
      <Blog />
    </>
  );
};

export default CercDeLectura;
