'use client';
import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    CircularProgress,
} from '@mui/material';
import { ILoginData } from '@/types/authType';
import auth from '@/utils/axios/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';

interface ILoginForm {
    handleNavigate: () => void;
}

function LoginForm({ handleNavigate }: ILoginForm) {
    const [errorMessage, setErrorMessage] = useState('');
    const [isProgress, setIsProgress] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email không hợp lệ')
            .required('Vui lòng nhập email'),
        password: Yup.string().required('Vui lòng nhập mật khẩu'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            handleLogin(values);
        },
    });

    const handleLogin = async (data: ILoginData) => {
        setIsProgress(true);

        const res = await signIn('credentials', {
            redirect: false,
            email: formik.values.email,
            password: formik.values.password,
            callbackUrl: '/',
        });

        if (!res?.error) {
            setErrorMessage('');
            handleNavigate();
        } else {
            setErrorMessage(
                'Email hoặc mật khẩu không đúng hoặc cả 2 sai hoặc có lỗi gì đó xảy ra',
            );
        }
        setIsProgress(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <Typography component="h1" variant="h5">
                    Đăng nhập
                </Typography>
                <form>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                    />
                    {errorMessage && formik.isValid && (
                        <Typography color="error">{errorMessage}</Typography>
                    )}
                    <Button
                        className="bg-greenPrimary mt-4"
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!formik.isValid}
                        onClick={() => formik.handleSubmit()}
                    >
                        {isProgress ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Đăng nhập'
                        )}
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default LoginForm;
