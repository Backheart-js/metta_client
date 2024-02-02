import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export interface ICusDrawerProps {
    anchor: Anchor;
    isOpen: boolean;
    children: React.ReactNode;
    toggleDrawer: (
        anchor: Anchor,
        isOpen: boolean,
    ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function CusDrawer({
    anchor,
    isOpen,
    children,
    toggleDrawer,
}: ICusDrawerProps) {
    return (
        <div>
            <SwipeableDrawer
                anchor={anchor}
                open={isOpen}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
            >
                <Box
                    sx={{
                        width:
                            anchor === 'top' || anchor === 'bottom'
                                ? 'auto'
                                : 250,
                    }}
                    role="presentation"
                >
                    {children}
                </Box>
            </SwipeableDrawer>
        </div>
    );
}
