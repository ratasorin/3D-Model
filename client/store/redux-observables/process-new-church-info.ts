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
import { RootState } from 'store/store';
import { churchInfoApi } from 'store/redux-caching/church-info-cache';
import { ChurchInfo, RequestResponse } from 'pages/api/church-info/[church]';
const sendNewInfo = (
  action$: Observable<{ type: string }>,
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
              editedBy: state.changeInfo.user,
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
                    payload: {
                      churchDescription: state.changeInfo.currentUserInfo,
                      churchName: state.changeInfo.churchName,
                      editedBy: state.changeInfo.user,
                    },
                    error: false,
                  } as RequestResponse<ChurchInfo>;
                }
              ) as any,
              // cast to any to avoid ReduxThunk typings not matching AnyAction which is the expected output from epics
            ])
          )
        )
      )
    )
  );

export default sendNewInfo;
