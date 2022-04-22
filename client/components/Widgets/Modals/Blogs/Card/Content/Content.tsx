import { FC } from 'react';
import Description from './Description/Description';
import Title from './Title/Title';
const Content: FC<{
  title: string;
  content: string;
  rawContent: string;
  author: string;
  likes: number;
}> = ({ content, title, author, likes, rawContent }) => {
  return (
    <>
      <Title title={title} content={rawContent} author={author} likes={likes} />
      <Description content={content} />
    </>
  );
};

export default Content;
