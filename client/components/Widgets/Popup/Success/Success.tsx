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
        ></Popup>
      ) : null}
    </AnimatePresence>
  );
};
export default Success;
