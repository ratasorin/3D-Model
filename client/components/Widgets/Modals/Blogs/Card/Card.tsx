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
import Author from './Author/Author';
import Content from './Content/Content';
import Info from './Info/Info';

const Card: FC<{
  golden?: boolean;
  authorID: string;
  content: string;
  likes: number;
  date: string;
  title: string;
  blogID: string;
  monument: string;
}> = ({
  golden = false,
  authorID,
  date,
  likes,
  content,
  title,
  blogID,
  monument,
}) => {
  const [author, setAuthor] = useState<User | null>(null);

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
        <Author author={author} />
        <Content content={content} title={title} />
        <Info
          authorID={authorID}
          blogID={blogID}
          date={date}
          likes={likes}
          monument={monument}
        />
      </div>
    </div>
  );
};

export default Card;
