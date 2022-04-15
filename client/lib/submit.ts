import { catchError, first, from, map, Observable, switchMap } from 'rxjs';
// import { useSession } from 'next-auth/react';
import { closePopup, openPopup } from 'store/widgets/actions/popup-actions';
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
            body: (stringify ? JSON.stringify(payload) : payload) as BodyInit,
          })
        );
      }),
      catchError(async (err: Error) => {
        closePopup('success-popup');
        openPopup('success-popup', {
          payload: err.message,
          type: 'Error',
        } as PopupBuilder);
        setTimeout(() => {
          closePopup('success-popup');
          console.log('close');
        }, 4000);
      })
    )
    .subscribe() as unknown as void;
