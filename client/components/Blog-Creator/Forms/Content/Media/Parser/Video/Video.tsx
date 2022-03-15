import { FC } from 'react';

const Video: FC<{ src: string }> = ({ src }) => {
  return (
    <video
      controls
      src={src}
      style={{
        width: '100%',
        whiteSpace: 'initial',
      }}
    />
  );
};

export default Video;
