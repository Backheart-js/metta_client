'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import * as React from 'react';

export interface ICalendarContentProps {}

export default function CalendarContent({}: ICalendarContentProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="center-x flex-col gap-5 pt-5 pb-3">
                <div className="center w-full">
                    <MobileDateRangePicker
                        defaultValue={[
                            dayjs('2022-04-17'),
                            dayjs('2022-04-21'),
                        ]}
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
