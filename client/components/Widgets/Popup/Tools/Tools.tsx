import Popup from '../Popup';
import { useAppSelector } from 'hooks/redux-hooks';
import { indexOf } from 'store/widgets/widgets-actions';
import { useEffect } from 'react';

import Bold from './Options/Bold';
import Italic from './Options/Italic';
import Quotes from './Options/Quotes';
import Underline from './Options/Underline';

const Options = () => {
  return (
    <>
      <Bold></Bold>
      <Italic></Italic>
      <Quotes></Quotes>
      <Underline></Underline>
    </>
  );
};

const Simple = () => {
  const { visible, x, y } = useAppSelector(
    ({ simplePopupReducer }) => simplePopupReducer
  );

  const zIndex = indexOf('simple-popup');
  return visible ? (
    <Popup
      positions={{
        x,
        y,
      }}
      zIndex={zIndex}
      payload={<Options />}
      Icon={undefined}
    ></Popup>
  ) : null;
};

export default Simple;
