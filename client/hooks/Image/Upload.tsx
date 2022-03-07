import { FC, useEffect, useRef } from 'react';
import { debounceTime, fromEvent, Subscription, tap } from 'rxjs';

type handler = (...args: any[]) => unknown;

const Uploader: FC<{ handler: handler; trigger: HTMLElement | null }> = ({
  handler,
  trigger,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let subscription: Subscription;
    trigger
      ? (subscription = fromEvent(trigger, 'click')
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
  }, []);

  const Input = (
    <input
      type="file"
      ref={inputRef}
      multiple
      style={{
        display: 'none',
      }}
      onChange={handler}
    />
  );
  return <>{Input}</>;
};

export default Uploader;
