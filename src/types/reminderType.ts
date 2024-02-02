export interface IWaterReminder {
    amountWaterPerTime: number;
    createdAt: string;
    endTime: string;
    interval: number;
    note: string;
    remindTime: string[];
    startTime: string;
    updateAt: string;
    waterAmount: number;
}

export interface IExerciseReminder {
    note: string;
    remindTime: string;
    repeat: number[];
}
