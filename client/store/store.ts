import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { widgetsReducer } from './widgets';
import { userInteractionReducers } from './user-interaction';
import sendNewInfo from 'store/redux-observables/validate-new-info';
import { createEpicMiddleware } from 'redux-observable';

const reducer = combineReducers({
  button: userInteractionReducers.buttonReducer,
  showSearch: userInteractionReducers.showSearchReducer,

  // widget stack
  stack: widgetsReducer.stackReducer,

  // popup reducers
  successPopup: widgetsReducer.popupReducer,

  // modal reducers
  infoModal: widgetsReducer.infoModalReducer,
  modifyModal: widgetsReducer.modifyModalReducer,
  pictureModal: widgetsReducer.pictureModalReducer,
  authenticateModal: widgetsReducer.authenticateReducer,
  pictureChangeModal: widgetsReducer.pictureChangeModalReducer,

  // loading reducer
  loading: userInteractionReducers.loadingReducers,

  // rtk-query reducers
  [userInteractionReducers.churchInfoApi.reducerPath]:
    userInteractionReducers.churchInfoApi.reducer,
  info: userInteractionReducers.changeInfoReducer,
});

export type RootState = ReturnType<typeof reducer>;

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userInteractionReducers.churchInfoApi.middleware)
      .concat(epicMiddleware),
});

epicMiddleware.run(sendNewInfo);

export type AppDispatch = typeof store.dispatch;
