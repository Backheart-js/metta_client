'use client';

import * as React from 'react';
import LoadingModal from '@/components/LoadingModal/LoadingModal';
import { checkLoginStatus } from '@/middlewares/checkLogin.middleware';
import { useAppSelector } from '@/lib/hooks';

export interface IWrapperProps {
    children: React.ReactNode;
}

export default function Wrapper({ children }: IWrapperProps) {
    const { isProgress, text } = useAppSelector((state) => state.loading);

    React.useEffect(() => {
        (async () => {
            try {
                const { isLogin } = await checkLoginStatus();
                console.log(isLogin);
            } catch (error) {
                console.log('Lỗi: ', error);
            }
        })();
    }, []);

    return (
        <div>
            {children}
            <LoadingModal text={text} showing={isProgress} />
        </div>
    );
}
