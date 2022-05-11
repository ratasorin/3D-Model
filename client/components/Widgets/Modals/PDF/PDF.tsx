import { RefObject, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { closeModal, selectFrom } from 'store/widgets/actions/modals-actions';
import { indexOf } from 'store/widgets/widgets-actions';
import pdf__style from './pdf.module.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideClick(
  ref: RefObject<HTMLDivElement>,
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

const PDF = () => {
  const { visible, src, index } =
    selectFrom<{ src: string; index: number }>('pdf-viewer');
  const zIndex = indexOf('pdf-viewer');
  const documentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log({ visible });
  }, [visible]);
  useOutsideClick(documentRef, () => {
    closeModal('pdf-viewer');
  });

  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (window)
      window.addEventListener('resize', () =>
        setWidth(window.innerWidth - 200)
      );
  }, [window]);

  if (!visible) return null;
  return (
    <div
      className={pdf__style.container}
      style={{
        zIndex,
      }}
    >
      <div className={pdf__style.pdf__container} ref={documentRef}>
        <Document file={src}>
          <Page pageNumber={index} width={width} />
        </Document>
      </div>
    </div>
  );
};

export default PDF;
