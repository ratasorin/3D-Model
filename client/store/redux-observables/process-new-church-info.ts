import { Action } from '@reduxjs/toolkit';
import { ofType, StateObservable } from 'redux-observable';
import {
  debounceTime,
  from,
  iif,
  mergeMap,
  Observable,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { update } from '../../components/Widgets/Modals/Modify/Field/info-slice';
import { RootState } from 'store/store';
import { churchInfoApi } from 'store/redux-caching/church-info-cache';
const sendNewInfo = (
  action$: Observable<Action<string>>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType('change-info/processUserInput'),
    debounceTime(1000),
    withLatestFrom(state$),
    switchMap(([_, state]) =>
      iif(
        () =>
          state.changeInfo.currentUserInfo === state.changeInfo.lastUpdatedInfo,
        of({ type: 'none/none' }),
        from(
          fetch(`/api/church-info/${state.changeInfo.churchName}`, {
            body: JSON.stringify({
              churchDescription: state.changeInfo.currentUserInfo,
              churchName: state.changeInfo.churchName,
              editedBy: 'ANONIM',
            }),
            method: 'POST',
          })
        ).pipe(
          mergeMap(() =>
            from([
              update(state.changeInfo.currentUserInfo),
              { type: 'icon/success' },
              churchInfoApi.util.updateQueryData(
                'getChurchInfo',
                `${state.changeInfo.churchName}`,
                (draft) => {
                  draft.churchInfo = {
                    churchDescription: state.changeInfo.currentUserInfo,
                    churchName: state.changeInfo.churchName,
                    editedBy: 'ANONIM',
                  };
                }
              ),
            ])
          )
        )
      )
    )
  );

export default sendNewInfo;
