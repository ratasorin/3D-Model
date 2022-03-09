import Uploader from 'hooks/Image/Upload';
import { ChangeEvent, useRef } from 'react';
import url$ from 'lib/text-editor-image-uploader';
import uploader__style from './uploader.module.css';

import { BsPlusLg } from 'react-icons/bs';
const Upload = () => {
  const button = useRef<HTMLButtonElement>(null);

  return (
    <div className={uploader__style.options}>
      <button
        style={{
          width: 'fit-content',
        }}
        ref={button}
        className={uploader__style.option}
      >
        <BsPlusLg className={uploader__style.icon} />
      </button>
      <Uploader
        handler={(event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            url$.next(file);
          }
        }}
        trigger={button}
      />
    </div>
  );
};

export default Upload;
