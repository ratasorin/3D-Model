import { catchError, first, from, Observable, switchMap, tap } from 'rxjs';
import { closePopup, openPopup } from 'store/widgets/actions/popup-actions';
import { PopupBuilder } from 'store/widgets/widgets-actions';

export const submit = <T>(
  data: Observable<T>,
  path: string,
  stringify: boolean,
  then?: (response: Response) => unknown
) =>
  data
    .pipe(
      first(),
      switchMap((payload) => {
        return from(
          fetch(path, {
            method: 'POST',
            body: (stringify ? JSON.stringify(payload) : payload) as BodyInit,
          })
        );
      }),
      tap((r) => {
        if (then) then(r);
      }),
      catchError(async (err: Error) => {
        closePopup('success-popup');
        openPopup('success-popup', {
          payload: err.message,
          type: 'Error',
        } as PopupBuilder);
        setTimeout(() => {
          closePopup('success-popup');
        }, 4000);
      })
    )
    .subscribe() as unknown as void;
