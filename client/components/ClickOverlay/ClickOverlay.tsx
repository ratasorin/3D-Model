import { debounceTime, fromEvent, Subscription, tap } from 'rxjs';
import { FC, useEffect, useRef, useState } from 'react';
import click_style from './clickoverlay.module.css';

const ClickOverlay: FC<{ sideEffects: () => void }> = ({
  children,
  sideEffects,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [overlays, setOverlays] = useState<JSX.Element[]>([]);
  useEffect(() => {
    let subscription: Subscription | undefined;
    if (buttonRef.current)
      subscription = fromEvent(buttonRef.current, 'click')
        .pipe(
          debounceTime(2000),
          tap(() => {
            setOverlays([]);
          })
        )
        .subscribe();
    return () => {
      subscription ? subscription.unsubscribe() : null;
    };
  }, []);

  const overlayTemplate = <div className={`${click_style.click}`}></div>;

  return (
    <div
      onClick={sideEffects}
      ref={buttonRef}
      className={`${click_style.main__container}`}
      onMouseDown={() => {
        setOverlays([...overlays, overlayTemplate]);
      }}
      tabIndex={0}
    >
      {overlays.map((overlay) => overlay)}
      {children}
    </div>
  );
};

export default ClickOverlay;
