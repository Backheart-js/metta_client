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
    remindTime: dayjs.Dayjs;
    repeat: number[];
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
    dateRange: dayjs.Dayjs[];
    note: string;
}

export interface IWaterReminderData {
    waterAmount: number;
    startTime: string;
    endTime: string;
    interval: number;
    note?: string;
}

export interface IExerciseReminderData {
    remindTime: string;
    repeat: number[];
    note?: string;
}

export interface IInitPlaningData {
    _id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    note?: string;
    status: Number;
}

export interface IFullyPlanningData extends IInitPlaningData {
    goal?: string;
    initWeight?: number;
    goalWeight?: number;
    caloPerDay?: number;
}

export const dayOfWeek = [
    {
        value: 1,
        label: 'Thứ 2',
        shot_label: '2',
    },
    {
        value: 2,
        label: 'Thứ 3',
        shot_label: '3',
    },
    {
        value: 3,
        label: 'Thứ 4',
        shot_label: '4',
    },
    {
        value: 4,
        label: 'Thứ 5',
        shot_label: '5',
    },
    {
        value: 5,
        label: 'Thứ 6',
        shot_label: '6',
    },
    {
        value: 6,
        label: 'Thứ 7',
        shot_label: '7',
    },
    {
        value: 0,
        label: 'Chủ nhật',
        shot_label: 'CN',
    },
];
