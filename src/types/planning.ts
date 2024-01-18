import dayjs from 'dayjs';

export type TFeature = 'planning' | 'remind' | '';

export const remindType = {
    DRINK: 1,
    EXCERCISE: 2,
};

export const optionType = {
    TITLE: 1,
    CALENDAR: 2,
    NOTI: 3,
    NOTE: 4,
};

export interface IType {
    id: number;
    label: string;
}

export interface INoti {
    amountWater: number;
    timeRange: dayjs.Dayjs[];
    timeGap: number;
}
export interface IExerciseNoti {
    remindTime: number;
    repeat: string[];
    duration: number;
}

export interface IRemindData {
    title: number;
    noti?: INoti;
    exerciseNoti?: IExerciseNoti;
    calender?: string;
    note: string;
}
export interface IPlanning {
    title: string;
    startDate: dayjs.Dayjs;
    endDate?: dayjs.Dayjs;
    note: string;
}

export interface IWaterReminderData {
    waterAmount: number;
    startTime: string;
    endTime: string;
    interval: number;
    note?: string;
}
