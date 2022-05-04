import { Blogs } from '@prisma/client';
import { ServerResponse } from 'types/server';
import { useEffect, useState } from 'react';
import { openPopup } from 'store/widgets/actions/popup-actions';
import { PopupBuilder } from 'store/widgets/widgets-actions';

export const useBlogs = (subject: string, trigger?: boolean) => {
  const [blogs, setBlogs] = useState<Blogs[] | null>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      const response = await fetch(`/api/blogs/get-blogs/${subject}`);
      const fetchedBlogs = (await response.json()) as ServerResponse<Blogs[]>;
      console.log(fetchedBlogs);
      if (fetchedBlogs.error)
        openPopup('success-popup', {
          payload: fetchedBlogs.payload,
          type: 'Error',
        } as PopupBuilder);
      else setBlogs(fetchedBlogs.payload);
      setLoading(false);
    };
    getBlogs();
  }, [trigger]);

  return { blogs, loading };
};
