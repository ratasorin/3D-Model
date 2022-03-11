import menu__styles from './menu.module.css';
import File from '../../File/FileUploader';
import { motion } from 'framer-motion';

const Menu = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{
        opacity: 0,
        x: -100,
        transition: {
          ease: 'easeInOut',
          duration: 0.2,
        },
      }}
      className={menu__styles.container}
    >
      <File></File>
      <File></File>
      <File></File>
      <File></File>
    </motion.div>
  );
};

export default Menu;
