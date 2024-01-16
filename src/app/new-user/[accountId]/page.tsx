'use client';

import UpdateInfoForm from '@/components/UpdateInfoForm/UpdateInfoForm';
import { IUserInfo } from '@/types/userType';
import auth from '@/utils/axios/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export interface INewUserProps {
    params: {
        accountId: string;
    };
}

export default function NewUser({ params }: INewUserProps) {
    const { accountId } = params;
    const router = useRouter();
    const [checkLogin, setCheckLogin] = useState(true);
    const [newUserInfo, setNewUserInfo] = useState<IUserInfo>({
        avatarUrl: '',
        fullname: '',
        gender: 1,
        birthYear: 0,
        exerciseIntensity: 3,
        weight: 0,
        height: 0,
    });

    const handleLogout = async () => {
        try {
            await auth.logout();
        } catch (error) {}
    };

    const handleChangeValue = (event: any) => {
        console.log(event.target.name);
        if (event.target.type === 'number' || event.target.name === 'gender') {
            setNewUserInfo((prev) => ({
                ...prev,
                [event.target.name]: parseInt(event.target.value),
            }));
        } else {
            setNewUserInfo((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
            }));
        }
    };

    const handleChangeGender = (value: 1 | 2) => {
        setNewUserInfo((prev) => ({
            ...prev,
            gender: value,
        }));
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await auth.checkFirstTime(accountId);

                if (res.status === 200) {
                    if (res.data.isFirstTime) {
                        setCheckLogin(false);
                    } else {
                        router.push('/home');
                    }
                }
            } catch (error) {
                // Use type assertion to inform TypeScript about the structure of the error object
                const responseError = error as { response: { status: number } };

                if (responseError.response.status === 404) {
                    router.push('/home');
                } else if (responseError.response.status === 401) {
                    router.push('/auth/login');
                }
            }
        })();
    }, []);

    return checkLogin ? (
        <div></div>
    ) : (
        <div className="container-sp min-h-screen w-screen bg-gray-100 md:bg-white center-y flex-col px-6 pb-10">
            <div className="mt-10 mb-2">
                <h1 className="text-center font-medium text-gray-600 text-3xl">
                    Thông tin về bạn
                </h1>
            </div>
            <UpdateInfoForm
                infoData={newUserInfo}
                handleChangeValue={handleChangeValue}
                handleChangeGender={handleChangeGender}
            ></UpdateInfoForm>
        </div>
    );
}
