import React, { FC } from 'react';
import { ContentBlock, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { styles } from '../style';

function mediaBlockRenderer(block: ContentBlock) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}

const Image: FC<{ src: string }> = ({ src }) => {
  return <img src={src} style={styles.media} />;
};

const Media: FC<{ block: ContentBlock; contentState: ContentState }> = ({
  block,
  contentState,
}) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();

  return <Image src={src} />;
};

export default mediaBlockRenderer;
