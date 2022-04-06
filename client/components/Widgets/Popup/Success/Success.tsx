import Popup from '../Popup';
import { useAppSelector } from 'hooks/redux-hooks';
import { FaExclamationTriangle } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
const Success = () => {
  const { visible, popupMessage } = useAppSelector(
    ({ popupReducer }) => popupReducer
  );

  return (
    <AnimatePresence>
      {visible ? (
        <Popup
          popup="success-popup"
          Icon={FaExclamationTriangle}
          payload={popupMessage}
          animations={{
            initial: {
              x: -200,
              opacity: 0,
            },
            animate: {
              x: 0,
              opacity: 1,
            },
            exit: {
              x: 200,
              opacity: 0,
            },
          }}
          style={{
            bottom: '3em',
            left: '3em',
          }}
        ></Popup>
      ) : null}
    </AnimatePresence>
  );
};
export default Success;
