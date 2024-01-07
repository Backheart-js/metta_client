'use client';

import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './Planning.module.scss';
import clsx from 'clsx';
import CusDrawer from '@/components/Drawer/Drawer';
import DrawerContent from './DrawerContent';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export interface IPlanningProps {}

export default function Planning(props: IPlanningProps) {
    const currentDate = moment();
    const [dataScheduleList, setDataScheduleList] = useState([]);
    const [drawerPos, setDrawerPos] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
    const [anchor, setAnchor] = useState<Anchor>('bottom');

    const toggle =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            console.log('call');
            setIsOpenDrawer(open);
            setDrawerPos({ ...drawerPos, [anchor]: open });
        };

    // Định dạng ngày theo yêu cầu
    const formattedDate = currentDate.format('dddd, D [tháng] M');

    return (
        <div
            className={clsx(
                styles.container,
                'pt-14 md:pt-0 container-sp px-3 sm:px-4 flex flex-col gap-6 bg-lightgreen',
            )}
        >
            <section className="pt-4">
                <div className="mb-2">
                    <h1 className="text-2xl font-bold my-0 uppercase text-gray-700">
                        Kế hoạch của tôi
                    </h1>
                </div>
                <p className="uppercase text-gray-600">{formattedDate}</p>
            </section>
            <section className="flex-grow">
                {dataScheduleList.length === 0 ? (
                    <div className="center h-full">
                        {/* Thêm ảnh vào đấy */}
                        <p className="">Hiện chưa có mục nào</p>
                    </div>
                ) : (
                    <div className=""></div>
                )}
            </section>
            <section className="fixed bottom-[110px] right-6 center">
                {/* <Button
                    className="bg-black text-gray-50 text-left md:text-center rounded-full"
                    variant="contained"
                    startIcon={<AddIcon />}
                ></Button> */}
                <button
                    className="center w-14 h-14 rounded-full bg-black shadow-[rgba(0,0,0,0.5)_0px_5px_15px]"
                    onClick={toggle('bottom', true)}
                >
                    <AddIcon className="text-white text-2xl" />
                </button>
            </section>
            <CusDrawer
                anchor={anchor}
                isOpen={isOpenDrawer}
                toggleDrawer={toggle}
            >
                <DrawerContent />
            </CusDrawer>
        </div>
    );
}
