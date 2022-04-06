import React, { FC } from 'react';
import { ContentBlock, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import Image from './Parser/Image/Image';
import PDF from './Parser/PDF/PDF';
import Video from './Parser/Video/Video';

function mediaBlockRenderer(block: ContentBlock) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}

const Media: FC<{ block: ContentBlock; contentState: ContentState }> = ({
  block,
  contentState,
}) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, type } = entity.getData();
  if (type === 'image') return <Image src={src} />;
  if (type === 'pdf') return <PDF src={src} />;
  if (type === 'video') return <Video src={src}></Video>;
  return null;
};

export default mediaBlockRenderer;
