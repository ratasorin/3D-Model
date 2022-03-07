import React, { FC } from 'react';
import { ContentBlock, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';

function mediaBlockRenderer(block: ContentBlock) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}

const Audio: FC<{ src: string }> = ({ src }) => {
  return <audio controls src={src} style={styles.media} />;
};

const Image: FC<{ src: string }> = ({ src }) => {
  return <img src={src} style={styles.media} />;
};

const Video: FC<{ src: string }> = ({ src }) => {
  return <video controls src={src} style={styles.media} />;
};

const Media: FC<{ block: ContentBlock; contentState: ContentState }> = ({
  block,
  contentState,
}) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media = null;
  if (type === 'audio') {
    media = <Audio src={src} />;
  } else if (type === 'image') {
    media = <Image src={src} />;
  } else if (type === 'video') {
    media = <Video src={src} />;
  }
  return media;
};

export default mediaBlockRenderer;
