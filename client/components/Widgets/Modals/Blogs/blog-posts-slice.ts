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
      if (!state[action.payload.subject]) return state;
      return {
        ...state,
        [action.payload.subject]: action.payload.blogs,
      };
    },

    alterBlogsForSubject(
      state,
      action: PayloadAction<{
        subject: string;
        modifier: (blogs: Blogs[] | null) => Blogs[] | null;
      }>
    ) {
      console.log(
        'NEW STATE:',
        action.payload.modifier(state[action.payload.subject])
      );

      return {
        ...state,
        [action.payload.subject]: action.payload.modifier(
          state[action.payload.subject]
        ),
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
export const { alterBlogsForSubject, setBlogsForSubject } =
  blogPostsSlice.actions;
