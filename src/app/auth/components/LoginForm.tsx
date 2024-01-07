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
        try {
            setIsProgress(true);
            const res = await auth.login(data);

            if (res.status === 200) {
                localStorage.setItem('userId', res.data.userId);
                sessionStorage.setItem('isLogin', true.toString());
                setErrorMessage('');
                handleNavigate();
            }
        } catch (error) {
            // Handle error
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                const { status, data } = axiosError.response || {};
                if (status === 404) {
                    setErrorMessage('Email không đúng, vui lòng thử lại!');
                } else if (status === 401) {
                    setErrorMessage('Mật khẩu không đúng, vui lòng thử lại!');
                }
            } else {
                // Handle other types of errors
                console.error(error);
            }
        } finally {
            setIsProgress(false);
        }
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
