import { catchError, map, mergeMap, Observable, of, UnaryFunction } from 'rxjs';

export const handleClick = <T extends Response>(
  data: Observable<T>,
  onSuccess: (
    response: Response,
    path: string
  ) => UnaryFunction<Observable<unknown>, unknown>,
  onError: (error: Error) => Observable<Error>,
  path: string
) => {
  return () =>
    of(true)
      .pipe(
        mergeMap(() => data),
        map((response) => onSuccess(response, path)),
        catchError((error) => onError(error))
      )
      .subscribe();
};
