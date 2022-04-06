import { FC } from 'react';
import { Observable } from 'rxjs';
import Button from '../Button';

export interface Data {
  isFinish: boolean;
  response: Response;
}
export interface PopupBuilder {
  type: 'Error' | 'Success';
  payload: string | JSX.Element;
}

const Submit: FC<{
  payload: string;
  onClick: Observable<unknown>;
}> = ({ payload, onClick }) => {
  const handleClick = () => {
    onClick.subscribe();
  };
  return <Button payload={payload} onClick={handleClick} />;
};

export default Submit;
