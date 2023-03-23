import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TestService from "../../../services/testService";
import { Test } from "../../../models/Test";

interface testState {
    test: Test | undefined;
    isLoading: boolean;
    error: string;
}

const initialState: testState = {
    test: undefined,
    isLoading: false,
    error: "",
};

export const fetchCurrentData = createAsyncThunk("currentTest/fetchData", async (id: number) => {
    const response = await TestService.getTestById(id);
    return response;
});

const CurrentTestSlice = createSlice({
    name: "currentTest",
    initialState,
    reducers: {
        changeValue(state: testState, action: any) {
            state.test = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentData.pending, (state, _action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCurrentData.rejected, (state, _action) => {
            state.isLoading = false;
            state.error = "ERROR!";
        });
        builder.addCase(fetchCurrentData.fulfilled, (state, action) => {
            state.test = action.payload;
            state.isLoading = false;
        });
    },
});

export const { changeValue } = CurrentTestSlice.actions;
export default CurrentTestSlice.reducer;
