import { catchError, map, Observable, of, tap, UnaryFunction } from 'rxjs';
import { Data } from './Submit';

export const handleClick = (
  onBeforeRequest: () => void,
  sendData: UnaryFunction<Observable<unknown>, Observable<Data>>,
  onSuccess: (
    response: Response,
    path: string
  ) => UnaryFunction<Observable<unknown>, unknown>,
  onError: (error: Error) => Observable<Error>,
  path: string
) => {
  return of(true).pipe(
    tap(() => {
      onBeforeRequest();
    }),
    sendData,
    map((response: any) => onSuccess(response.response, path)),
    catchError((error) => onError(error))
  );
};
