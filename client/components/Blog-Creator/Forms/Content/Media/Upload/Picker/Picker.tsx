import { useState } from 'react';
import Menu from './Menu/Menu';
import picker__styles from './picker.module.css';
import { BsPlusLg } from 'react-icons/bs';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

const Picker = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={picker__styles.container}>
      <button
        className={picker__styles.menu_opener}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        <AnimateSharedLayout>
          {open ? (
            <motion.div
              animate={{ rotate: 45 }}
              exit={{ rotate: 0 }}
              layoutId="rotate"
              className={picker__styles.icon}
            >
              <BsPlusLg />
            </motion.div>
          ) : (
            <motion.div
              animate={{ rotate: 0 }}
              exit={{ rotate: 45 }}
              layoutId="rotate"
              className={picker__styles.icon}
            >
              <BsPlusLg />
            </motion.div>
          )}
        </AnimateSharedLayout>
      </button>
      <AnimatePresence>{open ? <Menu /> : null}</AnimatePresence>
    </div>
  );
};

export default Picker;
