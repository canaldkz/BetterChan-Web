import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { henchanApi } from "./henchan/henchan.api";

export const store = configureStore(
    {
        reducer: {
            [henchanApi.reducerPath]: henchanApi.reducer
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(henchanApi.middleware)
    }
)
setupListeners(store.dispatch)