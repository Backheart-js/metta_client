'use client';

import toolSync from '@/utils/axios/tool';
import React, { useEffect, useState } from 'react';
import BMI_Chart_image from '@/assets/image/bmi-chart.jpg';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { IPreviewData } from '@/types/tool';
import Image from 'next/image';
import NoData from '@/components/NoData/NoData';
import { useAppSelector } from '@/lib/hooks';

export interface IPreviewProps {
    params: {
        id: string;
    };
}

export default function Preview({ params }: IPreviewProps) {
    const { id } = params;
    const isLogin = useAppSelector((state) => state.auth.isLoginState);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [openTDEE, setOpenTDEE] = useState(false);
    const [openBRM, setOpenBRM] = useState(false);
    const [data, setData] = useState<IPreviewData>({
        userName: '',
        bmi: 0,
        minWeight: 0,
        maxWeight: 0,
        idealWeight: 0,
        status: '',
        gender: 0,
        age: 0,
        height: 0,
        weight: 0,
        goal: '',
        brm: 0,
        tdee: 0,
        restDayCalo: 0,
        workoutDayCalo: 0,
        date: new Date(),
    });
    const [notFoundData, setnotFoundData] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const { status, data } = await toolSync.getPreviewResult(id);

                if (status === 200) {
                    console.log('data: ', data);
                    setData(data.result);
                } else {
                    setnotFoundData(true);
                }
            } catch (error) {
                setnotFoundData(true);
            } finally {
                setIsLoading(false);
            }
        })();

        return () => {};
    }, []);

    return isLoading ? (
        <div className="container-sp pt-6 md:pt-10">
            <div className="px-5 py-4 md:px-0">
                <Skeleton width={'200px'} height={'64px'} />
            </div>
            <section className="mt-4 mb-6 md:mt-10 md:mb-14 px-5 md:px-0">
                <div className="w-full flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between">
                    <div className="flex-grow flex flex-col md:flex-row items-center md:items-end">
                        <Skeleton width={250} height={'40px'} />
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-10 text-sm font-semibold text-gray-700">
                        <Skeleton width={'100px'} height={'40px'} />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row md:justify-between mb-8 md:mb-10 mt-6 md:mt-12">
                    <div className="w-full text-center">
                        <Skeleton className="w-full" height={'300px'} />
                        <div className="w-full text-center mt-2">
                            <Skeleton className="w-full" height={'40px'} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    ) : !notFoundData ? (
        <div className="pt-6">
            <NoData isLogin={isLogin} />
        </div>
    ) : (
        <div className={'container-sp pt-6 md:pt-10'}>
            <div className="px-5 py-4 md:px-0">
                <div className="text-xl font-semibold text-gray-700">
                    Chỉ số cơ thể: <br />
                    <p className="text-3xl">{data.userName}</p>
                </div>
            </div>
            <section className="mt-4 mb-6 md:mt-10 md:mb-14 px-5 md:px-0">
                <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between">
                    <div className="flex flex-col md:flex-row items-center md:items-end">
                        <p className="text-boldGreen font-semibold text-xl">
                            Chỉ số BMI hiện tại:
                        </p>
                        <p className="text-yellowPrimary text-4xl ml-2 font-bold">
                            {data?.bmi}
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-10 text-sm font-semibold text-gray-700">
                        {data?.status}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between mb-8 md:mb-10 mt-6 md:mt-12">
                    <div className="text-center">
                        <p className="text-boldGreen font-semibold text-lg">
                            Cân nặng tối thiểu
                        </p>
                        <div className="text-center mt-2">
                            <span className="text-yellowPrimary text-4xl font-bold">
                                {data?.minWeight}
                            </span>
                        </div>
                        <div className="mt-1 md:mt-2">
                            <span className="text-gray-400 text-sm">
                                kilogram
                            </span>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-boldGreen font-semibold text-lg mt-4 md:mt-0">
                            Cân nặng lý tưởng
                        </p>
                        <div className="text-center mt-2">
                            <span className="text-yellowPrimary text-4xl font-bold">
                                {data?.idealWeight}
                            </span>
                        </div>
                        <div className="mt-1 md:mt-2">
                            <span className="text-gray-400 text-sm">
                                kilogram
                            </span>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-boldGreen font-semibold text-lg mt-4 md:mt-0">
                            Cân nặng tối đa
                        </p>
                        <div className="text-center mt-2">
                            <span className="text-yellowPrimary text-4xl font-bold">
                                {data?.maxWeight}
                            </span>
                        </div>
                        <div className="mt-1 md:mt-2">
                            <span className="text-gray-400 text-sm">
                                kilogram
                            </span>
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden rounded-lg mt-8">
                    <Image
                        src={BMI_Chart_image}
                        alt="BMI chart"
                        className="w-full h-full"
                    />
                    <p className="text-center italic text-gray-500 font-semibold text-base">
                        Bảng đối chiếu chỉ số BMI
                    </p>
                </div>
            </section>
            <div className="border-t-[1px] border-gray-300"></div>
            <section className="mt-8 mb-14 px-5 md:px-0">
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton
                        className="px-0"
                        onClick={() => setOpenTDEE((prev) => !prev)}
                    >
                        <ListItemText
                            primary={
                                <div className="flex flex-col md:flex-row items-start md:items-end">
                                    <p className="text-boldGreen font-semibold text-xl">
                                        Chỉ số TDEE hiện tại:
                                    </p>
                                    <p className="text-yellowPrimary text-3xl md:text-4xl md:ml-2 font-bold">
                                        {data?.tdee}
                                    </p>
                                </div>
                            }
                        />
                        {openTDEE ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Box sx={{ transition: 'height 0.3s ease-in-out' }}>
                        <Collapse
                            in={openTDEE}
                            timeout="auto"
                            unmountOnExit
                            className="pl-0 pr-4 md:px-5 pt-2"
                        >
                            <div className="">
                                <div className="mb-5">
                                    <h4 className="text-boldGreen font-medium text-lg">
                                        TDEE là gì? Tính TDEE giảm cân lành mạnh
                                    </h4>
                                </div>
                                <div className="text-gray-400 font-normal text-base">
                                    <p>
                                        TDEE (Total Daily Energy Expenditure) là
                                        tất cả năng lượng cần thiết cho hoạt
                                        động mỗi ngày của bạn. Tính TDEE giúp
                                        bạn đạt được mục tiêu dinh dưỡng (giảm
                                        cân, tăng cân) của bạn.
                                    </p>
                                    <div className="h-4"></div>
                                    <p>
                                        Xác định chỉ số TDEE sẽ giúp bạn biết rõ
                                        lượng calo nên tăng hoặc giảm để đạt
                                        hiệu quả cutting (giảm cân) hay bulking
                                        (tăng cân). Nói cách khác, TDEE giúp cân
                                        bằng năng lượng để đạt được hiệu quả
                                        giảm cân nhưng không gây ra những tác
                                        động tiêu cực đến sức khỏe.
                                    </p>
                                </div>
                            </div>
                        </Collapse>
                    </Box>
                    <div className="h-5 w-full"></div>
                    <ListItemButton
                        className="px-0"
                        onClick={() => setOpenBRM((prev) => !prev)}
                    >
                        <ListItemText
                            primary={
                                <div className="flex flex-col md:flex-row items-start md:items-end">
                                    <p className="text-boldGreen font-semibold text-xl">
                                        Chỉ số BRM hiện tại:
                                    </p>
                                    <p className="text-yellowPrimary text-3xl md:text-4xl md:ml-2 font-bold">
                                        {data?.brm}
                                    </p>
                                </div>
                            }
                        />

                        {openBRM ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                        in={openBRM}
                        timeout="auto"
                        unmountOnExit
                        className="pl-0 pr-4 md:px-5 pt-2"
                    >
                        <div className="">
                            <div className="mb-5">
                                <h4 className="text-boldGreen font-medium text-lg">
                                    BRM là gì?
                                </h4>
                            </div>
                            <p className="text-gray-400 font-normal text-base">
                                Chỉ số BMR (Basal Metabolic Rate) là tỷ lệ trao
                                đổi chất cơ bản trong cơ thể con người,cho biết
                                mức năng lượng tối thiểu mà cơ thể cần, để thực
                                hiện các chức năng cơ bản nhằm đảm bảo duy trì
                                sự sống của cơ thể, khi bạn ở trạng thái nghỉ
                                ngơi.
                            </p>
                        </div>
                    </Collapse>
                </List>
                <div className="flex md:justify-between flex-col md:flex-col mb-10 mt-10 md:mt-8 md:gap-10 px-6 md:px-0">
                    <div className="flex flex-col md:flex-row items-center md:items-end ">
                        <p className="text-boldGreen font-semibold text-lg text-center">
                            Lượng calo cần thiết cho ngày tập luyện là:
                        </p>
                        <div className="text-center mt-2 md: mx-4">
                            <span className="text-yellowPrimary text-4xl font-bold">
                                {data?.workoutDayCalo}
                            </span>
                        </div>
                        <div className="mt-1 md:mt-0 md:mb-1">
                            <span className="text-gray-400 text-sm md:leading-6">
                                calories
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:items-end mt-4 md:mt-0">
                        <p className="text-boldGreen font-semibold text-lg text-center">
                            Lượng calo cần thiết cho ngày nghỉ là:
                        </p>
                        <div className="text-center mt-2 md: mx-4">
                            <span className="text-yellowPrimary text-4xl font-bold">
                                {data?.restDayCalo}
                            </span>
                        </div>
                        <div className="mt-1 md:mt-0 md:mb-1">
                            <span className="text-gray-400 text-sm md:leading-6">
                                calories
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
