import Uploader from 'hooks/Image/Upload';
import usePhotos from 'hooks/usePhotos';
import { useRef } from 'react';
import galerie__style from './galerie.module.css';

const Galerie = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className={galerie__style.container}>
      <div className={galerie__style.header}> GALERIE </div>
      <div className={galerie__style.content}>
        <button ref={buttonRef}>Incarca o imagine</button>
        <Uploader
          handleFile={(file) => {
            console.log({ file });
            const form = new FormData();
            form.append('galerie', file, file.name);
            fetch(`/api/images/images`, {
              method: 'POST',
              body: form,
            });
          }}
          trigger={buttonRef}
        ></Uploader>
      </div>
    </div>
  );
};

export default Galerie;
