import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from "react-redux";

import advertisementsReducer from "./slices/advertisements";
import ordersReducer from "./slices/orders";

export const store = configureStore({
  reducer: {
    advertisment: advertisementsReducer,
    order: ordersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

