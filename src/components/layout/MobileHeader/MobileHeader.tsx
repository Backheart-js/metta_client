'use client';
import React from 'react';
import { Button } from '@mui/material';

function MobileHeader() {
    return (
        <div className="flex justify-between w-full">
            <div className="center w-[80px] text-black">Logo</div>

            <div className="flex items-center gap-2">
                <Button
                    className="bg-boldGreen rounded-2xl"
                    variant="contained"
                >
                    Đăng nhập
                </Button>
                <Button className="rounded-2xl text-boldGreen" variant="text">
                    Đăng ký
                </Button>
            </div>
        </div>
    );
}

export default MobileHeader;
