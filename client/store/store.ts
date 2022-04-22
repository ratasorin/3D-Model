import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { widgets } from './widgets/widgets-reducers';
import { userInteractionReducers } from './user-interaction';
import sendNewInfo from 'store/redux-observables/process-new-church-info';
import { createEpicMiddleware } from 'redux-observable';
import { churchInfoApi } from 'store/redux-caching/church-info-cache';

const reducer = combineReducers({
  ...userInteractionReducers,
  ...widgets,
  [churchInfoApi.reducerPath]: churchInfoApi.reducer,
});

export type RootState = ReturnType<typeof reducer>;

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(epicMiddleware)
      .concat(churchInfoApi.middleware),
});

epicMiddleware.run(sendNewInfo);

export type AppDispatch = typeof store.dispatch;
