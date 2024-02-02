'use client';
import { IFullyPlanningData } from '@/types/planning';
import {
    Button,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Select,
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { calcTDEE } from '@/utils/tools/calcTDEE';
import planningSync from '@/utils/axios/planning';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ProgressProvider from './progressChart/ProgressProvider';
import PlanningTabs from './panelTab/PanelTab';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface IPlanningDetailProps {
    params: {
        planningId: string;
    };
}

export default function PlanningDetail({ params }: IPlanningDetailProps) {
    const { planningId } = params;
    const router = useRouter();
    const chartProgressRef = useRef<HTMLCanvasElement | null>(null);

    const [progressPlan, setProgressPlan] = useState<number>(0);
    const [restDate, setRestDate] = useState<number>(0);

    const [planningData, setPlanningData] = useState<IFullyPlanningData>({
        _id: '',
        title: '',
        startTime: new Date(),
        endTime: new Date(),
        goal: 'lose',
        status: 0,
    });
    const [userData, setUserData] = useState({
        weight: 0,
        height: 0,
        gender: 1,
        age: 0,
    });

    const calcProgressPlan = (data: IFullyPlanningData): void => {
        console.log('planningData: ', planningData);
        if (data.goalWeight && data.initWeight && data.currentWeight) {
            const goal = Math.abs(data.goalWeight - data.initWeight);
            const reality = data.currentWeight - data.initWeight;

            if (
                (data.goal === 'lose' && reality >= 0) ||
                (data.goal === 'increased' && reality <= 0)
            ) {
                setProgressPlan(0);
            } else {
                const calcProgress = Math.round(Math.abs(reality / goal) * 100);
                setProgressPlan(calcProgress);
            }
        }
    };

    const calcCaloPerDay = () => {
        const { weight, height, gender, age } = userData;
        if (planningData.goal) {
            const tdeeData = calcTDEE({
                gender,
                age,
                height,
                weight,
                activityLevel: 'medium',
                goal: planningData.goal,
            });
            setPlanningData((prev) => ({
                ...prev,
                caloPerDay: tdeeData.restDayCalo,
            }));
        }
    };

    const calcRestDate = (endTime: Date): void => {
        const today = dayjs();
        const endTimeDayjs = dayjs(endTime);
        const daysDiff = endTimeDayjs.diff(today, 'day');
        setRestDate(daysDiff);
    };

    const updateInitPlan = async () => {
        try {
            const updateInit = await planningSync.updatePlanning(planningData);

            if (updateInit.status === 200) {
                setPlanningData((prev) => ({
                    ...prev,
                    status: 1,
                }));
            }
        } catch (error) {
            alert('Cập nhật lỗi');
        }
    };

    useEffect(() => {
        const userInfo = JSON.parse(
            sessionStorage.getItem('userInfo') || 'null',
        );
        if (userInfo) {
            const today = dayjs();
            const birthDate = dayjs(userInfo.birthYear);
            const age = today.diff(birthDate, 'year');

            setUserData({
                weight: userInfo.weight,
                height: userInfo.height,
                gender: userInfo.gender,
                age,
            });
        }

        (async () => {
            try {
                const planningData = await planningSync.getDetail(planningId);

                if (planningData.status === 200) {
                    setPlanningData(planningData.data.result);
                    calcProgressPlan(planningData.data.result);
                    calcRestDate(planningData.data.result.endTime);
                }
            } catch (error) {
                console.log('error', error);
            }
        })();

        setProgressPlan(65);
    }, [planningId]);

    return (
        <div className="container-sp">
            {planningData.status ? (
                <div className="">
                    <section>
                        <div
                            className="relative w-full bg-lightgreen px-4 pt-4 pb-6"
                            style={{
                                borderRadius:
                                    'border-radius: 50%/100px 100px 0 0',
                            }}
                        >
                            <div className="px-1 mb-4">
                                <Button
                                    variant="text"
                                    startIcon={<ArrowBackIosIcon />}
                                    className="text-boldGreen text-lg"
                                    onClick={() => {
                                        router.push('/planning');
                                    }}
                                >
                                    Lịch của tôi
                                </Button>
                            </div>
                            <div className="center gap-6">
                                <div className="center-y justify-start">
                                    <div className="center flex-col">
                                        <p className="font-medium text-gray-600">
                                            Bắt đầu
                                        </p>
                                        <div className="text-lg font-semibold text-gray-600">
                                            {dayjs(
                                                planningData.startTime,
                                            ).format('DD/MM')}
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div
                                        className=""
                                        style={{ width: 160, height: 160 }}
                                    >
                                        <ProgressProvider
                                            valueStart={0}
                                            valueEnd={progressPlan}
                                        >
                                            {(value: any) => (
                                                <CircularProgressbar
                                                    value={value}
                                                    strokeWidth={6}
                                                />
                                            )}
                                        </ProgressProvider>
                                    </div>
                                    <div className="absolute center flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                        <p className="font-medium text-gray-600">
                                            Tiến độ
                                        </p>
                                        <p className="mt-2 text-[42px] leading-none text-boldGreen font-semibold">
                                            {progressPlan}%
                                        </p>
                                    </div>
                                </div>
                                <div className="center-y justify-end">
                                    <div className="center flex-col">
                                        <p className="font-medium text-gray-600">
                                            Kết thúc
                                        </p>
                                        <div className="text-lg font-semibold text-gray-600">
                                            {dayjs(planningData.endTime).format(
                                                'DD/MM',
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="center mt-3">
                                <div className="text-gray-600 text-sm">
                                    Bạn còn <strong>{restDate} ngày</strong> để
                                    đạt mục tiêu
                                </div>
                            </div>
                            <div className="center w-full mt-6">
                                <div className="flex-1 center flex-col">
                                    <p className="font-medium text-gray-600">
                                        Hiện tại
                                    </p>
                                    <p className="font-semibold text-xl text-gray-600">
                                        {planningData.currentWeight} kg
                                    </p>
                                </div>
                                <div className="flex-1 center flex-col translate-y-4">
                                    <p className="font-medium text-gray-600">
                                        Mục tiêu
                                    </p>
                                    <p className="font-semibold text-xl text-gray-600">
                                        {planningData.goalWeight} kg
                                    </p>
                                </div>
                                <div className="flex-1 center flex-col">
                                    <p className="font-medium text-gray-600">
                                        Calo
                                    </p>
                                    <p className="font-semibold text-xl text-gray-600">
                                        {planningData.caloPerDay}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className=""
                            style={{
                                width: '100%',
                                height: '50px',
                                border: 'solid 5px #000',
                                backgroundColor: '#d5f2d6',
                                borderColor: 'transparent',
                                borderRadius: '100%/100px 100px 0 0',
                                transform: 'rotate(180deg) translateY(4px',
                            }}
                        ></div>
                    </section>
                    <section className="mt-4 px-4">
                        <PlanningTabs />
                    </section>
                </div>
            ) : (
                <div className="pt-4 pb-10">
                    <div className="px-1 mb-6">
                        <Button
                            variant="text"
                            startIcon={<ArrowBackIosIcon />}
                            className="text-boldGreen text-lg"
                            onClick={() => {
                                router.push('/planning');
                            }}
                        >
                            Lịch của tôi
                        </Button>
                    </div>
                    <div className="px-4">
                        <div className="">
                            <h1 className="text-2xl font-semibold my-0">
                                Kế hoạch: {planningData.title}
                            </h1>
                        </div>
                        <div className="mt-10">
                            <section className="center-y gap-4">
                                <div className="">Mục tiêu:</div>
                                <div className="flex-grow">
                                    <Select
                                        className="w-full"
                                        value={planningData.goal || 'lost'}
                                        onChange={(e) =>
                                            setPlanningData((prev) => ({
                                                ...prev,
                                                goal: e.target.value,
                                            }))
                                        }
                                    >
                                        <MenuItem value="lose">
                                            Giảm cân
                                        </MenuItem>
                                        <MenuItem value="maintain">
                                            Duy trì cân nặng
                                        </MenuItem>
                                        <MenuItem value="increased">
                                            Tăng cân
                                        </MenuItem>
                                    </Select>
                                </div>
                            </section>
                            <section className="center-y gap-10 mt-8">
                                <div className="flex-1">
                                    <p className="mb-2">Cân nặng hiện tại</p>
                                    <OutlinedInput
                                        defaultValue={userData.weight}
                                        value={planningData.initWeight}
                                        id="outlined-adornment-weight"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                kg
                                            </InputAdornment>
                                        }
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                                        onChange={(e) =>
                                            setPlanningData((prev) => ({
                                                ...prev,
                                                initWeight: Number(
                                                    e.target.value,
                                                ),
                                            }))
                                        }
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="mb-2">Mục tiêu</p>
                                    <OutlinedInput
                                        value={planningData.goalWeight}
                                        id="outlined-adornment-goal-weight"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                kg
                                            </InputAdornment>
                                        }
                                        inputProps={{
                                            'aria-label': 'goal-weight',
                                        }}
                                        onChange={(e) =>
                                            setPlanningData((prev) => ({
                                                ...prev,
                                                goalWeight: Number(
                                                    e.target.value,
                                                ),
                                            }))
                                        }
                                    />
                                </div>
                            </section>
                            <section className="center-y justify-between mt-8">
                                <div className="">
                                    <p className="">
                                        Lượng calo cần trong ngày
                                    </p>
                                    {planningData.caloPerDay && (
                                        <p className="my-2 text-xl font-semibold text-boldGreen">
                                            {planningData.caloPerDay} calo
                                        </p>
                                    )}
                                </div>
                                <Button
                                    className="text-boldGreen"
                                    variant="text"
                                    onClick={calcCaloPerDay}
                                >
                                    Tính toán
                                </Button>
                            </section>
                        </div>

                        <div className="mt-10 w-full">
                            <Button
                                className="w-full py-2 rounded-2xl bg-boldGreen text-white"
                                variant="contained"
                                onClick={updateInitPlan}
                            >
                                Cập nhật
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
