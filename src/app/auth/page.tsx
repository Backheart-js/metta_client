'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import Banner from '../../assets/image/login-banner.png';
import './top.scss';
import auth from '@/utils/axios/auth';

interface IAuthProps {}

function Auth({}: IAuthProps) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    const handleNavigate = (link: string): void => {
        router.push(`/auth/${link}`);
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await auth.isLogin();

                if (res.status === 200) {
                    router.push(`/home`);
                }
            } catch (error) {
                setIsChecking(false);
            }
        })();
    }, []);

    return isChecking ? (
        <main className=""></main>
    ) : (
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
                                    className="bg-greenPrimary text-white w-[250px] h-14 rounded-[50px] font-semibold"
                                    variant="contained"
                                    onClick={() => handleNavigate('login')}
                                >
                                    Đăng nhập
                                </Button>
                            </div>
                            <div className="mt-4">
                                <Button
                                    className="w-[250px] h-14 text-greenPrimary rounded-[50px] font-semibold"
                                    variant="outlined"
                                    onClick={() => handleNavigate('signup')}
                                >
                                    Đăng ký
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Auth;
