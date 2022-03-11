import Popup from '../Popup';
import { useAppSelector } from 'hooks/redux-hooks';
import { indexOf } from 'store/widgets/widgets-actions';
import { useEffect } from 'react';
import { deserialize } from 'utils/elements-serializer';
const Simple = () => {
  const { visible, x, y, jsonContent } = useAppSelector(
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
      payload={jsonContent}
      Icon={undefined}
    ></Popup>
  ) : null;
};

export default Simple;
