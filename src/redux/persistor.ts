import {persistStore} from 'redux-persist';
import store from './store';

const persistor = persistStore(store);

export {persistor};
