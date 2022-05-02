import { closeModal, selectFrom } from 'store/widgets/actions/modals-actions';
import image__style from './image.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { RefObject, useEffect, useRef } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideClick(
  ref: RefObject<HTMLImageElement>,
  callback: () => unknown
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

const Image = () => {
  const { visible, src } = selectFrom<{ src: string }>('image-viewer');
  const ref = useRef<HTMLImageElement>(null);
  useOutsideClick(ref, () => {
    closeModal('image-viewer');
  });
  return (
    <AnimatePresence exitBeforeEnter>
      {visible ? (
        <div className={image__style.image__container}>
          <div className={image__style.container}>
            <motion.img
              ref={ref}
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0.5,
                scale: 0,
              }}
              src={src}
              alt=""
            />
          </div>
        </div>
      ) : null}
    </AnimatePresence>
  );
};

export default Image;
