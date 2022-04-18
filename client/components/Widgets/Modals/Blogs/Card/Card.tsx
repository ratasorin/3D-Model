import card__styles from './card.module.css';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FC, useEffect, useState } from 'react';
import { FaCrown } from 'react-icons/fa';
import { convertFromRaw, RawDraftContentState } from 'draft-js';
import { parsedDate } from 'lib/date';
import { RequestResponse } from 'pages/api/church-info/[church]';
import { User } from '@prisma/client';
import { openPopup } from 'store/widgets/actions/popup-actions';
import { PopupBuilder } from 'store/widgets/widgets-actions';
const Card: FC<{
  golden?: boolean;
  authorID: string;
  rawContent: string;
  likes: number;
  date: Date;
  title: string;
  blogID: string;
  monument: string;
}> = ({
  golden = false,
  authorID,
  date,
  likes: initialLikes,
  rawContent,
  title,
  blogID,
  monument,
}) => {
  const [author, setAuthor] = useState<User | null>(null);
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    const getAuthors = async () => {
      const response = await fetch(`/api/blogs/${authorID}`);
      const author = (await response.json()) as RequestResponse<User>;

      if (author.error)
        openPopup('success-popup', {
          payload: author.payload,
          type: 'Error',
        } as PopupBuilder);
      else setAuthor(author.payload);
    };
    getAuthors();
  }, []);

  const Award = (
    <>
      {golden ? (
        <div className={card__styles.award}>Cel mai apreciat articol</div>
      ) : null}
      {golden ? (
        <div className={card__styles.crown__container}>
          <FaCrown className={card__styles.crown} />
        </div>
      ) : null}
    </>
  );
  return (
    <div className={card__styles.golden_distinction}>
      {Award}
      <div className={card__styles.container}>
        <div className={card__styles.author__info}>
          <div className={card__styles.icon}>
            <img src={author ? author.image : ''} alt="PFP" />
          </div>
          {author ? author.name : null}
        </div>
        <div className={card__styles.title}>{title}</div>
        <div className={card__styles.subtitle}>
          {convertFromRaw(
            JSON.parse(rawContent) as RawDraftContentState
          ).getPlainText()}
        </div>
        <div className={card__styles.more__info}>
          <div className={card__styles.info__text}>
            {parsedDate(new Date(date).toLocaleDateString())}
          </div>
          <div className={card__styles.info__text}>
            {likes}
            {liked ? (
              <AiFillHeart
                className={card__styles.like_button}
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
                className={card__styles.like_button}
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
        </div>
      </div>
    </div>
  );
};

export default Card;
