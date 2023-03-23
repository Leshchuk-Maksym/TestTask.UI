import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import allTestsSlice from "../pages/allTests/reducers/allTestsSlice";
import currentTestSlice from "../pages/testDetails/reducers/currentTestSlice";

export const store = configureStore({
    reducer: {
        tests: allTestsSlice,
        currentTest: currentTestSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
