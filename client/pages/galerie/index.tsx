import Image from 'components/Widgets/Modals/Image/Image';
import Button from 'components/Widgets/Modals/Pictures/Button/Button';
import Uploader from 'hooks/Image/Upload';
// import usePhotos from 'hooks/usePhotos';
import { useEffect, useRef, useState } from 'react';
import { openModal } from 'store/widgets/actions/modals-actions';
import { openPopup } from 'store/widgets/actions/popup-actions';
import { PopupBuilder } from 'store/widgets/widgets-actions';
import { ServerResponse } from 'types/server';
import galerie__style from './galerie.module.css';

const Galerie = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    const getAllPictures = async () => {
      const response = await fetch('/api/images/galerie');
      const images = (await response.json()) as ServerResponse<string[]>;
      if (images.error) {
        openPopup('success-popup', {
          payload: 'Nu am putut gasi imaginile pentru galerie',
          type: 'Error',
        } as PopupBuilder);
        return [] as string[];
      }
      return images.payload || [];
    };
    getAllPictures().then((urls) => setImages(urls));
  }, []);
  return (
    <>
      <div className={galerie__style.container}>
        <div className={galerie__style.header}> GALERIE </div>
        <div className={galerie__style.content}>
          <div className={galerie__style.button__container}>
            <Button buttonRef={buttonRef} />
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
          <div className={galerie__style.gallery}>
            {images.map((url) => (
              <div key={url} className={galerie__style.image__container}>
                <img
                  src={url}
                  alt="imagine"
                  onClick={() => {
                    console.log(url);
                    openModal('image-viewer', {
                      src: url,
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Image />
    </>
  );
};

export default Galerie;
