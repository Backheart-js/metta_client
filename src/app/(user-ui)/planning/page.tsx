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
import {
    registerPushNotifications,
    unregisterPushNotifications,
} from '@/utils/notifications/pushService';
import exerciseReminderSync from '@/utils/axios/exerciseReminder';
import { IWaterReminder, IExerciseReminder } from '@/types/reminderType';
import { useRouter } from 'next/navigation';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import planningSync from '@/utils/axios/planning';
import { IFullyPlanningData } from '@/types/planning';
import dayjs from 'dayjs';

type Anchor = 'top' | 'left' | 'bottom' | 'right';
interface IThuMap {
    [key: number]: string;
}
export interface IPlanningProps {}

export default function Planning(props: IPlanningProps) {
    const router = useRouter();
    const currentDate = moment();
    const [dataPlanningList, setDataPlanningList] = useState<
        IFullyPlanningData[]
    >([
        {
            _id: '',
            title: '',
            startTime: new Date(),
            endTime: new Date(),
            status: 0,
        },
    ]);
    const [dataWaterReminder, setDataWaterReminder] = useState<IWaterReminder>({
        amountWaterPerTime: 0,
        createdAt: '',
        endTime: '',
        interval: 0,
        note: '',
        remindTime: [''],
        startTime: '',
        updateAt: '',
        waterAmount: 0,
    });
    const [dataExerciseReminder, setDataExerciseReminder] = useState<
        IExerciseReminder[]
    >([
        {
            note: '',
            remindTime: '',
            repeat: [0],
        },
    ]);
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

    function sapXepMang(mang: number[]) {
        const mangDaSapXep = [...mang];

        mangDaSapXep.sort((a, b) => {
            if (a === 0) return 1; // Đặt giá trị 0 xuống cuối mảng
            if (b === 0) return -1; // Đặt giá trị 0 xuống cuối mảng
            return a - b;
        });

        return mangDaSapXep;
    }

    const formatRepeat = (repeat: number[]): string => {
        if (repeat.length === 7) {
            return 'Cả tuần';
        }
        if (repeat.length === 1 && repeat.includes(0)) {
            return 'Chủ nhật';
        }
        const thuMap: IThuMap = {
            1: '2',
            2: '3',
            3: '4',
            4: '5',
            5: '6',
            6: '7',
            0: 'CN',
        };
        const softArray = sapXepMang(repeat);
        const formatArr = softArray.map((date) => {
            return thuMap[date];
        });

        return 'Th ' + formatArr.join(', ');
    };

    const checkEmptyData = (): boolean => {
        return !(
            !!dataWaterReminder &&
            !!dataExerciseReminder &&
            dataPlanningList.length === 0
        );
    };

    const showDialogQAPlanning = (): boolean => {
        return true;
    };

    const fetchData = async () => {
        const reminderData = await exerciseReminderSync.getAllReminders();
        const planningData = await planningSync.getAll();
        setDataExerciseReminder(reminderData.data.exerciseReminder);
        setDataWaterReminder(reminderData.data.waterReminder);

        if (planningData.data.results.length > 0) {
            sessionStorage.setItem(
                'dataPlanning',
                JSON.stringify(planningData.data.results),
            );
            setDataPlanningList(planningData.data.results);
        }

        if (reminderData.data.exerciseReminder) {
            sessionStorage.setItem(
                'dataExerciseReminder',
                JSON.stringify(reminderData.data.exerciseReminder),
            );
            setDataExerciseReminder(reminderData.data.exerciseReminder);
        }
        if (reminderData.data.waterReminder) {
            sessionStorage.setItem(
                'dataWaterReminder',
                JSON.stringify(reminderData.data.waterReminder),
            );
            setDataWaterReminder(reminderData.data.waterReminder);
        }
    };

    useEffect(() => {
        const dataPlanning = JSON.parse(
            sessionStorage.getItem('dataPlanning') || 'null',
        );
        const dataExerciseFromStorage = JSON.parse(
            sessionStorage.getItem('dataExerciseReminder') || 'null',
        );
        const dataWaterFromStorage = JSON.parse(
            sessionStorage.getItem('dataWaterReminder') || 'null',
        );

        if (!dataWaterFromStorage || !dataExerciseFromStorage) {
            fetchData();
        } else {
            setDataPlanningList(dataPlanning);
            setDataExerciseReminder(dataExerciseFromStorage);
            setDataWaterReminder(dataWaterFromStorage);
        }

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
                    <h1 className="text-3xl md:text-2xl font-bold my-0 uppercase text-gray-700">
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
                <div className="">
                    <div className="">
                        <div className="center-y justify-between">
                            <h2 className={clsx(styles.title, 'md:text-lg')}>
                                Kế hoạch
                            </h2>
                            <IconButton
                                aria-label="QA"
                                onClick={showDialogQAPlanning}
                            >
                                <HelpOutlinedIcon className="text-2xl text-boldGreen" />
                            </IconButton>
                        </div>
                        <div className="mt-5">
                            {dataPlanningList.length !== 0 ? (
                                dataPlanningList.map(
                                    (
                                        planningList: IFullyPlanningData,
                                        index,
                                    ) => (
                                        <div
                                            key={index}
                                            className={clsx(
                                                styles.remind__card,
                                                'center rounded-lg bg-gray-900 h-16 w-full',
                                            )}
                                        >
                                            <div className="w-14 h-full center">
                                                <CalendarTodayOutlinedIcon className="text-gray-300 text-2xl" />
                                            </div>
                                            <button
                                                className="flex-grow pr-2 py-2"
                                                onClick={() => {
                                                    router.push(
                                                        `/planning/${planningList._id}`,
                                                    );
                                                }}
                                            >
                                                <div className="center-y mb-2">
                                                    <div className="">
                                                        <p className="text-gray-300 font-medium text-lg leading-[100%]">
                                                            {planningList.title}
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
                                                        <div className="ml-1">
                                                            <p className="text-sm text-gray-400 leading-[100%]">
                                                                {dayjs(
                                                                    planningList.startTime,
                                                                ).format(
                                                                    'DD/MM/YYYY',
                                                                )}{' '}
                                                                -{' '}
                                                                {dayjs(
                                                                    planningList.endTime,
                                                                ).format(
                                                                    'DD/MM/YYYY',
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {planningList.note && (
                                                        <div
                                                            className={clsx(
                                                                styles.card__optionWrapper,
                                                            )}
                                                        >
                                                            <StickyNote2OutlinedIcon className="text-sm text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        </div>
                                    ),
                                )
                            ) : (
                                <div className=" center">
                                    <p className="">
                                        Hiện chưa có kế hoạch nào
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    {(dataExerciseReminder.length > 0 ||
                        dataWaterReminder?.createdAt) && (
                        <div className="mt-10">
                            <h2 className={clsx(styles.title, 'md:text-lg')}>
                                Lời nhắc
                            </h2>
                            <div className="mt-5">
                                {dataExerciseReminder[0]?.remindTime && (
                                    <div
                                        className={clsx(
                                            styles.remind__card,
                                            'center rounded-lg bg-gray-900 h-16 w-full',
                                        )}
                                    >
                                        <div className="w-14 h-full center">
                                            <FitnessCenterOutlinedIcon className="text-gray-300 text-2xl" />
                                        </div>
                                        <button
                                            className="flex-grow pr-2 py-2"
                                            onClick={() => {
                                                router.push(
                                                    '/reminder-detail/workout',
                                                );
                                            }}
                                        >
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
                                                    <p className="text-sm text-gray-400 leading-[100%]">
                                                        {formatRepeat(
                                                            dataExerciseReminder[0]
                                                                .repeat,
                                                        )}
                                                    </p>
                                                </div>
                                                <div
                                                    className={clsx(
                                                        styles.card__optionWrapper,
                                                    )}
                                                >
                                                    <NotificationsActiveOutlinedIcon className="text-sm text-gray-400" />
                                                    <p className="text-sm text-gray-400 leading-[100%]">
                                                        {
                                                            dataExerciseReminder[0]
                                                                ?.remindTime
                                                        }
                                                    </p>
                                                </div>
                                                {dataExerciseReminder[0]
                                                    .note && (
                                                    <div
                                                        className={clsx(
                                                            styles.card__optionWrapper,
                                                        )}
                                                    >
                                                        <StickyNote2OutlinedIcon className="text-sm text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                )}
                                {dataWaterReminder?.createdAt && (
                                    <div
                                        className={clsx(
                                            styles.remind__card,
                                            'center rounded-lg bg-gray-900 h-16 w-full',
                                        )}
                                    >
                                        <div className="w-14 h-full center">
                                            <LocalDrinkOutlinedIcon className="text-gray-300 text-2xl" />
                                        </div>
                                        <button
                                            className="flex-grow pr-2 py-2"
                                            onClick={() => {
                                                router.push(
                                                    '/reminder-detail/drink-water',
                                                );
                                            }}
                                        >
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
                                                        {
                                                            dataWaterReminder.waterAmount
                                                        }{' '}
                                                        ml
                                                    </p>
                                                </div>
                                                <div
                                                    className={clsx(
                                                        styles.card__optionWrapper,
                                                    )}
                                                >
                                                    <DirectionsRunOutlinedIcon className="text-sm text-gray-400" />
                                                    <p className="text-sm text-gray-400 leading-[100%]">
                                                        {
                                                            dataWaterReminder.startTime
                                                        }{' '}
                                                        -{' '}
                                                        {
                                                            dataWaterReminder.endTime
                                                        }
                                                    </p>
                                                </div>
                                                <div
                                                    className={clsx(
                                                        styles.card__optionWrapper,
                                                    )}
                                                >
                                                    <AccessAlarmsOutlinedIcon className="text-sm text-gray-400" />
                                                    <p className="text-sm text-gray-400 leading-[100%]">
                                                        {
                                                            dataWaterReminder.interval
                                                        }
                                                        p
                                                    </p>
                                                </div>
                                                {dataWaterReminder.note && (
                                                    <div
                                                        className={clsx(
                                                            styles.card__optionWrapper,
                                                        )}
                                                    >
                                                        <StickyNote2OutlinedIcon className="text-sm text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <CusDrawer
                anchor={anchor}
                isOpen={isOpenDrawer}
                toggleDrawer={toggle}
            >
                <DrawerContent
                    onCloseDrawer={() => setIsOpenDrawer(false)}
                    onRefreshData={fetchData}
                />
            </CusDrawer>
        </div>
    );
}
