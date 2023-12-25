import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPayload {
    text: string;
    isProgress: boolean;
}

export const loadingSlice = createSlice({
    name: 'loading', //name dùng để tạo actionCreator
    initialState: {
        isProgress: false,
        text: '',
    },
    reducers: {
        //Viết reducers ở đây, toolkit sẽ tự động tạo ra actionCreator tương ứng với mỗi reducer
        updateLoading: (state, action: PayloadAction<IPayload>) => {
            // Ta có thể viết code mutation (Thay đổi trực tiếp state), ngược lại so với Redux core
            state.isProgress = action.payload.isProgress;
            state.text = action.payload.text;
        },
    },
});

export const { updateLoading } = loadingSlice.actions;
export default loadingSlice.reducer; //export reducer ra để dùng trong store
