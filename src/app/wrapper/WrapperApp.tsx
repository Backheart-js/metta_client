'use client';

import * as React from 'react';
import StoreProvider from '../StoreProvider';
import LoadingModal from '@/components/LoadingModal/LoadingModal';
import { useSelector } from 'react-redux';
import { checkLoginStatus } from '@/middlewares/checkLogin.middleware';

export interface IWrapperProps {
    children: React.ReactNode;
}

export default function Wrapper({ children }: IWrapperProps) {
    const { isProgress, text } = useSelector((state) => state.loading);

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
