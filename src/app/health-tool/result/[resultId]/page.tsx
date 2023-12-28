'use client';

import { toolData } from '@/mock/mock-toolData';
import { ICombineData } from '@/types/tool';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import BMI_Chart_image from '../../../../assets/image/bmi-chart.jpg';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export interface IResultProps {}

export default function Result({}: IResultProps) {
    const [resultData, setResultData] = useState<ICombineData>();
    const [openTDEE, setOpenTDEE] = useState(false);
    const [openBRM, setOpenBRM] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setResultData(toolData);

        return () => {};
    }, []);

    return (
        <div className="container-sp">
            <div className="">
                <h1 className="text-center font-semibold text-gray-700">
                    Kết quả đo
                </h1>
            </div>
            <section className="mt-10 mb-14">
                <div className="flex items-end justify-between">
                    <div className="flex items-end">
                        <p className="text-boldGreen font-semibold text-xl">
                            Chỉ số BMI hiện tại:
                        </p>
                        <p className="text-yellowPrimary text-4xl ml-2 font-bold">
                            {resultData?.bmi}
                        </p>
                    </div>
                    <div className="ml-10 text-sm font-semibold text-gray-700">
                        {resultData?.status}
                    </div>
                </div>
                <div className="flex md:justify-between mb-10 mt-12">
                    <div className="text-center">
                        <p className="text-boldGreen font-semibold text-lg">
                            Cân nặng tối thiểu
                        </p>
                        <div className="text-center mt-2">
                            <span className="text-yellowPrimary text-4xl font-bold">
                                {resultData?.minWeight}
                            </span>
                        </div>
                        <div className="mt-2">
                            <span className="text-gray-400 text-sm">
                                kilogram
                            </span>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-boldGreen font-semibold text-lg">
                            Cân nặng lý tưởng
                        </p>
                        <div className="text-center mt-2">
                            <span className="text-yellowPrimary text-4xl font-bold">
                                {resultData?.idealWeight}
                            </span>
                        </div>
                        <div className="mt-2">
                            <span className="text-gray-400 text-sm">
                                kilogram
                            </span>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-boldGreen font-semibold text-lg">
                            Cân nặng tối đa
                        </p>
                        <div className="text-center mt-2">
                            <span className="text-yellowPrimary text-4xl font-bold">
                                {resultData?.maxWeight}
                            </span>
                        </div>
                        <div className="mt-2">
                            <span className="text-gray-400 text-sm">
                                kilogram
                            </span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <p className="text-xl text-boldGreen font-semibold">
                        Đánh giá:
                    </p>
                    <div className="mt-2">
                        <span className="text-gray-500 text-sm">
                            {resultData?.advice}
                        </span>
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
            <section className="my-14">
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton
                        onClick={() => setOpenTDEE((prev) => !prev)}
                    >
                        <ListItemText
                            primary={
                                <div className="flex items-end">
                                    <p className="text-boldGreen font-semibold text-xl">
                                        Chỉ số TDEE hiện tại:
                                    </p>
                                    <p className="text-yellowPrimary text-4xl ml-2 font-bold">
                                        {resultData?.tdee}
                                    </p>
                                </div>
                            }
                        />
                        {openTDEE ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                        in={openTDEE}
                        timeout="auto"
                        unmountOnExit
                        sx={{ px: 5 }}
                    >
                        <div className="text-gray-500 font-medium py-4">
                            <p>
                                TDEE (Total Daily Energy Expenditure) là tất cả
                                năng lượng cần thiết cho hoạt động mỗi ngày của
                                bạn. Tính TDEE giúp bạn đạt được mục tiêu dinh
                                dưỡng (giảm cân, tăng cân) của bạn.
                                <br />
                                Xác định chỉ số TDEE sẽ giúp bạn biết rõ lượng
                                calo nên tăng hoặc giảm để đạt hiệu quả cutting
                                (giảm cân) hay bulking (tăng cân). Nói cách
                                khác, TDEE giúp cân bằng năng lượng để đạt được
                                hiệu quả giảm cân nhưng không gây ra những tác
                                động tiêu cực đến sức khỏe.
                            </p>
                        </div>
                    </Collapse>
                    <div className="h-5 w-full"></div>
                    <ListItemButton onClick={() => setOpenBRM((prev) => !prev)}>
                        <ListItemText
                            primary={
                                <div className="flex items-end">
                                    <p className="text-boldGreen font-semibold text-xl">
                                        Chỉ số BRM hiện tại:
                                    </p>
                                    <p className="text-yellowPrimary text-4xl ml-2 font-bold">
                                        {resultData?.brm}
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
                        sx={{ px: 5 }}
                    >
                        <div className="text-gray-500 font-medium py-4">
                            BRM là gì
                        </div>
                    </Collapse>
                </List>
            </section>
            <section className="my-14"></section>
            <section className=""></section>
        </div>
    );
}
