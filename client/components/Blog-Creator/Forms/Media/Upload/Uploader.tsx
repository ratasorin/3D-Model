import Uploader from 'hooks/Image/Upload';
import { ChangeEvent, useRef } from 'react';
import url$ from 'lib/text-editor-image-uploader';
const Upload = () => {
  const button = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        style={{
          width: 'fit-content',
        }}
        ref={button}
      >
        +
      </button>
      <Uploader
        handler={(event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.files && event.target.files[0]) {
            const form = new FormData();
            form.append('user-draft01', event.target.files[0]);
            fetch('/api/images/images', {
              method: 'POST',
              body: form,
            }).then(() => {
              url$.next({
                filename: event.target.files[0].name || '',
                url: 'user-draft01',
              });
            });
          }
        }}
        trigger={button}
      />
    </>
  );
};

export default Upload;
