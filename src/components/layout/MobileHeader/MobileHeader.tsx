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

function MobileHeader() {
    return (
        <AppBar
            position="static"
            sx={{ backgroundColor: 'transparent', boxShadow: 'unset' }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <div className="flex justify-between w-full">
                        <div className="center w-[80px] text-black">Logo</div>
                        <div className="flex items-center gap-2">
                            <button className="center p-2">
                                <NotificationsNoneOutlined
                                    style={{ fontSize: 20, color: '#666' }}
                                />
                            </button>
                        </div>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default MobileHeader;
