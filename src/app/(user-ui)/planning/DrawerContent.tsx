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
import { IPlanningData, IType, TFeature, optionType } from '@/types/planning';
import LabelContent from './optionContent/LabelContent';
import CloseIcon from '@mui/icons-material/Close';
import NoteContent from './optionContent/NoteContent';
import NotiContent from './optionContent/NotiContent';

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
    const [feature, setFeature] = useState<TFeature>('');
    const [openCategory, setopenCategory] = useState<boolean>(false);
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
        setopenCategory(true);
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

    const handleGenerate = (): void => {};

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
                    {openCategory && (
                        <div
                            className={clsx(
                                styles.hiddenScroll,
                                'h-14 w-full center-y overflow-x-scroll',
                            )}
                        >
                            <div className="center-y gap-7 w-fit h-10">
                                <div
                                    className={clsx(
                                        planningData.title
                                            ? 'center rounded-2xl gap-2 px-3 bg-lightgreen'
                                            : '',
                                        'h-full smooth w-10',
                                    )}
                                >
                                    <button
                                        className="w-fit h-full center gap-2 smooth"
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
                                                <div className=""></div>
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
                                            : '',
                                        'h-full smooth w-10',
                                    )}
                                >
                                    <button
                                        className="w-fit h-full center gap-2 smooth"
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
                                    </button>
                                    {checkNotiOrCalendarExists() && (
                                        <button
                                            className="w-6 h-full center"
                                            onClick={() => {
                                                setPlanningData((prev) => {
                                                    return {
                                                        ...prev,
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
                                        planningData.note
                                            ? 'center rounded-2xl gap-2 px-3 bg-lightgreen'
                                            : '',
                                        'h-full smooth w-10',
                                    )}
                                >
                                    <button
                                        className="w-fit h-full center gap-2 smooth"
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
                    )}
                </div>
            )}
            {step === 2 && optionShowing === optionType.TITLE && (
                <LabelContent
                    data={planningData.title}
                    feature={feature}
                    handleChange={handleTitleChange}
                />
            )}
            {step === 2 && optionShowing === optionType.NOTI && <NotiContent />}
            {step === 2 && feature === 'remind' && <div></div>}
        </div>
    );
};

export default DrawerContent;
