import actionStyle from './actionpopup.module.css';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { IconType } from 'react-icons/lib';

const Popup: FC<{
  zIndex: number;
  payload: JSX.Element | string | undefined;
  Icon?: IconType;
  positions?: { x: number; y: number };
}> = ({ zIndex, Icon, payload, positions }) => {
  return (
    <motion.div
      style={
        positions
          ? {
              top: positions.y,
              left: positions.x,
              zIndex,
            }
          : {
              zIndex,
            }
      }
      // initial={{
      //   opacity: 0,
      //   x: -200,
      //   y: 0,
      // }}
      // animate={{
      //   opacity: 1,
      //   x: 0,
      //   y: 0,
      // }}
      // exit={{
      //   opacity: 0,
      //   x: 200,
      //   y: 0,
      // }}
      className={actionStyle.container}
    >
      {payload ? <div className={actionStyle.text}>{payload}</div> : null}
      {Icon ? <Icon className={actionStyle.icon} /> : null}
    </motion.div>
  );
};

export default Popup;
