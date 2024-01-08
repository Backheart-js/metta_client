import { IconButton } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@/components/Dialog/Dialog';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

export interface INotiContentProps {}

export default function NotiContent({}: INotiContentProps) {
    const [amountWater, setAmountWarter] = useState<number>(2000);
    const [isOpenTimePicker, setIsOpenTimePicker] = useState<boolean>(false);

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

    const handleOpenTimePicker = (): void => {
        setIsOpenTimePicker(true);
    };

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
                        >
                            <RemoveIcon />
                        </IconButton>
                        <div className="border-gray-400 rounded-3xl w-16 overflow-hidden">
                            <input
                                value={amountWater}
                                className="bg-gray-100 w-full h-full text-center text-lg font-normal text-gray-700"
                                type="text"
                            />
                        </div>
                        <IconButton
                            aria-label="add"
                            size="large"
                            onClick={addWater}
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
                            onClick={handleOpenTimePicker}
                        >
                            {amountWater}
                        </button>
                        <div className="w-fit text-lg font-normal text-gray-600">
                            -
                        </div>
                        <button
                            className="text-center text-lg font-normal w-16 bg-white !border-[1px_solid_#999] center h-8 rounded-3xl overflow-hidden"
                            onClick={handleOpenTimePicker}
                        >
                            {amountWater}
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
                                value={amountWater}
                                className="bg-gray-100 w-full h-full text-center text-lg font-normal text-gray-700"
                                type="text"
                            />
                        </div>
                        <p className="ml-1 font-medium text-base text-gray-500">
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
                            defaultValue={dayjs('2022-04-17T15:30')}
                        />
                    </div>
                </Dialog>
            </div>
        </LocalizationProvider>
    );
}
