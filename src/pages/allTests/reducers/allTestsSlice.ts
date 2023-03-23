import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TestService from "../../../services/testService";
import { Test } from "../../../models/Test";

interface testsState {
    tests: Test[];
    isLoading: boolean;
    error: string;
}

const initialState: testsState = {
    tests: [],
    isLoading: false,
    error: "",
};

export const fetchData = createAsyncThunk("test/fetchData", async (id: number) => {
    const response = await TestService.getAllTestForUser(id);
    return response;
});

const allTestsSlice = createSlice({
    name: "tests",
    initialState,
    reducers: {
        changeValue(state: testsState, action: any) {
            state.tests[action.payload.index] = action.payload.value.tests;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state, _action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchData.rejected, (state, _action) => {
            state.isLoading = false;
            state.error = "ERROR!";
        });
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.tests = action.payload;
            state.isLoading = false;
        });
    },
});

export const { changeValue } = allTestsSlice.actions;
export default allTestsSlice.reducer;
