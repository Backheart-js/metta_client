import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPayloadIsLogin {
    state: boolean;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoginState: false,
    },
    reducers: {
        updateIsLogin: (state, action: PayloadAction<IPayloadIsLogin>) => {
            state.isLoginState = action.payload.state;
        },
    },
});

export const { updateIsLogin } = authSlice.actions;
export default authSlice.reducer;
