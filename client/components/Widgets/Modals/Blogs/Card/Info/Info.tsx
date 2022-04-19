import { FC } from 'react';
import PostDate from './Date/Date';
import info__style from './info.module.css';
import Likes from './Likes/Likes';
const Info: FC<{
  date: string;
  likes: number;
  blogID: string;
  authorID: string;
  monument: string;
}> = ({ authorID, blogID, date, likes, monument }) => {
  return (
    <div className={info__style.more__info}>
      <PostDate date={date} />
      <Likes
        authorID={authorID}
        blogID={blogID}
        likes={likes}
        monument={monument}
      />
    </div>
  );
};

export default Info;
