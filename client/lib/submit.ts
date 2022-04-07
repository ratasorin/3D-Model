import { catchError, first, from, Observable, switchMap } from 'rxjs';
// import { useSession } from 'next-auth/react';
import { openPopup } from 'store/widgets/actions/popup-actions';
import { PopupBuilder } from 'store/widgets/widgets-actions';

export const submit = <T>(
  data: Observable<T>,
  path: string,
  stringify: boolean
) =>
  data
    .pipe(
      first(),
      switchMap((payload) => {
        console.log(payload);
        return from(
          fetch(path, {
            method: 'POST',
            body: stringify ? JSON.stringify(payload) : payload,
          })
        );
      }),
      catchError(async (err: Error) =>
        openPopup('success-popup', {
          payload: err.message,
          type: 'Error',
        } as PopupBuilder)
      )
    )
    .subscribe() as unknown as void;
