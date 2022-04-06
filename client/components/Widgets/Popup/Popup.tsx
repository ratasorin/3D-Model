import actionStyle from './actionpopup.module.css';
import { motion, TargetAndTransition } from 'framer-motion';
import { CSSProperties, FC, useEffect } from 'react';
import { IconType } from 'react-icons/lib';
import { indexOf } from 'store/widgets/widgets-actions';
import { supportedPopup } from 'store/widgets/widgets-available';
import type { Target } from 'framer-motion';
const Popup: FC<{
  popup: supportedPopup;
  payload: JSX.Element[] | JSX.Element | string | undefined;
  Icon?: IconType;
  style?: CSSProperties;
  animations?: {
    initial?: Target;
    animate?: TargetAndTransition;
    exit?: TargetAndTransition;
  };
}> = ({ popup, Icon, payload, animations, style }) => {
  const zIndex = indexOf(popup);
  return (
    <motion.div
      style={{
        ...(style || {}),
        zIndex,
      }}
      className={actionStyle.container}
      initial={animations?.initial || {}}
      animate={animations?.animate}
      exit={animations?.exit}
    >
      {payload ? <div className={actionStyle.text}>{payload}</div> : null}
      {Icon ? <Icon className={actionStyle.icon} /> : null}
    </motion.div>
  );
};

export default Popup;
