'use client';

import * as React from 'react';
import LoginForm from '../components/LoginForm';
import { useRouter } from 'next/navigation';
import '../top.scss';

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
    const router = useRouter();
    const navigateAfterLogin = () => {
        router.push('/home');
    };

    return (
        <div className="center h-screen">
            <LoginForm handleNavigate={navigateAfterLogin} />
        </div>
    );
}
