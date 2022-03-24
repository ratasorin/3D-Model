import { useSession } from 'next-auth/react';
import { FC } from 'react';
import {
  catchError,
  map,
  Observable,
  of,
  OperatorFunction,
  tap,
  UnaryFunction,
} from 'rxjs';
import Button from '../Button';
import { submit } from '../../../../lib/submit';
import { handleClick } from './submit-logic';

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
