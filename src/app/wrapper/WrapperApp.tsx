'use client';

import * as React from 'react';
import StoreProvider from '../StoreProvider';
import LoadingModal from '@/components/LoadingModal/LoadingModal';
import { useSelector } from 'react-redux';

export interface IWrapperProps {
    children: React.ReactNode;
}

export default function Wrapper({ children }: IWrapperProps) {
    const { isProgress, text } = useSelector((state) => state.loading);

    return (
        <div>
            {children}
            <LoadingModal text={text} showing={isProgress} />
        </div>
    );
}
