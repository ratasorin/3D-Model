import { FC } from 'react';
import Description from './Description/Description';
import Title from './Title/Title';
const Content: FC<{
  title: string;
  description: string;
  rawContent: string;
  author: string;
  likes: number;
  blogID: string;
  monument: string;
  authorID: string;
}> = ({
  description,
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
      <Description description={description} />
    </>
  );
};

export default Content;
