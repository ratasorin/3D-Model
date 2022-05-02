import { FC } from 'react';
import Description from './Description/Description';
import Title from './Title/Title';
const Content: FC<{
  title: string;
  content: string;
  rawContent: string;
  author: string;
  likes: number;
  blogID: string;
  monument: string;
  authorID: string;
}> = ({
  content,
  title,
  author,
  likes,
  rawContent,
  blogID,
  monument,
  authorID,
}) => {
  return (
    <>
      <Title
        authorID={authorID}
        monument={monument}
        title={title}
        content={rawContent}
        author={author}
        likes={likes}
        blogID={blogID}
      />
      <Description content={content} />
    </>
  );
};

export default Content;
