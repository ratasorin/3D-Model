import { createModalSlice } from 'store/widgets/widgets-creators';
export interface Blog {
  content: string;
  author: string;
  likes: number;
  title: string;
}

const blogSlice = createModalSlice<
  'blog-modal',
  {
    content: string;
    author: string;
    likes: number;
    title: string;
  }
>('blog-modal', {
  author: '',
  content: '',
  likes: 0,
  title: '',
});

export const name = blogSlice.name;
export const { close, open } = blogSlice.actions;
export default blogSlice.reducer;
