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
    IPlanningData,
    IType,
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

type Props = {};

const DrawerContent = ({}: Props) => {
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
    const [planningData, setPlanningData] = useState<IPlanningData>({
        title: '',
        note: '',
    });

    const checkNotiOrCalendarExists = (): boolean =>
        !!(planningData.noti || planningData.calender);

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
        setPlanningData((prev: IPlanningData) => {
            return {
                ...prev,
                title: data,
            };
        });

        setOptionShowing(optionType);
    };

    const handleSelectOption = (optionType: number): void => {
        setStep((prev) => prev + 1);
        setOptionShowing(optionType);
    };

    const handleGenerate = (): void => {
        if (
            step === 1 &&
            feature === 'remind' &&
            planningData.title === remindType.DRINK
        ) {
        }
        console.log('planningData: ', planningData);
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
        setPlanningData((prev) => {
            return {
                ...prev,
                note: content,
            };
        });
    };

    const clearData = (): void => {
        setPlanningData({
            title: '',
            note: '',
        });
    };

    return (
        <div className="bg-gray-100 rounded-t-lg px-2 pb-4">
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
                    <div className="">
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
                                    className="w-fit h-12 center gap-2 smooth"
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
                                    {planningData.title &&
                                        (feature === 'planning' ? (
                                            <div className="center">
                                                <p className="font-medium">
                                                    {planningData.title}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="center gap-2">
                                                <p className="font-medium">
                                                    {getTitleRemindOptionById(
                                                        planningData.title,
                                                    )}
                                                </p>
                                            </div>
                                        ))}
                                </button>
                                {planningData.title && (
                                    <button
                                        className="w-6 h-full center"
                                        onClick={() => {
                                            setPlanningData((prev) => {
                                                return {
                                                    ...prev,
                                                    title: '',
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
                                    checkNotiOrCalendarExists()
                                        ? 'center rounded-2xl gap-2 px-3 bg-lightgreen'
                                        : 'w-10',
                                    'h-full smooth',
                                )}
                            >
                                <button
                                    className="w-fit h-12 center gap-2 smooth"
                                    onClick={() =>
                                        handleSelectOption(
                                            feature === 'planning'
                                                ? optionType.CALENDAR
                                                : optionType.NOTI,
                                        )
                                    }
                                >
                                    <Image
                                        src={
                                            feature === 'planning'
                                                ? '/icons/planning/calendar-icon.svg'
                                                : '/icons/planning/noti-icon.svg'
                                        }
                                        width={26}
                                        height={26}
                                        alt="icon"
                                    />
                                    {planningData.noti && (
                                        <div className="center-x items-start flex-col">
                                            <p className="font-normal">
                                                Nhắc tôi uống nước
                                            </p>
                                            <p className="text-xs text-gray-700 font-normal">
                                                {`Từ ${dayjs(
                                                    planningData.noti
                                                        .timeRange[0],
                                                ).format('HH:mm')} đến ${dayjs(
                                                    planningData.noti
                                                        .timeRange[1],
                                                ).format('HH:mm')}`}
                                            </p>
                                        </div>
                                    )}
                                </button>
                                {checkNotiOrCalendarExists() && (
                                    <button
                                        className="w-6 h-full center"
                                        onClick={() => {
                                            console.log('click');
                                            let newData = {
                                                ...planningData,
                                            };
                                            if (feature === 'remind') {
                                                delete newData.noti;
                                            } else {
                                                delete newData.calender;
                                            }
                                            setPlanningData(newData);
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
                                    className="w-fit h-12 center gap-2 smooth"
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
                                            setPlanningData((prev) => {
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
                </div>
            )}

            {/* Chọn Tiêu đề cho planning hoặc option cho remind */}
            {step === 2 && optionShowing === optionType.TITLE && (
                <LabelContent
                    data={planningData.title}
                    feature={feature}
                    handleChange={handleTitleChange}
                />
            )}

            {/* Noti cho remind */}
            {step === 2 && optionShowing === optionType.NOTI && (
                <NotiContent handleChange={setPlanningData} />
            )}

            {/* Note cho cả planning và remind */}
            {step === 2 && optionShowing === optionType.NOTE && (
                <NoteContent
                    contentInput={planningData.note}
                    handleChange={getNote}
                />
            )}

            {/* Calendar cho Planning */}
            {step === 2 && optionShowing === optionType.CALENDAR && (
                <CalendarContent />
            )}
        </div>
    );
};

export default DrawerContent;
