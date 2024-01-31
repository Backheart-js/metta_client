'use client';
import Dialog from '@/components/Dialog/Dialog';
import { IExerciseReminder, IWaterReminder } from '@/types/reminderType';
import { IconButton } from '@mui/material';
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { dayOfWeek } from '@/types/planning';

export interface IReminderProps {
    params: {
        type: string;
    };
}

export default function Reminder({ params }: IReminderProps) {
    const { type } = params;
    const [dataWaterReminder, setDataWaterReminder] = useState<IWaterReminder>({
        amountWaterPerTime: 0,
        createdAt: '',
        endTime: '',
        interval: 0,
        note: '',
        remindTime: [''],
        startTime: '',
        updateAt: '',
        waterAmount: 0,
    });
    const [dataExerciseReminder, setDataExerciseReminder] = useState<
        IExerciseReminder[]
    >([
        {
            note: '',
            remindTime: '',
            repeat: [0],
        },
    ]);
    const [isSettingBeginTime, setIsSettingBeginTime] = useState(true);
    const [isOpenTimePicker, setIsOpenTimePicker] = useState<boolean>(false);
    const [gapTimeNoti, setGapTimeNoti] = useState<number>(30);
    const [beginTime, setBeginTime] = useState(dayjs('2024-01-17T7:00'));
    const [endTime, setEndTime] = useState(dayjs('2024-01-17T22:00'));
    const [amountWater, setAmountWarter] = useState<number>(2000);
    const [exerciseTimeRemind, setExerciseTimeRemind] = useState(
        dayjs('2024-01-17T7:00'),
    );
    const [dayRepeat, setDayRepeat] = useState<number[]>([0]);

    const formatTime = (time: dayjs.Dayjs): string => {
        return dayjs(time).format('HH:mm');
    };
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
    const handleChangeGapTime = (event: any): void => {
        setGapTimeNoti(event.target.value);
    };
    const handleOpenTimePicker = (type: string): void => {
        setIsSettingBeginTime(type === 'begin');
        setIsOpenTimePicker(true);
    };
    const handleChangeTimePicker = (time: any): void => {
        if (type === 'drink-water') {
            if (isSettingBeginTime) {
                setBeginTime(time);
            } else {
                setEndTime(time);
            }
        } else {
            setExerciseTimeRemind(time);
        }
    };

    // Hàm xử lý khi click chọn ngày trong tuần (nhắc tập thể dục)
    const handleCheckboxChange = (dayValue: number) => {
        // Kiểm tra xem ngày đã tồn tại trong mảng chưa
        const isDaySelected = dayRepeat.includes(dayValue);

        // Nếu đã tồn tại, loại bỏ khỏi mảng, ngược lại thì thêm vào mảng
        const updatedDays = isDaySelected
            ? dayRepeat.filter((day) => day !== dayValue)
            : [...dayRepeat, dayValue];

        // Cập nhật trạng thái dayRepeat
        setDayRepeat(updatedDays);
    };

    useEffect(() => {
        if (type === 'drink-water') {
            const dataWaterFromStorage = JSON.parse(
                sessionStorage.getItem('dataWaterReminder') || 'null',
            );
            setDataWaterReminder(dataWaterFromStorage);
        } else {
            const dataExerciseFromStorage = JSON.parse(
                sessionStorage.getItem('dataExerciseReminder') || 'null',
            );
            setDataExerciseReminder(dataExerciseFromStorage);
        }

        return () => {};
    }, [type]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
                {type === 'drink-water' ? (
                    <div className="">
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
                                        onClick={() =>
                                            handleOpenTimePicker('begin')
                                        }
                                    >
                                        {formatTime(beginTime)}
                                    </button>
                                    <div className="w-fit text-lg font-normal text-gray-600">
                                        -
                                    </div>
                                    <button
                                        className="text-center text-lg font-normal w-16 bg-white !border-[1px_solid_#999] center h-8 rounded-3xl overflow-hidden"
                                        onClick={() =>
                                            handleOpenTimePicker('end')
                                        }
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
                                        value={
                                            isSettingBeginTime
                                                ? beginTime
                                                : endTime
                                        }
                                        onChange={handleChangeTimePicker}
                                        onClose={() =>
                                            setIsOpenTimePicker(false)
                                        }
                                    />
                                </div>
                            </Dialog>
                        </div>
                    </div>
                ) : (
                    <div className="">
                        <section className="center-y justify-between h-12 my-4">
                            <div className="">
                                <p className="font-medium text-gray-600">
                                    Thời gian nhắc
                                </p>
                            </div>
                            <div className="center gap-3">
                                <button
                                    className="text-center text-lg font-normal w-16 bg-white !border-[1px_solid_#999] center h-8 rounded-3xl overflow-hidden"
                                    onClick={() =>
                                        handleOpenTimePicker('begin')
                                    }
                                >
                                    {formatTime(exerciseTimeRemind)}
                                </button>
                            </div>
                        </section>
                        <section className="">
                            <div className="mb-2">
                                <p className="font-medium text-gray-600">
                                    Lặp lại
                                </p>
                            </div>
                            <div className="bg-lightgreen rounded-lg">
                                {dayOfWeek.map((day) => {
                                    return (
                                        <label
                                            className="center-y justify-between px-4 py-3"
                                            key={day.value}
                                            htmlFor={day.label}
                                        >
                                            <p className="text-lg font-medium">
                                                {day.label}
                                            </p>
                                            <input
                                                className="border-none bg-transparent"
                                                type="checkbox"
                                                name=""
                                                id={day.label}
                                                checked={dayRepeat.includes(
                                                    day.value,
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        day.value,
                                                    )
                                                }
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                        </section>
                        <Dialog
                            isOpen={isOpenTimePicker}
                            handleClose={() => setIsOpenTimePicker(false)}
                        >
                            <div className="">
                                <StaticTimePicker
                                    value={exerciseTimeRemind}
                                    onChange={handleChangeTimePicker}
                                    onClose={() => setIsOpenTimePicker(false)}
                                />
                            </div>
                        </Dialog>
                    </div>
                )}
            </div>
        </LocalizationProvider>
    );
}
