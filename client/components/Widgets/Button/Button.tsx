import { FC, useMemo, useRef } from 'react';
import buttonStyle from './button.module.css';
import debounce from 'lodash.debounce';

const Button: FC<{ payload: string; onClick: () => unknown }> = ({
  payload,
  onClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const debouncedClicks = useMemo(() => debounce(onClick, 500), [onClick]);
  return (
    <button
      ref={buttonRef}
      onClick={debouncedClicks}
      className={buttonStyle.button}
    >
      {payload}
    </button>
  );
};

export default Button;
