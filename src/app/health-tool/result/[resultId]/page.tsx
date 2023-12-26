'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export interface IResultProps {}

export default function Result({}: IResultProps) {
    const router = useRouter();

    useEffect(() => {
        return () => {};
    }, []);

    return <div></div>;
}
