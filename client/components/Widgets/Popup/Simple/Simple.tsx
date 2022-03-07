import Popup from '../Popup';
import { FaAdn } from 'react-icons/fa';
import { useAppSelector } from 'hooks/redux-hooks';
import { indexOf } from 'store/widgets/widgets-actions';
import { useEffect } from 'react';
const Simple = () => {
  const { visible, x, y } = useAppSelector(
    ({ simplePopupReducer }) => simplePopupReducer
  );
  const zIndex = indexOf('simple-popup');
  useEffect(() => {
    console.log(zIndex);
  }, [zIndex]);
  return visible ? (
    <Popup
      positions={{
        x,
        y,
      }}
      zIndex={zIndex}
      Icon={FaAdn}
      payload="HELLO WORLD"
    ></Popup>
  ) : null;
};

export default Simple;
