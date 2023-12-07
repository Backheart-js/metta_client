import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

function SignupForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = () => {
        // Kiểm tra điều kiện đăng ký ở đây
        if (!fullName || !email || !password || !confirmPassword) {
            setError('Vui lòng điền đầy đủ thông tin.');
        } else if (password !== confirmPassword) {
            setError('Mật khẩu và xác nhận mật khẩu không khớp.');
        } else {
            // Xử lý đăng ký thành công
            setError('');
            console.log('Đăng ký thành công!');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <Typography component="h1" variant="h5">
                    Đăng ký
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="fullName"
                        label="Họ và tên"
                        name="fullName"
                        autoComplete="name"
                        autoFocus
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
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
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="confirmPassword"
                        label="Nhập lại mật khẩu"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSignup}
                    >
                        Đăng ký
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default SignupForm;
