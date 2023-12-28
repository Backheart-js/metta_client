'use client';

import { toolData } from '@/mock/mock-toolData';
import { ICombineData, formatText } from '@/types/tool';
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
    const [message, setMessage] = useState({});
    const router = useRouter();

    useEffect(() => {
        const categoryList = [
            'Chế độ sinh hoạt',
            'Chế độ dinh dưỡng',
            'Phương pháp tập luyện',
        ];
        const formatedMessage = formatText(toolData.message, categoryList);
        setMessage(formatedMessage);
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
                        sx={{ px: 5, pt: 2 }}
                    >
                        <div className="mb-5">
                            <h4 className="text-boldGreen font-medium text-lg">
                                TDEE là gì? Tính TDEE giảm cân lành mạnh
                            </h4>
                        </div>
                        <div className="text-gray-400 font-normal text-base">
                            <p>
                                TDEE (Total Daily Energy Expenditure) là tất cả
                                năng lượng cần thiết cho hoạt động mỗi ngày của
                                bạn. Tính TDEE giúp bạn đạt được mục tiêu dinh
                                dưỡng (giảm cân, tăng cân) của bạn.
                                <div className="h-4"></div>
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
                        sx={{ px: 5, pt: 2 }}
                    >
                        <div className="mb-5">
                            <h4 className="text-boldGreen font-medium text-lg">
                                BRM là gì?
                            </h4>
                        </div>
                        <div className="text-gray-400 font-normal text-base">
                            <p>
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
                <div className="flex md:justify-between md:flex-col mb-10 mt-8 md:gap-4 px-4">
                    <div className="flex md:flex-row md:items-end">
                        <p className="text-boldGreen font-semibold text-lg">
                            Lượng calo cần thiết cho ngày tập luyện là:
                        </p>
                        <div className="text-center mt-2 md: mx-4">
                            <span className="text-yellowPrimary text-4xl font-bold">
                                {resultData?.workoutDayCalo}
                            </span>
                        </div>
                        <div className="mt-2 md:mt-0 md:mb-1">
                            <span className="text-gray-400 text-sm md:leading-6">
                                calories
                            </span>
                        </div>
                    </div>
                    <div className="flex md:flex-row md:items-end">
                        <p className="text-boldGreen font-semibold text-lg">
                            Lượng calo cần thiết cho ngày nghỉ là:
                        </p>
                        <div className="text-center mt-2 md: mx-4">
                            <span className="text-yellowPrimary text-4xl font-bold">
                                {resultData?.restDayCalo}
                            </span>
                        </div>
                        <div className="mt-2 md:mt-0 md:mb-1">
                            <span className="text-gray-400 text-sm md:leading-6">
                                calories
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <div className="max-w-[80%] border-b-1"></div>
            <section className="my-14">
                <h1 className="text-center font-semibold text-gray-700">
                    Lời khuyên
                </h1>
                <div className="">
                    {Object.keys(message).map((category) => (
                        <div key={category} className="">
                            <h5 className="">{category}</h5>
                            <ul className="">
                                {message[category].map(
                                    (content, index: number) => (
                                        <li key={index} className="">
                                            {content}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    ))}

                    {/* <div className="">
                        <h5 className="">Chế độ sinh hoạt</h5>
                        <ul className="">
                            <li className=""></li>
                        </ul>
                    </div>
                    <div className="">
                        <h5 className="">Chế độ dinh dưỡng</h5>
                        <ul className="">
                            
                        </ul>
                    </div>
                    <div className="">
                        <h5 className="">Phương pháp tập luyện</h5>
                        <ul className="">
                            
                        </ul>
                    </div> */}
                </div>
            </section>
            <section className=""></section>
        </div>
    );
}
