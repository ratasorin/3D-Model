import card__styles from './card.module.css';
import { FC, useEffect, useState } from 'react';
import { FaCrown } from 'react-icons/fa';
import { ServerResponse } from 'pages/types/server';
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
  rawContent: string;
}> = ({
  golden = false,
  authorID,
  date,
  likes,
  title,
  blogID,
  monument,
  rawContent,
  content,
}) => {
  const [author, setAuthor] = useState<User | null>(null);

  useEffect(() => {
    const getAuthors = async () => {
      const response = await fetch(`/api/blogs/${authorID}`);
      const author = (await response.json()) as ServerResponse<User>;

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
        <Content
          content={content}
          rawContent={rawContent}
          title={title}
          author={author?.name || ''}
          likes={likes}
        />
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
