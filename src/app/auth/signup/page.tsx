'use client';

import * as React from 'react';
import SignupForm from '../components/SignupForm';
import '../top.scss';

export interface ISignupProps {}

export default function Signup(props: ISignupProps) {
    return (
        <div className="h-screen center">
            <SignupForm />
        </div>
    );
}
