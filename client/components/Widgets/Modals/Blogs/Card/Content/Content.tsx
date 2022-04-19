import { FC } from 'react';
import Description from './Description/Description';
import Title from './Title/Title';
const Content: FC<{ title: string; content: string }> = ({
  content,
  title,
}) => {
  return (
    <>
      <Title title={title} />
      <Description content={content} />
    </>
  );
};

export default Content;
