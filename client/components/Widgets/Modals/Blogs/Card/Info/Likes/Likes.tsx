import { FC, useEffect, useRef, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import like__style from './likes.module.css';
import throttle from 'lodash.throttle';
import { ServerResponse } from 'pages/types/response';
const Likes: FC<{
  likes: number;
  blogID: string;
  authorID: string;
  monument: string;
}> = ({ likes: initialLikes, authorID, blogID, monument }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    const getUserLiked = async () => {
      const response = (await fetch(
        `/api/blogs/like/${blogID}/${authorID}/${monument}`
      )) as Response;
      const { payload } = (await response.json()) as ServerResponse<boolean>;
      setLiked(!!payload);
    };
    getUserLiked();
  }, []);
  const facadeUpdateLikes = () => {
    setLikes(likes + (!liked ? 1 : -1));
    setLiked(!liked);
  };
  const updateLikes = (likes: number, liked: boolean) => {
    fetch(
      `/api/blogs/like/${blogID}/${authorID}/${monument}/${
        !liked ? 'like' : 'dislike'
      }`,
      {
        method: 'POST',
        body: JSON.stringify({
          likes: likes + (!liked ? 1 : -1),
          didLike: !liked,
        }),
      }
    );
  };
  const throttledUpdateLikes = useRef(throttle(updateLikes, 2000));

  return (
    <div className={like__style.info__text}>
      {likes}
      {liked ? (
        <AiFillHeart
          className={like__style.like_button}
          onClick={() => {
            facadeUpdateLikes();
            throttledUpdateLikes.current(likes, liked);
          }}
        />
      ) : (
        <AiOutlineHeart
          className={like__style.like_button}
          onClick={() => {
            facadeUpdateLikes();
            throttledUpdateLikes.current(likes, liked);
          }}
        />
      )}
    </div>
  );
};

export default Likes;
