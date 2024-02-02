'use client';

import { IUserInfo } from '@/types/userType';
import { Button, IconButton, TextField, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Slider from '@mui/material/Slider';
import clsx from 'clsx';
import userSync from '@/utils/axios/user';

export interface IUpdateInfoFormProps {
    handleAfterUpdate?: () => void;
}

function ValueLabelComponent(props: any) {
    const { children, value } = props;

    return (
        <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

export default function UpdateInfoForm({
    handleAfterUpdate,
}: IUpdateInfoFormProps) {
    const [userData, setUserData] = useState<IUserInfo>({
        avatarUrl: '',
        fullname: '',
        gender: 1,
        birthYear: 0,
        exerciseIntensity: 3,
        weight: 0,
        height: 0,
    });
    const [isProcessUpdate, setIsProcessUpdate] = useState(false);

    const handleChangeAge = (e: any) => {
        const currentYear = new Date().getFullYear();

        // Tính năm sinh
        const birthYear = currentYear - parseInt(e.target.value);
    };

    const parseToAge = (year: number): number => {
        const currentYear = new Date().getFullYear();

        return currentYear - year;
    };

    const handleUpdateData = async () => {
        setIsProcessUpdate(true);
        try {
            const res = await userSync.updateUserInfo(userData);

            if (res.status === 200) {
                if (handleAfterUpdate) {
                    handleAfterUpdate();
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsProcessUpdate(false);
        }
    };

    // useEffect(() => {
    //     (async () => {
    //         const resData = await userSync.getCurrentUser();

    //         if (resData.status === 200) {
    //             setUserData(resData.data.result);
    //         }
    //     })();

    //     return () => {};
    // }, []);

    return (
        <div className="w-full max-w-[400px]">
            <div className="bg-white px-4 pt-8 pb-10 rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                <p className="center text-2xl font-medium text-boldGreen">
                    Cường độ luyện tập
                </p>
                <div className="mt-5">
                    <div className="center gap-6 mt-5">
                        <TextField
                            placeholder="Số buổi"
                            value={userData.exerciseIntensity}
                            type="number"
                            name="exerciseIntensity"
                            variant="standard"
                            onChange={(e) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    exerciseIntensity: parseInt(e.target.value),
                                }))
                            }
                        />
                        <p className="text-gray-500 font-medium text-base">
                            buổi/tuần
                        </p>
                    </div>
                </div>
            </div>
            <div className="center flex-col bg-white mt-6 px-4 pt-8 pb-6 rounded-md">
                <div className="w-full">
                    <TextField
                        value={userData.fullname}
                        className="w-full rounded"
                        type="text"
                        name="fullname"
                        label="Tên đầy đủ"
                        variant="outlined"
                        onChange={(e) =>
                            setUserData((prev) => ({
                                ...prev,
                                fullname: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="w-full center gap-4 my-8">
                    <div className="flex-1">
                        <button
                            name="gender"
                            className={clsx(
                                'center flex-col gap-3 p-4 h-32 w-full rounded bg-gray-100',
                                userData.gender === 1
                                    ? '!text-boldGreen font-bold bg-lightgreen'
                                    : 'text-gray-400',
                            )}
                            onClick={() =>
                                setUserData((prev) => ({
                                    ...prev,
                                    gender: 1,
                                }))
                            }
                        >
                            <MaleIcon className="text-[60px]" />
                            <p className="text-lg">Nam</p>
                        </button>
                    </div>
                    <div className="flex-1">
                        <button
                            name="gender"
                            className={clsx(
                                'center flex-col gap-3 p-4 h-32 w-full rounded bg-gray-100',
                                userData.gender === 2
                                    ? '!text-boldGreen font-bold bg-lightgreen'
                                    : 'text-gray-400',
                            )}
                            onClick={() =>
                                setUserData((prev) => ({
                                    ...prev,
                                    gender: 2,
                                }))
                            }
                        >
                            <FemaleIcon className="text-[60px]" />
                            <p className="text-lg">Nữ</p>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-4">
                    <div className="w-full">
                        <p className="">Chiều cao (cm)</p>
                        <div className="center-y gap-6 justify-between mt-4">
                            <IconButton aria-label="delete">
                                <RemoveIcon />
                            </IconButton>
                            <div className="flex-grow">
                                <IOSSlider
                                    min={100}
                                    max={200}
                                    defaultValue={userData.height}
                                    valueLabelDisplay="on"
                                    onChange={(e, value: number | number[]) => {
                                        if (typeof value === 'number') {
                                            setUserData((prev) => ({
                                                ...prev,
                                                height: value,
                                            }));
                                        }
                                    }}
                                />
                            </div>
                            <IconButton aria-label="delete">
                                <AddIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="w-full bg-gray-100 rounded-lg py-3 px-2">
                            <p className="center">Cân nặng (kg)</p>
                            <div className="center">
                                <input
                                    value={userData.weight}
                                    name="weight"
                                    className="text-center text-xl md:text-2xl text-boldGreen font-semibold bg-transparent w-10 md:w-14 h-10 md:h-14"
                                    type="number"
                                    onChange={(e) =>
                                        setUserData((prev) => ({
                                            ...prev,
                                            weight: parseInt(e.target.value),
                                        }))
                                    }
                                />
                            </div>
                            <div className="center gap-8">
                                <IconButton
                                    className="bg-white"
                                    aria-label="delete"
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton
                                    className="bg-white"
                                    aria-label="delete"
                                >
                                    <AddIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-lg py-3 px-2">
                            <p className="center">Số tuổi</p>
                            <div className="center">
                                <input
                                    name="birthYear"
                                    value={parseToAge(userData.birthYear)}
                                    className="text-center text-xl md:text-2xl text-boldGreen font-semibold bg-transparent w-10 md:w-14 h-10 md:h-14"
                                    type="number"
                                    onChange={(e) =>
                                        setUserData((prev) => ({
                                            ...prev,
                                            age: parseInt(e.target.value),
                                        }))
                                    }
                                />
                            </div>
                            <div className="center gap-8">
                                <IconButton
                                    className="bg-white"
                                    aria-label="delete"
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton
                                    className="bg-white"
                                    aria-label="delete"
                                >
                                    <AddIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="center mt-6 w-full px-4">
                <Button
                    disabled={isProcessUpdate}
                    className="bg-boldGreen text-white hover:bg-boldGreen rounded-2xl w-full py-2"
                    variant="contained"
                    onClick={handleUpdateData}
                >
                    Xác nhận
                </Button>
            </div>
        </div>
    );
}

const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = styled(Slider)(({ theme }) => ({
    color: '#097770',
    height: 5,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
        height: 20,
        width: 20,
        backgroundColor: '#097770',
        boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',
        '&:focus, &:hover, &.Mui-active': {
            boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow: iOSBoxShadow,
            },
        },
        '&:before': {
            boxShadow:
                '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
        },
    },
    '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: 'normal',
        top: -6,
        backgroundColor: 'unset',
        color: theme.palette.text.primary,
        '&::before': {
            display: 'none',
        },
        '& *': {
            background: 'transparent',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
        height: 5,
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        boxShadow: 'inset 0px 0px 4px -2px #000',
        backgroundColor: '#d0d0d0',
    },
}));
