import { FC, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import like__style from './likes.module.css';

const Likes: FC<{
  likes: number;
  blogID: string;
  authorID: string;
  monument: string;
}> = ({ likes: initialLikes, authorID, blogID, monument }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  return (
    <div className={like__style.info__text}>
      {likes}
      {liked ? (
        <AiFillHeart
          className={like__style.like_button}
          onClick={() => {
            setLikes(likes + 1);
            fetch(`/api/blogs/like/${blogID}/${authorID}/${monument}`, {
              method: 'POST',
              body: likes + 1,
            });
          }}
        />
      ) : (
        <AiOutlineHeart
          className={like__style.like_button}
          onClick={() => {
            setLikes(likes + 1);
            setLiked(true);
            fetch(`/api/blogs/like/${blogID}/${authorID}/${monument}`, {
              method: 'POST',
              body: likes + 1,
            });
          }}
        />
      )}
    </div>
  );
};

export default Likes;
