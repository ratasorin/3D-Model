import { FC, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF: FC<{ src: string }> = ({ src }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  return (
    <Document
      //TODO: Use the src for the file
      file={`/api/images/user-draft01/Exercitii.pdf`}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <Page width={500} pageNumber={pageNumber} />
    </Document>
  );
};

export default PDF;
