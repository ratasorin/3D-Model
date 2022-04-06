import { FC } from 'react';

const Image: FC<{ src: string }> = ({ src }) => {
  return (
    <img
      src={src}
      style={{
        width: '100%',
        // Fix an issue with Firefox rendering video controls
        // with 'pre-wrap' white-space
        whiteSpace: 'initial',
      }}
    />
  );
};

export default Image;
