'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import clsx from 'clsx';

import Banner from '../../assets/image/login-banner.png';
import './top.scss';

function Top() {
    const [statusScreen, setStatusScreen] = useState(0);

    return (
        <main className="h-screen flex items-center">
            <div
                className={clsx(
                    'min-w-[400px] min-h-[650px] mx-auto shadow-2xl rounded-lg',
                    'top__background',
                )}
            >
                <div
                    className={clsx(
                        'flex justify-center items-center min-h-[650px]',
                        'top__form',
                    )}
                >
                    {statusScreen === 0 && (
                        <div className="top__main-form flex flex-col justify-center items-center">
                            <Image src={Banner} alt="Logo" />
                            <div className="mt-4">
                                <p className="text-2xl text-boldBlue font-bold">
                                    Metta heathcare
                                </p>
                            </div>
                            <div className="my-10">
                                <h1 className="text-xl text-[#221F1F] font-bold text-center">
                                    Let’s get started!
                                </h1>
                                <p className="text-base text-[#221F1F] font-light text-center">
                                    Login to Stay healthy and fit
                                </p>
                            </div>
                            <div className="">
                                <div className="">
                                    <Button
                                        className="bg-bluePrimary text-white w-[250px] h-14 rounded-[50px] font-semibold"
                                        variant="contained"
                                        onClick={() => setStatusScreen(1)}
                                    >
                                        Login
                                    </Button>
                                </div>
                                <div className="mt-4">
                                    <Button
                                        className="w-[250px] h-14 text-bluePrimary rounded-[50px] font-semibold"
                                        variant="outlined"
                                        onClick={() => setStatusScreen(2)}
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    {statusScreen === 1 && (
                        <form className="top__login-form"></form>
                    )}
                    {statusScreen === 2 && (
                        <form className="top__signup-form"></form>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Top;
