import { FC, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { openModal } from 'store/widgets/actions/modals-actions';
import pdf__style from './pdf.module.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF: FC<{ src: string }> = ({ src }) => {
  const [pages, setNumPages] = useState<number>(0);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log({ numPages });
    setNumPages(numPages);
    setWidth(documentRef.current?.clientWidth);
  }

  const [width, setWidth] = useState<number | undefined>(0);
  const documentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={pdf__style.container} ref={documentRef}>
      <Document file={src} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: pages }).map((_, index) => (
          <Page
            pageNumber={index + 1}
            width={width}
            key={index}
            onClick={() => {
              console.log(index + 1, src);
              openModal('pdf-viewer', { index: index + 1, src });
            }}
          />
        ))}
      </Document>
    </div>
  );
};

export default PDF;
