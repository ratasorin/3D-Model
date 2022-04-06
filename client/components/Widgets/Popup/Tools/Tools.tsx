import Popup from '../Popup';
import { useAppSelector } from 'hooks/redux-hooks';

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

  return visible ? (
    <Popup
      style={{
        top: y,
        left: x,
      }}
      popup="simple-popup"
      payload={<Options />}
      Icon={undefined}
    ></Popup>
  ) : null;
};

export default Simple;
