'use client';

import { IPlanning } from '@/types/planning';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import * as React from 'react';

export interface ICalendarContentProps {
    dateRangeInput: dayjs.Dayjs[];
    handleChange: (data: any) => void;
}

export default function CalendarContent({
    dateRangeInput,
    handleChange,
}: ICalendarContentProps) {
    const handleDateChange = (newDateRange: Date[]) => {
        console.log(newDateRange.map((date) => dayjs(date)));
        handleChange((prev: IPlanning) => ({
            ...prev,
            dateRange: newDateRange.map((date) => dayjs(date)),
        }));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="center-x flex-col gap-5 pt-5 pb-3">
                <div className="center w-full">
                    <MobileDateRangePicker
                        value={dateRangeInput}
                        onChange={handleDateChange}
                        autoFocus
                        inputProps={{
                            readOnly: true, // Ngăn chặn hiển thị bàn phím
                        }}
                    />
                </div>
                <div className="">
                    <p className="font-medium text-sm text-gray-500">
                        *Chúng tôi mong muốn bạn đặt mốc thời phù hợp với thực
                        tế, đủ để bạn đạt được mục tiêu đề ra
                    </p>
                </div>
            </div>
        </LocalizationProvider>
    );
}
