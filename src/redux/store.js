//  import {configureStore} from '@reduxjs/toolkit'
//  import userReducer from './UserSlice'
//  import messageReducer from './messageSlice';
//  const Store = configureStore(
//     {
//         reducer :{
//            user : userReducer,
//            message : messageReducer
//         }
//     }
//  )
// export default  Store;
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import messageReducer from './messageSlice';
import socketReducer from './socketSlice';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';

// 1️⃣ Create persist config
const persistConfig = {
  key: 'root',
  storage,
};

// 2️⃣ Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  socket :socketReducer
});

// 3️⃣ Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// 5️⃣ Create persistor
export const persistor = persistStore(store);

export default store;
