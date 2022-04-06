import Uploader from 'hooks/Image/Upload';
import { FC, useRef } from 'react';
import uploader__style from './file-uploader.module.css';
import { Subject } from 'rxjs';
import { openPopup } from 'store/widgets/actions/popup-actions';
import { IconType } from 'react-icons/lib';

export const file$ = new Subject<File>();

const Upload: FC<{ type: string; Icon: IconType }> = ({ type, Icon }) => {
  const button = useRef<HTMLButtonElement>(null);
  const sendFile = (file: File) => {
    if (file.type.includes(type)) file$.next(file);
    else
      openPopup('success-popup', {
        payload: `Fisierul nu este de tip ${type}`,
        type: 'Error',
      });
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
        <Icon className={uploader__style.icon} />
      </button>
      <Uploader handleFile={sendFile} trigger={button} />
    </div>
  );
};

export default Upload;
