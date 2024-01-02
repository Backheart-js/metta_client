'use client';
import Search from '@/components/Search/Search';
import { category } from '@/types/category';
import { Button, IconButton } from '@mui/material';
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

function PCHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const isLoginFromSession = useSessionStorage('isLogin');
    const [isLogin, setIsLogin] = useState<boolean>(isLoginFromSession);
    const options = [{ value: 'logout', label: 'Đăng xuất' }];

    const handleLogout = async () => {
        try {
            const res = await auth.logout();
            console.log('log: ', res);
            if (res.status === 200) {
                sessionStorage.setItem('isLogin', false.toString());
                setIsLogin(false);
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

    useEffect(() => {
        setIsLogin(isLoginFromSession);
    }, [isLoginFromSession]);

    return (
        <div className="">
            <header className="center-y justify-between h-[54px] px-6 border-b-2 border-borderLightTheme">
                <div className="w-[120px]">Logo</div>
                <div className="w-[300px]">
                    <Search />
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
            <nav className="center w-full px-6 pt-2 gap-10 bg-greenPrimary">
                {category.map((category, index) => {
                    const { Icon, path, short_text } = category;
                    const isActive = pathname.includes(category.path);

                    return (
                        <div
                            className={clsx(
                                isActive ? styles.active : null,
                                styles.category_item,
                                'h-[62px] center-y',
                            )}
                            key={index}
                        >
                            <Link
                                className="flex flex-col justify-center min-w-[80px]"
                                href={path}
                            >
                                <div className="center">
                                    <Icon
                                        style={
                                            isActive
                                                ? { color: '#111' }
                                                : { color: '#fff' }
                                        }
                                    />
                                </div>
                                <div className="center mt-1 mb-2">
                                    <p
                                        className={clsx(
                                            isActive
                                                ? 'text-[#111]'
                                                : 'text-white',
                                            'text-sm',
                                        )}
                                    >
                                        {short_text}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}

export default PCHeader;
