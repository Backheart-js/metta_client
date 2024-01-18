'use client';

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { Button, Checkbox, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './Planning.module.scss';
import clsx from 'clsx';
import CusDrawer from '@/components/Drawer/Drawer';
import DrawerContent from './DrawerContent';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import LocalDrinkOutlinedIcon from '@mui/icons-material/LocalDrinkOutlined';
import InvertColorsOutlinedIcon from '@mui/icons-material/InvertColorsOutlined';
import AccessAlarmsOutlinedIcon from '@mui/icons-material/AccessAlarmsOutlined';
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';

// Icon nhắc tập luyện
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

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
            setIsOpenDrawer(open);
            setDrawerPos({ ...drawerPos, [anchor]: open });
        };

    // Định dạng ngày theo yêu cầu
    const formattedDate = currentDate.format('dddd, D [tháng] M');

    useEffect(() => {
        return () => {};
    }, []);

    return (
        <div
            className={clsx(
                styles.container,
                'pt-4 md:pt-0 container-sp px-3 sm:px-4 flex flex-col gap-6 bg-lightgreen',
            )}
        >
            <section className="pt-4">
                <div className="center-y justify-between">
                    <h1 className="text-3xl font-bold my-0 uppercase text-gray-700">
                        Lịch của tôi
                    </h1>
                    <div>
                        <IconButton
                            size="large"
                            onClick={toggle('bottom', true)}
                        >
                            <AddIcon className="text-gray-700 text-4xl" />
                        </IconButton>
                    </div>
                </div>
                <p className="uppercase text-gray-600 font-medium">
                    {formattedDate}
                </p>
            </section>
            <section className="flex-grow mt-2">
                {dataScheduleList.length !== 0 ? (
                    <div className="center h-full">
                        {/* Thêm ảnh vào đấy */}
                        <p className="">Hiện chưa có mục nào</p>
                    </div>
                ) : (
                    <div className="">
                        <div className="">
                            <h2 className={clsx(styles.title, '')}>Kế hoạch</h2>
                            <div className="mt-5">
                                <div
                                    className={clsx(
                                        styles.remind__card,
                                        'center rounded-lg bg-gray-900 h-16 w-full',
                                    )}
                                >
                                    <div className="w-14 h-full center">
                                        <CalendarTodayOutlinedIcon className="text-gray-300 text-2xl" />
                                    </div>
                                    <div className="flex-grow pr-2 py-2">
                                        <div className="center-y mb-2">
                                            <div className="">
                                                <p className="text-gray-300 font-medium text-lg leading-[100%]">
                                                    Kế hoạch giảm cân để đón tết
                                                </p>
                                            </div>
                                        </div>
                                        <div className="center-y">
                                            <div
                                                className={clsx(
                                                    styles.card__optionWrapper,
                                                )}
                                            >
                                                <CalendarTodayOutlinedIcon className="text-sm text-gray-400" />
                                                <p className="text-sm text-gray-400 mr-1 leading-[100%]">
                                                    Th
                                                </p>
                                                <p className="text-sm text-gray-400 leading-[100%]">
                                                    2, 3, CN
                                                </p>
                                            </div>
                                            <div
                                                className={clsx(
                                                    styles.card__optionWrapper,
                                                )}
                                            >
                                                <NotificationsActiveOutlinedIcon className="text-sm text-gray-400" />
                                                <p className="text-sm text-gray-400 leading-[100%]">
                                                    04:00 PM
                                                </p>
                                            </div>
                                            <div
                                                className={clsx(
                                                    styles.card__optionWrapper,
                                                )}
                                            >
                                                <StickyNote2OutlinedIcon className="text-sm text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h2 className={clsx(styles.title, '')}>Lời nhắc</h2>
                            <div className="mt-5">
                                <div
                                    className={clsx(
                                        styles.remind__card,
                                        'center rounded-lg bg-gray-900 h-16 w-full',
                                    )}
                                >
                                    <div className="w-14 h-full center">
                                        <FitnessCenterOutlinedIcon className="text-gray-300 text-2xl" />
                                    </div>
                                    <div className="flex-grow pr-2 py-2">
                                        <div className="center-y mb-2">
                                            <div className="">
                                                <p className="text-gray-300 font-medium text-lg leading-[100%]">
                                                    Nhắc tập thể dục
                                                </p>
                                            </div>
                                        </div>
                                        <div className="center-y">
                                            <div
                                                className={clsx(
                                                    styles.card__optionWrapper,
                                                )}
                                            >
                                                <CalendarTodayOutlinedIcon className="text-sm text-gray-400" />
                                                <p className="text-sm text-gray-400 mr-1 leading-[100%]">
                                                    Th
                                                </p>
                                                <p className="text-sm text-gray-400 leading-[100%]">
                                                    2, 3, CN
                                                </p>
                                            </div>
                                            <div
                                                className={clsx(
                                                    styles.card__optionWrapper,
                                                )}
                                            >
                                                <NotificationsActiveOutlinedIcon className="text-sm text-gray-400" />
                                                <p className="text-sm text-gray-400 leading-[100%]">
                                                    04:00 PM
                                                </p>
                                            </div>
                                            <div
                                                className={clsx(
                                                    styles.card__optionWrapper,
                                                )}
                                            >
                                                <StickyNote2OutlinedIcon className="text-sm text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={clsx(
                                        styles.remind__card,
                                        'center rounded-lg bg-gray-900 h-16 w-full',
                                    )}
                                >
                                    <div className="w-14 h-full center">
                                        <LocalDrinkOutlinedIcon className="text-gray-300 text-2xl" />
                                    </div>
                                    <div className="flex-grow pr-2 py-2">
                                        <div className="center-y mb-2">
                                            <div className="">
                                                <p className="text-gray-300 font-medium text-lg leading-[100%]">
                                                    Nhắc uống đủ nước
                                                </p>
                                            </div>
                                        </div>
                                        <div className="center-y">
                                            <div
                                                className={clsx(
                                                    styles.card__optionWrapper,
                                                )}
                                            >
                                                <InvertColorsOutlinedIcon className="text-sm text-gray-400" />
                                                <p className="text-sm text-gray-400 leading-[100%]">
                                                    2200 ml
                                                </p>
                                            </div>
                                            <div
                                                className={clsx(
                                                    styles.card__optionWrapper,
                                                )}
                                            >
                                                <DirectionsRunOutlinedIcon className="text-sm text-gray-400" />
                                                <p className="text-sm text-gray-400 leading-[100%]">
                                                    07:00 - 22:00
                                                </p>
                                            </div>
                                            <div
                                                className={clsx(
                                                    styles.card__optionWrapper,
                                                )}
                                            >
                                                <AccessAlarmsOutlinedIcon className="text-sm text-gray-400" />
                                                <p className="text-sm text-gray-400 leading-[100%]">
                                                    30p
                                                </p>
                                            </div>
                                            <div
                                                className={clsx(
                                                    styles.card__optionWrapper,
                                                )}
                                            >
                                                <StickyNote2OutlinedIcon className="text-sm text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <CusDrawer
                anchor={anchor}
                isOpen={isOpenDrawer}
                toggleDrawer={toggle}
            >
                <DrawerContent onCloseDrawer={() => setIsOpenDrawer(false)} />
            </CusDrawer>
        </div>
    );
}
