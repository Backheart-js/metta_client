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

export interface IPlanningData {
    title: string | number;
    noti?: INoti;
    calender?: string;
    note: string;
}
