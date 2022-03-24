import actionStyle from './actionpopup.module.css';
import { motion } from 'framer-motion';
import { FC, useEffect } from 'react';
import { IconType } from 'react-icons/lib';
import { indexOf } from 'store/widgets/widgets-actions';
import { supportedPopup } from 'store/widgets/widgets-available';

const Popup: FC<{
  popup: supportedPopup;
  payload: JSX.Element[] | JSX.Element | string | undefined;
  Icon?: IconType;
  positions?: { x: number; y: number };
}> = ({ popup, Icon, payload, positions }) => {
  const zIndex = indexOf(popup);
  useEffect(() => {
    console.log(zIndex, popup);
  }, [zIndex]);
  return (
    <motion.div
      style={{
        zIndex,
      }}
      // style={
      //   positions
      //     ? {
      //         top: positions.y,
      //         left: positions.x,
      //         zIndex,
      //       }
      //     : {
      //         zIndex,
      //       }
      // }
      initial={{
        opacity: 0,
        x: -200,
        y: 0,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      exit={{
        opacity: 0,
        x: 200,
        y: 0,
      }}
      className={actionStyle.container}
    >
      {payload ? <div className={actionStyle.text}>{payload}</div> : null}
      {Icon ? <Icon className={actionStyle.icon} /> : null}
    </motion.div>
  );
};

export default Popup;
