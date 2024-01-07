import { Backdrop, Box, CircularProgress } from '@mui/material';
import clsx from 'clsx';
import React from 'react';

type Props = {
    text: string;
    showing: boolean;
};

const LoadingModal = (props: Props) => {
    const { text, showing } = props;

    return (
        <div
            className={clsx(
                showing ? 'center' : 'hidden',
                'fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50',
            )}
        >
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 9,
                }}
                open={showing}
            >
                <CircularProgress color="inherit" />
                <p className="mt-5 text-greenPrimary text-xl text-center font-semibold">
                    {text}
                </p>
            </Backdrop>
        </div>
    );
};

export default LoadingModal;
