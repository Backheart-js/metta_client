'use client';
import React from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    InputBase,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    alpha,
    styled,
} from '@mui/material';
import { NotificationsNoneOutlined } from '@mui/icons-material';
import Search from '../../Search/Search';
import { useAppSelector } from '@/lib/hooks';

function MobileHeader() {
    const isLogin = useAppSelector((state) => state.auth.isLoginState);

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#fff',
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <div className="flex justify-between w-full">
                        <div className="center w-[80px] text-black">Logo</div>
                        {isLogin ? (
                            <div className="center">
                                <IconButton className="center p-2">
                                    <NotificationsNoneOutlined
                                        style={{ fontSize: 20, color: '#666' }}
                                    />
                                </IconButton>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button
                                    className="bg-boldGreen rounded-2xl"
                                    variant="contained"
                                >
                                    Đăng nhập
                                </Button>
                                <Button
                                    className="rounded-2xl text-boldGreen"
                                    variant="text"
                                >
                                    Đăng ký
                                </Button>
                            </div>
                        )}
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default MobileHeader;
