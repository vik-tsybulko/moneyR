import { createStore, combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import { useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import rootReducer from './reducers/index';

const store = createStore(
  combineReducers({
    app: rootReducer,
    routing: routerReducer
  })
);


const history = useRouterHistory(createHashHistory)({ queryKey: false });
export { store, history }
