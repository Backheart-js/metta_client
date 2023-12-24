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
import auth from '@/utils/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface IFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function SignupForm() {
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
            }
        } catch (error) {
            const { status, data } = error.response;
            if (status === 409) {
                setErrorMessage(
                    'Email đã tồn tại, vui lòng sử dụng email khác!',
                );
            } else if (status === 401) {
                setErrorMessage('Mật khẩu không đúng, vui lòng thử lại!');
            } else if (status === 500) {
                console.assert('Có lỗi xảy ra');
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
                        className="bg-greenPrimary mt-4"
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
                </form>
            </div>
        </Container>
    );
}

export default SignupForm;
