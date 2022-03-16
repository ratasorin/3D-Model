import { FC, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdf__styles from './pdf.module.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF: FC<{ src: string }> = ({ src }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  return (
    <Document file={src} onLoadSuccess={onDocumentLoadSuccess}>
      <Page width={500} pageNumber={pageNumber} />
    </Document>
  );
};

export default PDF;
