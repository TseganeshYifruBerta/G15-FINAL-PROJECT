// store/slicereducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PasswordState {
    loading: boolean;
    error: string | null;
}

const initialState: PasswordState = {
    loading: false,
    error: null
};

const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {
        startLoading(state) {
            state.loading = true;
            state.error = null;
        },
        passwordChangeSuccess(state) {
            state.loading = false;
            state.error = null;
        },
        passwordChangeFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { startLoading, passwordChangeSuccess, passwordChangeFailure } = passwordSlice.actions;
export default passwordSlice.reducer;
