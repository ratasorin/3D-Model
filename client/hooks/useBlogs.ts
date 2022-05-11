import { Blogs } from '@prisma/client';
import { ServerResponse } from 'types/server';
import { useCallback, useEffect, useState } from 'react';
import { openPopup } from 'store/widgets/actions/popup-actions';
import { PopupBuilder } from 'store/widgets/widgets-actions';
import { setBlogsForSubject } from 'components/Widgets/Modals/Blogs/blog-posts-slice';
import { useAppSelector } from './redux-hooks';

export const useBlogs = <T extends Blogs[] | null>(
  data: (
    oldBlogs: Blogs[] | null
  ) => Promise<ServerResponse<T>> | ServerResponse<T>
) => {
  const [blogs, setBlogs] = useState<Blogs[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const blogPosts = useAppSelector(({ blogPosts }) => blogPosts);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    const response = await data(blogs);
    if (response.error)
      openPopup('success-popup', {
        payload: response.payload,
        type: 'Error',
      } as PopupBuilder);
    else {
      setBlogs(response.payload);
      setBlogsForSubject({ subject, blogs: response.payload });
    }
    setLoading(false);
  }, [data]);

  useEffect(() => {
    const blogs = blogPosts?.subject;
    if (blogs) setBlogs(blogPosts?.subject);
    else fetchBlogs();
  }, [subject, blogPosts]);

  return { blogs, loading, changeSubject: setSubject };
};
