'use client';
import Search from '@/components/Search/Search';
import { category } from '@/types/category';
import { Avatar, Button, IconButton } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './PCHeader.module.scss';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import {
    AccountCircleOutlined,
    NotificationsNoneOutlined,
} from '@mui/icons-material';
import useSessionStorage from '@/hooks/useSessionStorage';
import Dropdown from '@/components/Dropdown/Dropdown';
import auth from '@/utils/axios/auth';

interface IPCHeaderProps {
    isLogin: boolean;
}

function PCHeader({ isLogin }: IPCHeaderProps) {
    const pathname = usePathname();
    const router = useRouter();
    const options = [
        { value: 'profile', label: 'Thông tin cá nhân' },
        { value: 'settings', label: 'Cài đặt' },
        { value: 'logout', label: 'Đăng xuất' },
    ];

    const handleLogout = async () => {
        try {
            const res = await auth.logout();
            if (res.status === 200) {
                sessionStorage.setItem('isLogin', false.toString());
                router.push('/auth');
            }
        } catch (error) {
            // Thông báo lỗi
        }
    };

    const handleSelectDropdown = (option: string): void => {
        switch (option) {
            case 'logout':
                handleLogout();
        }
    };

    return (
        <div className="">
            <header className="center-y justify-between h-[56px] px-6 bg-lightgreen">
                <div className="w-[120px]">
                    <Avatar
                        alt="Assistant"
                        src="/icon-256x256.png"
                        sx={{ width: 44, height: 44 }}
                    />
                </div>
                <div className="center-y justify-between container-sp">
                    {category.slice(0, -1).map((category, index) => {
                        const { Icon, path, short_text } = category;
                        const isActive = pathname?.includes(category.path);

                        return (
                            <div
                                className={clsx('h-full center-y')}
                                key={index}
                            >
                                <Link
                                    className="center h-[48px] w-[120px] rounded-lg transition-all"
                                    href={path}
                                    prefetch
                                >
                                    <Icon
                                        className={clsx(
                                            isActive
                                                ? 'text-boldGreen text-4xl'
                                                : 'text-black',
                                            'text-3xl',
                                        )}
                                    />
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <div className="center gap-3">
                    {isLogin ? (
                        <>
                            <IconButton aria-label="noti">
                                <NotificationsNoneOutlined
                                    style={{ fontSize: 28, color: '#555' }}
                                />
                            </IconButton>
                            <Dropdown
                                options={options}
                                onSelect={handleSelectDropdown}
                            >
                                <IconButton aria-label="profile">
                                    <AccountCircleOutlined
                                        style={{ fontSize: 28, color: '#555' }}
                                    />
                                </IconButton>
                            </Dropdown>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                className="bg-greenPrimary"
                                onClick={() => router.push('/auth')}
                            >
                                Đăng nhập
                            </Button>
                            <Button
                                variant="outlined"
                                className="text-greenPrimary"
                            >
                                Đăng ký
                            </Button>
                        </>
                    )}
                </div>
            </header>
        </div>
    );
}

export default PCHeader;
