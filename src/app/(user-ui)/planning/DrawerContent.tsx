'use client';

import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import styles from './Planning.module.scss';
import clsx from 'clsx';
import { TFeature, optionType } from '@/types/planning';
import LabelContent from './optionContent/LabelContent';

type Props = {};

const DrawerContent = ({}: Props) => {
    const [step, setStep] = useState<number>(1);
    const [feature, setFeature] = useState<TFeature>('planning');
    const [openCategory, setopenCategory] = useState<boolean>(false);
    const [optionShowing, setOptionShowing] = useState<number>(0);

    const openFeatureCategory = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        setopenCategory(true);
        setFeature((event.target as HTMLInputElement).value as TFeature);
    };

    const handleTitleChange = (
        data: string | number,
        optionType: number,
    ): void => {
        setOptionShowing(optionType);
    };

    const handleSelectOption = (optionType: number): void => {
        console.log('call');
        setStep((prev) => prev + 1);
        setOptionShowing(optionType);
    };

    const handleGenerate = (): void => {};

    const renderTitle = (state: any): string => {
        if (optionShowing === optionType.NOTE) return 'Ghi chú';
        else if (feature === 'planning') {
            switch (optionShowing) {
                case optionType.TITLE:
                    return 'Đặt tiêu đề';
                case optionType.CALENDAR:
                    return 'Đến hạn';
            }
        } else if (feature === 'remind') {
            switch (optionShowing) {
                case optionType.TITLE:
                    return 'Chọn lời nhắc';
                case optionType.NOTI:
                    return 'Nhắc nhở';
            }
        }
        return '';
    };

    return (
        <div className="bg-gray-100 rounded-t-lg px-2 pb-4">
            <div className="relative w-full h-14 center border-b-[1px] border-gray-300 mb-2">
                <div className="">
                    <p className="text-gray-600 font-semibold uppercase text-lg">
                        {step === 1 ? 'Tính năng' : renderTitle(step)}
                    </p>
                </div>
                <div className="absolute right-0 top-[50%] translate-y-[-50%]">
                    <Button
                        className="text-boldGreen text-sm font-semibolds"
                        variant="text"
                    >
                        Hoàn thành
                    </Button>
                </div>
            </div>
            {step === 1 && (
                <div className="pl-2">
                    <div className="">
                        <RadioGroup
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
                    {openCategory &&
                        (feature === 'planning' ? (
                            <div
                                className={clsx(
                                    styles.hiddenScroll,
                                    'h-14 w-full center-y overflow-x-scroll',
                                )}
                            >
                                <div className="center-y gap-6 w-fit">
                                    <div className="">
                                        <button
                                            className="w-fit"
                                            onClick={() =>
                                                handleSelectOption(
                                                    optionType.TITLE,
                                                )
                                            }
                                        >
                                            <Image
                                                src="/icons/planning/label-title-icon.svg"
                                                width={26}
                                                height={26}
                                                alt="icon"
                                            />
                                        </button>
                                    </div>
                                    <div className="">
                                        <button
                                            className="w-fit"
                                            onClick={() =>
                                                handleSelectOption(
                                                    optionType.NOTI,
                                                )
                                            }
                                        >
                                            <Image
                                                src="/icons/planning/noti-icon.svg"
                                                width={26}
                                                height={26}
                                                alt="icon"
                                            />
                                        </button>
                                    </div>
                                    <div className="">
                                        <button
                                            className="w-fit"
                                            onClick={() =>
                                                handleSelectOption(
                                                    optionType.NOTE,
                                                )
                                            }
                                        >
                                            <Image
                                                src="/icons/planning/note-icon.svg"
                                                width={26}
                                                height={26}
                                                alt="icon"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                className={clsx(
                                    styles.hiddenScroll,
                                    'h-14 w-full center-y overflow-x-scroll',
                                )}
                            >
                                <div className="center-y gap-6 w-fit">
                                    <div className="w-[300px]">
                                        <button
                                            className="w-fit"
                                            onClick={() =>
                                                handleSelectOption(
                                                    optionType.TITLE,
                                                )
                                            }
                                        >
                                            <Image
                                                src="/icons/planning/label-title-icon.svg"
                                                width={26}
                                                height={26}
                                                alt="icon"
                                            />
                                        </button>
                                    </div>
                                    <div className="w-[300px]">
                                        <button
                                            className="w-fit"
                                            onClick={() =>
                                                handleSelectOption(
                                                    optionType.CALENDAR,
                                                )
                                            }
                                        >
                                            <Image
                                                src="/icons/planning/calendar-icon.svg"
                                                width={26}
                                                height={26}
                                                alt="icon"
                                            />
                                        </button>
                                    </div>
                                    <div className="w-[300px]">
                                        <button
                                            className="w-fit"
                                            onClick={() =>
                                                handleSelectOption(
                                                    optionType.NOTE,
                                                )
                                            }
                                        >
                                            <Image
                                                src="/icons/planning/note-icon.svg"
                                                width={26}
                                                height={26}
                                                alt="icon"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
            {step === 2 && optionShowing === optionType.TITLE && (
                <LabelContent
                    feature={feature}
                    handleChange={handleTitleChange}
                />
            )}
            {step === 2 && feature === 'remind' && <div></div>}
        </div>
    );
};

export default DrawerContent;
