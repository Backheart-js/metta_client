import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPayloadIsLogin {
    state: boolean;
}

const getInitialIsLoginState = (): boolean => {
    if (typeof window !== 'undefined') {
        const storedValue = sessionStorage.getItem('isLogin');
        return storedValue ? JSON.parse(storedValue) : false;
    }
    return false;
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoginState: getInitialIsLoginState(),
    },
    reducers: {
        updateIsLogin: (state, action: PayloadAction<IPayloadIsLogin>) => {
            state.isLoginState = action.payload.state;
        },
    },
});

export const { updateIsLogin } = authSlice.actions;
export default authSlice.reducer;
