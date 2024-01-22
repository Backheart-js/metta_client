'use client';

import {
    Button,
    FormControlLabel,
    IconButton,
    Radio,
    RadioGroup,
} from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import styles from './Planning.module.scss';
import clsx from 'clsx';
import {
    IExerciseReminderData,
    IPlanning,
    IRemindData,
    IType,
    IWaterReminderData,
    TFeature,
    optionType,
    remindType,
} from '../../../types/planning';
import LabelContent from './optionContent/LabelContent';
import CloseIcon from '@mui/icons-material/Close';
import NoteContent from './optionContent/NoteContent';
import NotiContent from './optionContent/NotiContent';
import dayjs from 'dayjs';
import CalendarContent from './optionContent/CalendarContent';
import waterReminderSync from '@/utils/axios/waterReminder';
import { features } from 'process';
import exerciseReminderSync from '@/utils/axios/exerciseReminder';

type Props = {
    onCloseDrawer: () => void;
};

const DrawerContent = ({ onCloseDrawer }: Props) => {
    const notiTitleData: IType[] = [
        {
            id: 1,
            label: 'Lời nhắc uống nước',
        },
        {
            id: 2,
            label: 'Lời nhắc tập thể dục',
        },
    ];

    const [step, setStep] = useState<number>(1);
    const [feature, setFeature] = useState<TFeature>('planning');
    const [optionShowing, setOptionShowing] = useState<number>(0);
    // Data tổng cho remind
    const [remindData, setRemindData] = useState<IRemindData>({
        title: 0,
        note: '',
    });
    // Data tổng cho planning
    const [planningData, setPlanningData] = useState<IPlanning>({
        title: '',
        dateRange: [dayjs(), dayjs().add(3, 'month')],
        note: '',
    });

    const openFeatureCategory = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        clearData();
        setFeature((event.target as HTMLInputElement).value as TFeature);
    };

    const handleTitleChange = (
        data: string | number,
        optionType: number,
    ): void => {
        if (feature === 'planning') {
            setPlanningData((prev) => ({
                ...prev,
                title: data as string,
            }));
        } else {
            if (typeof data === 'number') {
                setRemindData((prev) => {
                    return {
                        ...prev,
                        title: data,
                    };
                });
            }
        }

        setOptionShowing(optionType);
    };

    const handleSelectOption = (optionType: number): void => {
        setStep((prev) => prev + 1);
        setOptionShowing(optionType);
    };

    const handleGenerate = (): void => {
        if (step === 1 && feature === 'remind') {
            if (remindData.title === remindType.DRINK) {
                console.log('vào ', remindData.noti);
                if (remindData.noti) {
                    const formatData: IWaterReminderData = {
                        waterAmount: remindData.noti?.amountWater,
                        startTime: formatToHour(remindData.noti?.timeRange[0]),
                        endTime: formatToHour(remindData.noti?.timeRange[1]),
                        interval: remindData.noti?.timeGap,
                        note: remindData.note,
                    };
                    console.log(formatData);
                    createWaterReminder(formatData);
                }
            } else {
                if (remindData.exerciseNoti) {
                    const formatData: IExerciseReminderData = {
                        remindTime: formatToHour(
                            remindData.exerciseNoti.remindTime,
                        ),
                        repeat: remindData.exerciseNoti.repeat,
                        note: remindData.note,
                    };
                    createExerciseReminder(formatData);
                    console.log(formatData);
                }
            }
        }
    };

    const createWaterReminder = async (data: IWaterReminderData) => {
        try {
            const res = await waterReminderSync.createWaterReminder(data);

            if (res.status === 200) {
                console.log('Tạo thành công');
                clearData();
                onCloseDrawer();
            }
        } catch (error) {
            console.log('Báo lỗi');
        }
    };
    const createExerciseReminder = async (data: IExerciseReminderData) => {
        try {
            const res = await exerciseReminderSync.createExerciseReminder(data);

            if (res.status === 200) {
                console.log('tạo thành công');
                clearData();
                onCloseDrawer();
            }
        } catch (error) {
            console.log('Báo lỗi');
        }
    };

    const formatToHour = function (data: dayjs.Dayjs): string {
        return data.format('HH:mm');
    };

    const renderTitle = (option: number): string => {
        if (option === optionType.NOTE) return 'Ghi chú';
        else if (feature === 'planning') {
            switch (option) {
                case optionType.TITLE:
                    return 'Đặt tiêu đề';
                case optionType.CALENDAR:
                    return 'Đến hạn';
            }
        } else if (feature === 'remind') {
            switch (option) {
                case optionType.TITLE:
                    return 'Chọn lời nhắc';
                case optionType.NOTI:
                    return 'Nhắc nhở';
            }
        }
        return '';
    };

    const getTitleRemindOptionById = (id: number | string): string => {
        const result = notiTitleData.find((item) => item.id === id);
        return result ? result.label : '';
    };

    const getNote = (content: string): void => {
        if (feature === 'planning') {
            setPlanningData((prev) => {
                return {
                    ...prev,
                    note: content,
                };
            });
        } else {
            setRemindData((prev) => {
                return {
                    ...prev,
                    note: content,
                };
            });
        }
    };

    const clearData = (): void => {
        setPlanningData({
            title: '',
            dateRange: [dayjs(), dayjs().add(3, 'month')],
            note: '',
        });
        setRemindData({
            title: 0,
            note: '',
        });
    };

    return (
        <div className="bg-gray-100 rounded-t-lg px-2 pb-2">
            <div className="relative w-full h-14 center border-b-[1px] border-gray-300 mb-2">
                <div className="">
                    <p className="text-gray-600 font-semibold uppercase text-lg">
                        {step === 1 ? 'Tính năng' : renderTitle(optionShowing)}
                    </p>
                </div>
                <div className="absolute right-0 top-[50%] translate-y-[-50%]">
                    <Button
                        className="text-boldGreen text-sm font-semibolds"
                        variant="text"
                        onClick={() => {
                            step === 1 ? handleGenerate() : setStep(1);
                        }}
                    >
                        Hoàn thành
                    </Button>
                </div>
            </div>
            {step === 1 && (
                <div className="pl-2">
                    <div className="mb-2">
                        <RadioGroup
                            value={feature}
                            defaultValue={feature}
                            name="radio-buttons-group"
                            onChange={openFeatureCategory}
                        >
                            <FormControlLabel
                                sx={{
                                    height: 52,
                                    '& .Mui-checked .MuiSvgIcon-root': {
                                        fill: '#097770', // Màu sắc khi radio button được chọn
                                    },
                                }}
                                value="planning"
                                control={<Radio />}
                                label="Lên kế hoạch luyện tập"
                            />
                            <FormControlLabel
                                sx={{
                                    height: 52,
                                    '& .Mui-checked .MuiSvgIcon-root': {
                                        fill: '#097770', // Màu sắc khi radio button được chọn
                                    },
                                }}
                                value="remind"
                                control={<Radio />}
                                label="Tạo lời nhắc mới"
                            />
                        </RadioGroup>
                    </div>

                    {/* Mở category bên dưới */}
                    {/* Category planning */}
                    {feature === 'planning' ? (
                        <div
                            className={clsx(
                                styles.hiddenScroll,
                                'h-14 w-full overflow-x-scroll',
                            )}
                        >
                            <div className="flex gap-7">
                                <div
                                    className={clsx(
                                        planningData.title
                                            ? 'center rounded-2xl gap-2 px-3 bg-lightgreen'
                                            : 'w-10',
                                        'h-full smooth',
                                    )}
                                >
                                    <button
                                        className="w-fit pr-2 h-12 center gap-2 smooth"
                                        onClick={() =>
                                            handleSelectOption(optionType.TITLE)
                                        }
                                    >
                                        <Image
                                            src="/icons/planning/label-title-icon.svg"
                                            width={26}
                                            height={26}
                                            alt="icon"
                                        />
                                        {planningData.title && (
                                            <div className="center">
                                                <p className="font-medium">
                                                    {planningData.title}
                                                </p>
                                            </div>
                                        )}
                                    </button>
                                    {planningData.title && (
                                        <button
                                            className="w-6 h-full center"
                                            onClick={() => {
                                                setRemindData((prev) => {
                                                    return {
                                                        ...prev,
                                                        title: 0,
                                                    };
                                                });
                                            }}
                                        >
                                            <div className="rounded-full w-4 h-4 center bg-gray-700">
                                                <CloseIcon className="text-sm text-lightgreen" />
                                            </div>
                                        </button>
                                    )}
                                </div>
                                <div
                                    className={clsx(
                                        planningData.dateRange[0]
                                            ? 'center rounded-2xl gap-2 px-3 bg-lightgreen'
                                            : 'w-10',
                                        'h-full smooth',
                                    )}
                                >
                                    <button
                                        className="w-fit pr-2 h-12 center gap-2 smooth"
                                        onClick={() =>
                                            handleSelectOption(
                                                optionType.CALENDAR,
                                            )
                                        }
                                    >
                                        <Image
                                            src={
                                                '/icons/planning/calendar-icon.svg'
                                            }
                                            width={26}
                                            height={26}
                                            alt="icon"
                                        />
                                        {planningData.dateRange && (
                                            <div className="center-y">
                                                <p className="flex text-xs text-gray-700 font-normal">
                                                    {`Từ ${planningData.dateRange[0].format(
                                                        'DD:MM',
                                                    )} đến ${planningData.dateRange[1].format(
                                                        'DD:MM',
                                                    )}`}
                                                </p>
                                            </div>
                                        )}
                                    </button>
                                    {planningData.dateRange[0] &&
                                        planningData.dateRange[1] && (
                                            <button
                                                className="w-6 h-full center"
                                                onClick={() => {
                                                    setPlanningData((prev) => ({
                                                        ...prev,
                                                        startDate: dayjs(),
                                                        endDate: dayjs().add(
                                                            3,
                                                            'month',
                                                        ),
                                                    }));
                                                }}
                                            >
                                                <div className="rounded-full w-4 h-4 center bg-gray-700">
                                                    <CloseIcon className="text-sm text-lightgreen" />
                                                </div>
                                            </button>
                                        )}
                                </div>
                                <div
                                    className={clsx(
                                        planningData.note
                                            ? 'center rounded-2xl gap-2 px-3 bg-lightgreen'
                                            : 'w-10',
                                        'h-full smooth',
                                    )}
                                >
                                    <button
                                        className="w-fit pr-2 h-12 center gap-2 smooth"
                                        onClick={() =>
                                            handleSelectOption(optionType.NOTE)
                                        }
                                    >
                                        <Image
                                            src="/icons/planning/note-icon.svg"
                                            width={26}
                                            height={26}
                                            alt="icon"
                                        />
                                        {planningData.note && (
                                            <div className="center gap-2">
                                                <p className="font-medium">
                                                    Ghi chú
                                                </p>
                                            </div>
                                        )}
                                    </button>
                                    {planningData.note && (
                                        <button
                                            className="w-6 h-full center"
                                            onClick={() => {
                                                setRemindData((prev) => {
                                                    return {
                                                        ...prev,
                                                        note: '',
                                                    };
                                                });
                                            }}
                                        >
                                            <div className="rounded-full w-4 h-4 center bg-gray-700">
                                                <CloseIcon className="text-sm text-lightgreen" />
                                            </div>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={clsx(
                                styles.hiddenScroll,
                                'h-14 w-full overflow-x-scroll',
                            )}
                        >
                            <div className="flex gap-7">
                                <div
                                    className={clsx(
                                        remindData.title
                                            ? 'center rounded-2xl gap-2 px-3 bg-lightgreen'
                                            : 'w-10',
                                        'h-full smooth',
                                    )}
                                >
                                    <button
                                        className="w-fit pr-2 h-12 center gap-2 smooth"
                                        onClick={() =>
                                            handleSelectOption(optionType.TITLE)
                                        }
                                    >
                                        <Image
                                            src="/icons/planning/label-title-icon.svg"
                                            width={26}
                                            height={26}
                                            alt="icon"
                                        />
                                        {remindData.title ? (
                                            <div className="center gap-2">
                                                <p className="font-medium">
                                                    {getTitleRemindOptionById(
                                                        remindData.title,
                                                    )}
                                                </p>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </button>
                                    {remindData.title ? (
                                        <button
                                            className="w-6 h-full center"
                                            onClick={() => {
                                                setRemindData((prev) => {
                                                    return {
                                                        ...prev,
                                                        title: 0,
                                                    };
                                                });
                                            }}
                                        >
                                            <div className="rounded-full w-4 h-4 center bg-gray-700">
                                                <CloseIcon className="text-sm text-lightgreen" />
                                            </div>
                                        </button>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div
                                    className={clsx(
                                        ((): boolean => {
                                            return !(
                                                remindData.noti ||
                                                remindData.exerciseNoti
                                            );
                                        })()
                                            ? 'w-10'
                                            : 'center rounded-2xl gap-2 px-3 bg-lightgreen',
                                        'h-full smooth',
                                    )}
                                >
                                    <button
                                        disabled={!remindData.title}
                                        className="w-fit pr-2 h-12 center gap-2 smooth"
                                        onClick={() =>
                                            handleSelectOption(optionType.NOTI)
                                        }
                                    >
                                        <Image
                                            src={
                                                '/icons/planning/noti-icon.svg'
                                            }
                                            className={`${
                                                remindData.title
                                                    ? ''
                                                    : 'opacity-50'
                                            }`}
                                            width={26}
                                            height={26}
                                            alt="icon"
                                        />
                                        {remindData.noti &&
                                            (remindData.title ===
                                            remindType.DRINK ? (
                                                <div className="center-x items-start flex-col">
                                                    <p className="font-normal">
                                                        Nhắc tôi uống nước
                                                    </p>
                                                    <p className="text-xs text-gray-700 font-normal">
                                                        {`Từ ${dayjs(
                                                            remindData.noti
                                                                .timeRange[0],
                                                        ).format(
                                                            'HH:mm',
                                                        )} đến ${dayjs(
                                                            remindData.noti
                                                                .timeRange[1],
                                                        ).format('HH:mm')}`}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="">
                                                    <p className="">
                                                        {dayjs(
                                                            remindData
                                                                .exerciseNoti
                                                                ?.remindTime,
                                                        ).format('HH:mm')}
                                                    </p>
                                                </div>
                                            ))}
                                    </button>
                                    {((): boolean => {
                                        return !(
                                            remindData.noti ||
                                            remindData.exerciseNoti
                                        );
                                    })() || (
                                        <button
                                            className="w-6 h-full center"
                                            onClick={() => {
                                                let newData = {
                                                    ...remindData,
                                                };
                                                if (
                                                    remindData.title ===
                                                    remindType.DRINK
                                                ) {
                                                    delete newData.noti;
                                                } else {
                                                    delete newData.exerciseNoti;
                                                }
                                                setRemindData(newData);
                                            }}
                                        >
                                            <div className="rounded-full w-4 h-4 center bg-gray-700">
                                                <CloseIcon className="text-sm text-lightgreen" />
                                            </div>
                                        </button>
                                    )}
                                </div>
                                <div
                                    className={clsx(
                                        remindData.note
                                            ? 'center rounded-2xl gap-2 px-3 bg-lightgreen'
                                            : 'w-10',
                                        'h-full smooth',
                                    )}
                                >
                                    <button
                                        className="w-fit pr-2 h-12 center gap-2 smooth"
                                        onClick={() =>
                                            handleSelectOption(optionType.NOTE)
                                        }
                                    >
                                        <Image
                                            src="/icons/planning/note-icon.svg"
                                            width={26}
                                            height={26}
                                            alt="icon"
                                        />
                                        {remindData.note && (
                                            <div className="center gap-2">
                                                <p className="font-medium">
                                                    Ghi chú
                                                </p>
                                            </div>
                                        )}
                                    </button>
                                    {remindData.note && (
                                        <button
                                            className="w-6 h-full center"
                                            onClick={() => {
                                                setRemindData((prev) => {
                                                    return {
                                                        ...prev,
                                                        note: '',
                                                    };
                                                });
                                            }}
                                        >
                                            <div className="rounded-full w-4 h-4 center bg-gray-700">
                                                <CloseIcon className="text-sm text-lightgreen" />
                                            </div>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Chọn Tiêu đề cho planning hoặc option cho remind */}
            {step === 2 && optionShowing === optionType.TITLE && (
                <LabelContent
                    data={
                        feature === 'planning'
                            ? planningData.title
                            : remindData.title
                    }
                    feature={feature}
                    handleChange={handleTitleChange}
                />
            )}

            {/* Noti cho remind */}
            {step === 2 && optionShowing === optionType.NOTI && (
                <NotiContent
                    remindTypeInput={remindData.title}
                    handleChange={setRemindData}
                />
            )}

            {/* Note cho cả planning và remind */}
            {step === 2 && optionShowing === optionType.NOTE && (
                <NoteContent
                    contentInput={remindData.note}
                    handleChange={getNote}
                />
            )}

            {/* Calendar cho Planning */}
            {step === 2 && optionShowing === optionType.CALENDAR && (
                <CalendarContent
                    dateRangeInput={planningData.dateRange}
                    handleChange={setPlanningData}
                />
            )}
        </div>
    );
};

export default DrawerContent;
