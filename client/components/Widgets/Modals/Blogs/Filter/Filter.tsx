import filter__styles from './filter.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RefObject, useEffect, useRef, useState } from 'react';

function useOnClickOutside(
  dropdown: RefObject<HTMLElement>,
  menu: RefObject<HTMLElement>,
  handler: () => unknown
) {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (dropdown && menu)
          if (
            !dropdown?.current ||
            dropdown?.current.contains(event.target as HTMLElement) ||
            !menu?.current ||
            menu?.current.contains(event.target as HTMLElement)
          ) {
            return;
          }
        handler();
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [dropdown, menu, handler]
  );
}

const Filter = () => {
  const [open, setIsOpen] = useState(false);
  const openMenu = () => {
    setIsOpen(true);
  };
  const dropdown = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdown, menu, () => {
    setIsOpen(false);
  });
  return (
    <div className={filter__styles.filter__container}>
      <div className={filter__styles.filter} onClick={openMenu}>
        {/* script bloating comes from this icon ! */}
        <GiHamburgerMenu className={filter__styles.hamburger__icon} />
      </div>
      {open ? (
        <div
          ref={dropdown}
          className={filter__styles.filter_options__container}
        >
          <div className={filter__styles.filter_option}>Postarile mele</div>
          <div className={filter__styles.filter_option}>Postari preferate</div>
          <div className={filter__styles.filter_option}>Visionate recent</div>
          <div className={filter__styles.filter_option}>Cele mai apreciate</div>
        </div>
      ) : null}
    </div>
  );
};

export default Filter;
