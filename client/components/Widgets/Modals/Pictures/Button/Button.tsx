import { MdOutlinePhotoCamera } from 'react-icons/md';
import button__style from './button.module.css';
import { motion } from 'framer-motion';
import useToggle from 'hooks/useToggle';
import { FC, RefObject } from 'react';

const Button: FC<{ buttonRef: RefObject<HTMLButtonElement> }> = ({
  buttonRef,
}) => {
  const { state: show, toggle } = useToggle();
  return (
    <motion.button
      layout
      ref={buttonRef}
      className={button__style.button}
      onMouseEnter={toggle}
      onMouseLeave={toggle}
    >
      <motion.div layoutId="button__animation" className={button__style.text}>
        Adauga fotografii
      </motion.div>
      {show ? (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          className={button__style.iconDiv}
        >
          <MdOutlinePhotoCamera className={button__style.icon} />
        </motion.div>
      ) : null}
    </motion.button>
  );
};

export default Button;
