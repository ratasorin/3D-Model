import { submit } from 'lib/submit';
import { useSession } from 'next-auth/react';
import { FC, useCallback } from 'react';
import { Observable } from 'rxjs';
import { openModal } from 'store/widgets/actions/modals-actions';
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
  data: Observable<unknown>;
  path: string;
  stringify: boolean;
  then?: (response?: Response) => unknown;
}> = ({ payload, data, path, stringify, then }) => {
  const user = useSession().data?.user;
  const callback = useCallback(() => {
    if (user) submit(data, path, stringify, then);
    else openModal('authenticate-modal');
  }, [user, path]);

  return <Button payload={payload} onClick={callback} />;
};

export default Submit;
