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
import {
  ChurchInfoSuccessResponse,
  ChurchInfoUpdateResponse,
} from 'pages/api/church-info/[church]';
const sendNewInfo = (
  action$: Observable<Action<string>>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    // prevent every keystroke from updating the description for a church in the database
    ofType('change-info/processUserInput'),
    debounceTime(1000),

    // get the last payload the user sent
    withLatestFrom(state$),
    switchMap(([_, state]) =>
      iif(
        () =>
          state.changeInfo.currentUserInfo === state.changeInfo.lastUpdatedInfo,
        // if nothing changes, don't write to database
        of({ type: 'none/none' }),

        // if something changes, write the new changes to the database
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
          // notify the user about the changes
          mergeMap(() =>
            from([
              // TODO: pending or nothing
              { type: 'icon/success' },

              // perform optimistic update on the data
              churchInfoApi.util.updateQueryData(
                'getChurchInfo',
                `${state.changeInfo.churchName}`,
                () => {
                  return {
                    churchInfo: {
                      churchDescription: state.changeInfo.currentUserInfo,
                      churchName: state.changeInfo.churchName,
                      editedBy: 'ANONIM',
                    },
                  } as ChurchInfoSuccessResponse;
                }
              ),
            ])
          )
        )
      )
    )
  );

export default sendNewInfo;
