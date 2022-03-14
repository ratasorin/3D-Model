import { imagesFrom } from 'lib/modal';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import useToggle from 'hooks/useToggle';
import { CgCloseO } from 'react-icons/cg';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import imageSupplierStyle from './pictures.module.css';
import Submit from '../../Button/Submit/Images/SubmitImages';
import ModalTemplate from '../Modals';
import { selectFrom } from 'store/widgets/actions/modals-actions';
import usePhotos from 'hooks/usePhotos';
import Uploader from 'hooks/Image/Upload';

export default function Pictures() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { state: show, toggle } = useToggle();
  const { visible, name } = selectFrom<{ name: string }>('picture-modal');
  const { addPhoto, removePhoto, photos } = usePhotos();

  return visible ? (
    <ModalTemplate
      modal="picture-modal"
      header={{
        subtitle: (
          <div className={imageSupplierStyle.subtitle}>
            Fotografiile pot ajuta utilizatorii sa recunoasca mai usor locatia
          </div>
        ),
        title: 'Adaugati o fotografie',
      }}
    >
      <Uploader handleFile={addPhoto} trigger={buttonRef} />
      <div className={imageSupplierStyle.container}>
        <motion.button
          layout
          ref={buttonRef}
          className={imageSupplierStyle.button}
          onMouseEnter={toggle}
          onMouseLeave={toggle}
        >
          <motion.div layoutId="Ceva" className={imageSupplierStyle.text}>
            Adauga fotografii
          </motion.div>
          {show ? (
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              className={imageSupplierStyle.iconDiv}
            >
              <MdOutlinePhotoCamera className={imageSupplierStyle.icon} />
            </motion.div>
          ) : null}
        </motion.button>

        <div className={imageSupplierStyle.preview}>
          {photos.map(({ src, file, name }) => (
            <button
              onKeyDown={(event) => {
                // delete images upon focusing and pressing the enter key on any given image
                event.key === 'Enter' ? removePhoto(src, name, file) : 0;
              }}
              key={name}
              className={imageSupplierStyle.hideButton}
            >
              <div className={imageSupplierStyle.thumbnail}>
                <CgCloseO
                  onClick={() => {
                    removePhoto(src, name, file);
                  }}
                  className={imageSupplierStyle.closeIcon}
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
      <Submit
        data={imagesFrom(name)}
        path={'/api/images/images'}
        payload={'Salvati fotografiile'}
      />
    </ModalTemplate>
  ) : null;
}
