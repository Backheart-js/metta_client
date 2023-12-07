'use client';
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            setError('Vui lòng nhập đầy đủ email và mật khẩu.');
        } else {
            // Xử lý đăng nhập thành công
            setError('');
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
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                    >
                        Đăng nhập
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default LoginForm;
