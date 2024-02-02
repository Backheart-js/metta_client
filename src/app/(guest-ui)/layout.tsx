'use client';

import MobileHeader from '@/components/layout/MobileHeader/MobileHeader';
import UserLayout from '../(user-ui)/layout';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import clsx from 'clsx';
import styles from './GuestStyles.module.scss';

export default function GuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isLogin = false;
    const [showTable, setShowTable] = useState<boolean>(true);

    return isLogin ? (
        <UserLayout>{children}</UserLayout>
    ) : (
        <div className={clsx(styles.wrapper, 'bg-gray-100')}>
            <MobileHeader />
            <main className={clsx(styles.content, 'mt-14')}>{children}</main>
            {!isLogin && showTable && (
                <div
                    className="fixed bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.8)] z-10"
                    style={{ backdropFilter: 'blur(10px)' }}
                >
                    <div className="pt-4 md:flex">
                        <div className="w-full center">
                            <div className="w-[80%] center-x flex-col gap-2">
                                <div className="center-y justify-between">
                                    <h3 className="text-white text-sm mb-0">
                                        Đăng nhập vào MettaCare
                                    </h3>
                                    <div className="md:absolute md:right-0">
                                        <IconButton
                                            size="small"
                                            className="text-gray-300"
                                            onClick={() => setShowTable(false)}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-100">
                                    Đăng nhập để sử dụng những tiện ích chăm sóc
                                    và nâng cao sức khỏe toàn diện từ MettaCare
                                </p>
                            </div>
                        </div>
                        <div className="center flex-col gap-2 w-full mt-4 mb-2">
                            <Button
                                className="bg-boldGreen rounded-2xl w-[80%]"
                                variant="contained"
                            >
                                Đăng nhập
                            </Button>
                            <Button
                                className="rounded-2xl w-[80%] text-boldGreen"
                                variant="text"
                            >
                                Đăng ký
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
