import showSearchReducer from 'components/Searchbox/search-slice';
import changeInfoReducer from 'components/Widgets/Modals/Modify/Field/info-slice';
import { loadingReducers } from 'components/Loading/loading-slice';
import titleReducer from 'components/Blog-Creator/Forms/Title/title-slice';

export const userInteractionReducers = {
  showSearch: showSearchReducer,
  changeInfo: changeInfoReducer,
  loading: loadingReducers,
  title: titleReducer,
};
