import { ICombineData } from '@/types/tool';
import produce from 'immer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const toolSlice = createSlice({
    name: 'tool',
    initialState: {
        bmi: 0,
        minWeight: 0,
        maxWeight: 0,
        idealWeight: 0,
        status: '',
        advice: '',
        gender: 0,
        age: 0,
        height: 0,
        weight: 0,
        activityLevel: '',
        goal: '',
        brm: 0,
        tdee: 0,
        workoutDayCalo: 0,
        restDayCalo: 0,
        message: '',
        userLike: {
            isRated: false,
            status: 0,
        },
    },
    reducers: {
        updateToolData: (state, action: PayloadAction<ICombineData>) => {
            return produce(state, (draftState) => {
                const payload = action.payload;

                // Kiểm tra xem payload.userLike có tồn tại không
                if (payload.userLike) {
                    Object.assign(draftState, payload);
                    draftState.userLike = {
                        isRated: payload.userLike.isRated,
                        status: payload.userLike.status,
                    };
                }
            });
        },
        clearToolData: (state, action) => {
            state = {
                bmi: 0,
                minWeight: 0,
                maxWeight: 0,
                idealWeight: 0,
                status: '',
                advice: '',
                gender: 0,
                age: 0,
                height: 0,
                weight: 0,
                activityLevel: '',
                goal: '',
                brm: 0,
                tdee: 0,
                workoutDayCalo: 0,
                restDayCalo: 0,
                message: '',
                userLike: {
                    isRated: false,
                    status: 0,
                },
            };
        },
    },
});

export const { updateToolData, clearToolData } = toolSlice.actions;
export default toolSlice.reducer; //export reducer ra để dùng trong store
