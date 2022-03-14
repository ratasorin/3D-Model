import Uploader from 'hooks/Image/Upload';
import { useRef } from 'react';
import uploader__style from './file-uploader.module.css';
import { BsPlusLg } from 'react-icons/bs';
import { Subject } from 'rxjs';

export const file$ = new Subject<File>();

const Upload = () => {
  const button = useRef<HTMLButtonElement>(null);
  const sendFile = (file: File) => {
    file$.next(file);
  };
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
      <Uploader handleFile={sendFile} trigger={button} />
    </div>
  );
};

export default Upload;
