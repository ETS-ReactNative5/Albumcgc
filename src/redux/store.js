import {createStore, combineReducers} from 'redux';
import AddAlbums from './reducers/AddDeviceIP';
import AddPhotosReducer from './reducers/AddPhotosReducer';

const rootReducer = combineReducers({
    Albums: AddAlbums,
    Photos: AddPhotosReducer,
})

export default  configureStore = () =>  createStore(rootReducer);

// export default configureStore;