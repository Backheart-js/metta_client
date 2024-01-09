import { IconButton } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@/components/Dialog/Dialog';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

export interface INotiContentProps {
    handleChange: (data: any) => void;
}

export default function NotiContent({ handleChange }: INotiContentProps) {
    const [amountWater, setAmountWarter] = useState<number>(2000);
    const [isOpenTimePicker, setIsOpenTimePicker] = useState<boolean>(false);
    const [beginTime, setBeginTime] = useState(dayjs('2022-04-17T7:00'));
    const [endTime, setEndTime] = useState(dayjs('2022-04-17T22:00'));
    const [isSettingBeginTime, setIsSettingBeginTime] = useState(true);
    const [gapTimeNoti, setGapTimeNoti] = useState<number>(30);

    const addWater = (): void => {
        if (amountWater < 4000) {
            setAmountWarter((prev) => prev + 250);
        }
    };
    const minusWater = (): void => {
        if (amountWater > 1500) {
            setAmountWarter((prev) => prev - 250);
        }
    };

    const handleOpenTimePicker = (type: string): void => {
        setIsSettingBeginTime(type === 'begin');
        setIsOpenTimePicker(true);
    };

    const handleChangeTimePicker = (time: any): void => {
        if (isSettingBeginTime) {
            setBeginTime(time);
        } else {
            setEndTime(time);
        }
    };

    const handleChangeGapTime = (event: any): void => {
        setGapTimeNoti(event.target.value);
    };

    const formatTime = (time: dayjs.Dayjs): string => {
        return dayjs(time).format('HH:mm');
    };

    useEffect(() => {
        const notiData = {
            amountWater,
            timeRange: [beginTime, endTime],
            timeGap: gapTimeNoti,
        };
        handleChange((prev: any) => {
            return {
                ...prev,
                noti: notiData,
            };
        });

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amountWater, beginTime, endTime, gapTimeNoti]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="px-2 py-3">
                <section className="center-y justify-between h-12">
                    <div className="">
                        <p className="font-medium text-gray-600">
                            Lượng nước (ml)
                        </p>
                    </div>
                    <div className="center-y justify-between gap-1">
                        <IconButton
                            aria-label="minus"
                            size="large"
                            onClick={minusWater}
                            disabled={amountWater === 1500}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <div className="border-gray-400 rounded-3xl w-16 overflow-hidden">
                            <input
                                value={amountWater}
                                className="bg-white w-full h-full text-center text-lg font-normal text-gray-700"
                                type="text"
                            />
                        </div>
                        <IconButton
                            aria-label="add"
                            size="large"
                            onClick={addWater}
                            disabled={amountWater === 4000}
                        >
                            <AddIcon />
                        </IconButton>
                    </div>
                </section>
                <section className="center-y justify-between h-12 my-4">
                    <div className="">
                        <p className="font-medium text-gray-600">
                            Trong khoảng
                        </p>
                    </div>
                    <div className="center gap-3">
                        <button
                            className="text-center text-lg font-normal w-16 bg-white !border-[1px_solid_#999] center h-8 rounded-3xl overflow-hidden"
                            onClick={() => handleOpenTimePicker('begin')}
                        >
                            {formatTime(beginTime)}
                        </button>
                        <div className="w-fit text-lg font-normal text-gray-600">
                            -
                        </div>
                        <button
                            className="text-center text-lg font-normal w-16 bg-white !border-[1px_solid_#999] center h-8 rounded-3xl overflow-hidden"
                            onClick={() => handleOpenTimePicker('end')}
                        >
                            {formatTime(endTime)}
                        </button>
                    </div>
                </section>
                <section className="center-y justify-between h-12">
                    <div className="">
                        <p className="font-medium text-gray-600">
                            Khoảng thời gian nhắc nhở
                        </p>
                    </div>
                    <div className="center-x items-end">
                        <div className="border-gray-400 rounded-3xl w-16 overflow-hidden">
                            <input
                                value={gapTimeNoti}
                                className="w-full h-full bg-white text-center text-lg font-normal text-gray-700"
                                type="number"
                                onChange={handleChangeGapTime}
                            />
                        </div>
                        <p className="ml-2 font-medium text-base text-gray-600">
                            phút
                        </p>
                    </div>
                </section>
                <Dialog
                    isOpen={isOpenTimePicker}
                    handleClose={() => setIsOpenTimePicker(false)}
                >
                    <div className="">
                        <StaticTimePicker
                            value={isSettingBeginTime ? beginTime : endTime}
                            onChange={handleChangeTimePicker}
                            onClose={() => setIsOpenTimePicker(false)}
                        />
                    </div>
                </Dialog>
            </div>
        </LocalizationProvider>
    );
}
