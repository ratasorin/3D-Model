import { FC, RefObject, useEffect, useRef } from 'react';
import { debounceTime, fromEvent, Subscription, tap } from 'rxjs';

type handleFile = (file: File) => unknown;

const Uploader: FC<{
  handleFile: handleFile;
  trigger: RefObject<HTMLElement | null>;
}> = ({ handleFile, trigger }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let subscription: Subscription;
    trigger.current
      ? (subscription = fromEvent(trigger.current, 'click')
          .pipe(
            debounceTime(200),
            tap(() => {
              inputRef.current?.click();
            })
          )
          .subscribe())
      : null;

    return () => {
      subscription?.unsubscribe();
    };
  }, [trigger.current]);

  return (
    <input
      type="file"
      ref={inputRef}
      multiple
      style={{
        display: 'none',
      }}
      onChange={(e) => {
        console.log('ON CHANGE');
        e.currentTarget.files ? handleFile(e.currentTarget.files[0]) : null;
      }}
    />
  );
};

export default Uploader;
