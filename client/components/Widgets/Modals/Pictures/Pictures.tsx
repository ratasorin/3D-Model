import { imagesFrom } from 'lib/modal';
import { useRef } from 'react';
import { CgCloseO } from 'react-icons/cg';
import image_supplier__style from './pictures.module.css';
import Submit from '../../Button/Submit/Submit';
import ModalTemplate from '../Modals';
import { selectFrom } from 'store/widgets/actions/modals-actions';
import usePhotos from 'hooks/usePhotos';
import Uploader from 'hooks/Image/Upload';
import Button from './Button/Button';

export default function Pictures() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { visible, name } = selectFrom<{ name: string }>('picture-modal');
  const { addPhoto, removePhoto, photos } = usePhotos();

  return visible ? (
    <ModalTemplate
      modal="picture-modal"
      header={{
        subtitle: (
          <div className={image_supplier__style.subtitle}>
            Fotografiile pot ajuta utilizatorii sa recunoasca mai usor locatia
          </div>
        ),
        title: 'Adaugati o fotografie',
      }}
    >
      <Uploader handleFile={addPhoto} trigger={buttonRef} />
      <div className={image_supplier__style.container}>
        <Button buttonRef={buttonRef} />
        <div className={image_supplier__style.preview}>
          {photos.map(({ src, file, name }) => (
            <button
              onKeyDown={(event) => {
                // delete images upon focusing and pressing the enter key on any given image
                event.key === 'Enter' ? removePhoto(src, name, file) : 0;
              }}
              key={name}
              className={image_supplier__style.hideButton}
            >
              <div className={image_supplier__style.thumbnail}>
                <CgCloseO
                  onClick={() => {
                    removePhoto(src, name, file);
                  }}
                  className={image_supplier__style.closeIcon}
                />
                <img
                  src={src}
                  onError={() => {
                    // ERROR HANDLING
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className={image_supplier__style.save_button__container}>
        <Submit
          payload={'Salvati fotografiile'}
          data={imagesFrom(name)}
          path={'/api/images/images'}
          stringify={false}
        />
      </div>
    </ModalTemplate>
  ) : null;
}
