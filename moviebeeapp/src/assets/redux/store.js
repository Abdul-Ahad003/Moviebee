import { configureStore } from '@reduxjs/toolkit'
import idReducer from './movieid/idSlice'
import favReducer from "./favorites/favSlice"
import searchReducer from './search/searchSlice'
import typeReducer from './type/typeSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';



const reducers = combineReducers({
  id: idReducer,
  favlist: favReducer,
  searchval: searchReducer,
  type: typeReducer
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});



// export const store = configureStore({
//   reducer: {
//     id: idReducer,
//     favlist:favReducer,
//     searchval:searchReducer,
//     type:typeReducer
//   },
// })