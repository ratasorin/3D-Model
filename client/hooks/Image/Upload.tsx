import { ChangeEvent, FC, RefObject, useEffect, useRef } from 'react';
import { debounceTime, fromEvent, Subscription, tap } from 'rxjs';

type handler = (event: ChangeEvent<HTMLInputElement>) => unknown;

const Uploader: FC<{
  handler: handler;
  trigger: RefObject<HTMLElement | null>;
}> = ({ handler, trigger }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let subscription: Subscription;
    console.log(trigger.current);
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
  return Input;
};

export default Uploader;
