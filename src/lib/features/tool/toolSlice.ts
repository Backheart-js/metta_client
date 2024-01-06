import { ICombineData } from '@/types/tool';
import produce from 'immer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const toolSlice = createSlice({
    name: 'tool',
    initialState: {
        bmi: null,
        minWeight: null,
        maxWeight: null,
        idealWeight: null,
        status: '',
        advice: '',
        gender: null,
        age: null,
        height: null,
        weight: null,
        activityLevel: '',
        goal: '',
        brm: null,
        tdee: null,
        workoutDayCalo: null,
        restDayCalo: null,
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
                Object.assign(draftState, payload);
                draftState.userLike = {
                    isRated: payload.userLike.isRated,
                    status: payload.userLike.status,
                };
            });
        },
        clearToolData: (state, action) => {
            state = {
                bmi: null,
                minWeight: null,
                maxWeight: null,
                idealWeight: null,
                status: '',
                advice: '',
                gender: null,
                age: null,
                height: null,
                weight: null,
                activityLevel: '',
                goal: '',
                brm: null,
                tdee: null,
                workoutDayCalo: null,
                restDayCalo: null,
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
