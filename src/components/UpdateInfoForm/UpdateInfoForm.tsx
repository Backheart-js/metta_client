import { IUserInfo } from '@/types/userType';
import { Button, IconButton, TextField, styled } from '@mui/material';
import React from 'react';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Slider from '@mui/material/Slider';
import clsx from 'clsx';

export interface IUpdateInfoFormProps {
    infoData: IUserInfo;
    handleChangeValue: (e: any) => void;
    handleChangeGender: (gender: 1 | 2) => void;
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
    infoData,
    handleChangeValue,
    handleChangeGender,
}: IUpdateInfoFormProps) {
    const handleChangeAge = (e: any) => {
        const currentYear = new Date().getFullYear();

        // Tính năm sinh
        const birthYear = currentYear - parseInt(e.target.value);
        console.log('birthYear: ', birthYear);
    };

    const parseToAge = (year: number): number => {
        const currentYear = new Date().getFullYear();

        return currentYear - year;
    };

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
                            type="number"
                            name="exerciseIntensity"
                            variant="standard"
                            onChange={(e) => handleChangeValue(e)}
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
                        className="w-full rounded"
                        name="fullname"
                        label="Tên đầy đủ"
                        variant="outlined"
                    />
                </div>
                <div className="w-full center gap-4 my-8">
                    <div className="flex-1">
                        <button
                            name="gender"
                            className={clsx(
                                'center flex-col gap-3 p-4 h-32 w-full rounded bg-gray-100 text-gray-400',
                                infoData.gender === 1
                                    ? '!text-boldGreen font-bold bg-lightgreen'
                                    : '',
                            )}
                            value={1}
                            onClick={() => handleChangeGender(1)}
                        >
                            <MaleIcon className="text-[60px]" />
                            <p className="text-lg">Nam</p>
                        </button>
                    </div>
                    <div className="flex-1">
                        <button
                            name="gender"
                            className={clsx(
                                'center flex-col gap-3 p-4 h-32 w-full rounded bg-gray-100 text-gray-400',
                                infoData.gender === 2
                                    ? '!text-boldGreen font-bold bg-lightgreen'
                                    : '',
                            )}
                            value={2}
                            onClick={() => handleChangeGender(2)}
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
                                    defaultValue={160}
                                    valueLabelDisplay="on"
                                    name="height"
                                    onChange={(e) => handleChangeValue(e)}
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
                                    value={infoData.weight}
                                    name="weight"
                                    className="text-center text-xl md:text-2xl text-boldGreen font-semibold bg-transparent w-10 md:w-14 h-10 md:h-14"
                                    type="number"
                                    onChange={(e) => handleChangeValue(e)}
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
                                    value={parseToAge(infoData.birthYear)}
                                    className="text-center text-xl md:text-2xl text-boldGreen font-semibold bg-transparent w-10 md:w-14 h-10 md:h-14"
                                    type="number"
                                    onChange={(e) => handleChangeAge(e)}
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
            <div className="center mt-6 w-full">
                <Button
                    className="bg-boldGreen text-white hover:bg-boldGreen rounded-2xl w-full py-2"
                    variant="contained"
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
