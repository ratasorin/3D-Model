import { Blogs } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'hooks/redux-hooks';

const blogPostsSlice = createSlice({
  name: 'blogPosts',
  initialState: {} as Record<string, Blogs[] | null>,
  reducers: {
    setBlogsForSubject(
      state,
      action: PayloadAction<{
        subject: string;
        blogs: Blogs[] | null;
      }>
    ) {
      return {
        ...state,
        [action.payload.subject]: action.payload.blogs,
      };
    },
  },
});

export const getBlogs = (subject: string) => {
  const blogs = useAppSelector(({ blogPosts }) => blogPosts);
  if (blogs) return blogs[subject];
  return null;
};

export default blogPostsSlice.reducer;
export const { name } = blogPostsSlice;
export const { setBlogsForSubject } = blogPostsSlice.actions;
