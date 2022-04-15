import card__styles from './card.module.css';
import { AiOutlineHeart } from 'react-icons/ai';
import { FC } from 'react';
import { FaCrown } from 'react-icons/fa';
import { convertFromRaw, RawDraftContentState } from 'draft-js';
const Card: FC<{
  golden?: boolean;
  author: string;
  rawContent: string;
  likes: number;
  date: Date;
  title: string;
}> = ({ golden = false, author, date, likes, rawContent, title }) => {
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
          <div className={card__styles.icon}></div>
          {author}
        </div>
        <div className={card__styles.title}>{title}</div>
        <div className={card__styles.subtitle}>
          {convertFromRaw(
            JSON.parse(rawContent) as RawDraftContentState
          ).getPlainText()}
        </div>
        <div className={card__styles.more__info}>
          <div className={card__styles.info__text}>
            {new Date(date).toLocaleDateString()}
          </div>
          <div className={card__styles.info__text}>
            {likes}
            <AiOutlineHeart className={card__styles.like_button} />
          </div>
          <div className={card__styles.subtitle}>Categorie</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
