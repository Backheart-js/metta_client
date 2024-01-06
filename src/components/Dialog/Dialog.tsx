'use client';

import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #999',
    boxShadow: 24,
    px: 2,
    py: 3,
};

export interface IDialogProps {
    children: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
}

export default function Dialog({
    children,
    isOpen,
    handleClose,
}: IDialogProps) {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isOpen}>
                <Box sx={style} className="rounded-md">
                    <div className="relative">
                        <div className="center absolute right-0 top-[-12px]">
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        {children}
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}
