'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { ILoginData } from '@/types/authType';
import auth from '@/utils/auth';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!email || !password) {
            setError('Vui lòng nhập đầy đủ email và mật khẩu.');
        } else {
            // Xử lý đăng nhập thành công
            const dataForm = {
                email,
                password,
            };
            handleLogin(dataForm);
        }
    };

    const handleLogin = async (data: ILoginData) => {
        try {
            const res = await auth.login(data);
            console.log('login res: ', res);
            setError('');
        } catch (error) {
            setError('Đăng nhập không thành công');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <Typography component="h1" variant="h5">
                    Đăng nhập
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        className="bg-bluePrimary mt-4"
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Đăng nhập
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default LoginForm;
