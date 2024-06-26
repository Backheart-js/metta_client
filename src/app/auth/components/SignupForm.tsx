import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    CircularProgress,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ISignupData } from '@/types/authType';
import auth from '@/utils/axios/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface IFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function SignupForm() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [isProgress, setIsProgress] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Vui lòng nhập tên người dùng'),
        email: Yup.string()
            .email('Email không hợp lệ')
            .required('Vui lòng nhập email'),
        password: Yup.string()
            .required('Vui lòng nhập mật khẩu')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/,
                'Mật khẩu không hợp lệ',
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Mật khẩu xác nhận không hợp lệ')
            .required('Vui lòng xác nhận mật khẩu'),
    });

    const formik = useFormik<IFormData>({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values: IFormData) => {
            const { confirmPassword, ...neededData } = values;
            handleSignup(neededData);
        },
    });

    const handleSignup = async function (data: ISignupData) {
        try {
            setIsProgress(true);
            const res = await auth.signup(data);

            if (res.status === 201) {
                setErrorMessage('');
                router.push('/auth/verify-account');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                const { status, data } = axiosError.response || {};
                if (status === 409) {
                    setErrorMessage(
                        'Email đã tồn tại, vui lòng sử dụng email khác!',
                    );
                } else if (status === 401) {
                    setErrorMessage('Mật khẩu không đúng, vui lòng thử lại!');
                } else if (status === 500) {
                    console.assert('Có lỗi xảy ra');
                }
            } else {
                console.error(error);
            }
        } finally {
            setIsProgress(false);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <Typography component="h1" variant="h5">
                    Đăng ký
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Tên người dùng"
                        autoComplete="name"
                        autoFocus
                        {...formik.getFieldProps('username')}
                        error={
                            formik.touched.username &&
                            Boolean(formik.errors.username)
                        }
                        helperText={
                            formik.touched.username && formik.errors.username
                        }
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        autoComplete="email"
                        {...formik.getFieldProps('email')}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Mật khẩu"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        {...formik.getFieldProps('password')}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div className="mb-2">
                        <p className="text-gray-500 font-semibold text-xs">
                            Độ dài từ 8-24 ký tự, chứa ít nhất 1 chữ hoa, chữ
                            thường và số
                        </p>
                    </div>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Nhập lại mật khẩu"
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        {...formik.getFieldProps('confirmPassword')}
                        error={
                            formik.touched.confirmPassword &&
                            Boolean(formik.errors.confirmPassword)
                        }
                        helperText={
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowConfirmPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {errorMessage && formik.isValid && (
                        <Typography color="error">{errorMessage}</Typography>
                    )}
                    <Button
                        className="bg-boldGreen text-white mt-4 rounded-2xl"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        {isProgress ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Đăng ký'
                        )}
                    </Button>
                    <div className="my-5 center gap-3">
                        <div className="border-b-[1px] w-20 border-gray-400"></div>
                        <div className="text-gray-500">Hoặc</div>
                        <div className="border-b-[1px] w-20 border-gray-400"></div>
                    </div>
                    <div className="center">
                        <Link
                            className="text-blue-500 underline"
                            href={'/auth/login'}
                        >
                            Đăng nhập
                        </Link>
                    </div>
                </form>
            </div>
        </Container>
    );
}

export default SignupForm;
