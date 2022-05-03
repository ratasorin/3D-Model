import { Blogs } from '@prisma/client';
import { ServerResponse } from 'types/server';
import { useEffect, useState } from 'react';
import { openPopup } from 'store/widgets/actions/popup-actions';
import { PopupBuilder } from 'store/widgets/widgets-actions';

export const useBlogs = (subject: string, trigger?: boolean) => {
  const [blogs, setBlogs] = useState<Blogs[] | null>([]);
  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetch(`/api/blogs/get-blogs/${subject}`);
      const fetchedBlogs = (await response.json()) as ServerResponse<Blogs[]>;
      if (fetchedBlogs.error)
        openPopup('success-popup', {
          payload: fetchedBlogs.payload,
          type: 'Error',
        } as PopupBuilder);
      else setBlogs(fetchedBlogs.payload);
    };
    getBlogs();
  }, [trigger]);

  return blogs;
};
