import menu__styles from './menu.module.css';
import File from '../../File/FileUploader';
import { motion } from 'framer-motion';
import { BsImage, BsFileEarmarkPdfFill } from 'react-icons/bs';
import { RiVideoAddFill } from 'react-icons/ri';
import { MdAudiotrack } from 'react-icons/md';

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
      <File type="image" Icon={BsImage}></File>
      <File type="pdf" Icon={BsFileEarmarkPdfFill}></File>
      <File type="video" Icon={RiVideoAddFill}></File>
      <File type="audio" Icon={MdAudiotrack}></File>
    </motion.div>
  );
};

export default Menu;
