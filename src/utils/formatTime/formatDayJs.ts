import dayjs from 'dayjs';

export const formatToHour = (value: dayjs.Dayjs): string => {
    return value.format('HH:mm');
};
