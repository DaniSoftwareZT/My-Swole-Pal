import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { Api } from "./Api"

export const store = configureStore({
  reducer: {
  [Api.reducerPath]: Api.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(Api.middleware);
  },
});

setupListeners(store.dispatch);
