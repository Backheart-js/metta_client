'use client';

import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

export interface IVerifyAccountProps {}

export default function VerifyAccount(props: IVerifyAccountProps) {
    const [countdown, setCountdown] = useState(60);
    const [showButton, setShowButton] = useState(false);
    let intervalId = useRef<NodeJS.Timeout | null>(null);

    const sendVerifyAccount = async () => {};

    const handleResendBtn = () => {
        sendVerifyAccount();
        setCountdown(60);
        setShowButton(false);

        // Start the countdown when the button is clicked
        intervalId.current = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
    };

    useEffect(() => {
        // Clear the interval and show the button when countdown reaches 0
        if (countdown === 0 && intervalId.current !== null) {
            clearInterval(intervalId.current);
            intervalId.current = null;
            setShowButton(true);
        }

        return () => {
            // Clear the interval on component unmount
            if (intervalId.current !== null) {
                clearInterval(intervalId.current);
            }
        };
    }, [countdown]);

    useEffect(() => {
        sendVerifyAccount();
    }, []);

    return (
        <div className="relative container-sp center h-screen bg-white rounded py-4 flex flex-col items-center px-4">
            <div className=""></div>
            <p className="font-semibold text-gray-700 text-lg text-center w-full md:w-[85%]">
                Chúng tôi đã gửi đường dẫn xác minh tới thư điện tử của bạn, vui
                lòng kiểm tra hòm thư hoặc thư rác
            </p>
            <p className="font-medium text-gray-600 text-sm my-2">
                Chưa nhận được email xác minh?
            </p>
            <div className="my-4 flex justify-center items-center text-gray-700 font-semibold w-[50px] h-[50px] rounded-full">
                <p className="text-3xl">{countdown}</p>
            </div>
            <Button
                disabled={!showButton}
                variant="contained"
                className={`px-4 py-2 w-[250px] font-semibold rounded-2xl bg-boldGreen text-white ${
                    !showButton ? 'opacity-60 cursor-default' : ''
                }`}
                onClick={handleResendBtn}
            >
                Gửi lại
            </Button>

            <a href="/login" className="mt-14">
                <Button
                    variant="outlined"
                    className="text-[13px] w-[250px] font-semibold rounded-2xl text-gray-500"
                >
                    Quay lại đăng nhập
                </Button>
            </a>
        </div>
    );
}
