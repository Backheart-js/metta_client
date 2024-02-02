'use client';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import _ from 'lodash';

import ListKnowledge from '@/components/ListPage/ListKnowledge';
import { welcomeMessage } from '@/mock/welcomeText';
import DoctorBanner from '@/assets/image/banner-ai.png';
import Dot from '@/assets/image/dots-banner.png';
import { Button, InputAdornment, OutlinedInput } from '@mui/material';
import { facts } from '@/mock/facts';
import { IExerciseReminder, IWaterReminder } from '@/types/reminderType';
import exerciseReminderSync from '@/utils/axios/exerciseReminder';
import AddIcon from '@mui/icons-material/Add';
import appDataSync from '@/utils/axios/appData';
import planningSync from '@/utils/axios/planning';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

interface IFact {
    id: number;
    title: string;
    content: string;
}
interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
    const isFirstTime = false;
    const router = useRouter();
    const [havePlan, setHavePlan] = useState(false);
    const [haveRemindWater, setHaveRemindWater] = useState(false);
    const [haveRemindWorkout, setHaveRemindWorkout] = useState(false);
    const [randomWelcome, setrandomWelcome] = useState('');
    const [fact, setFact] = useState<IFact>({
        id: 1,
        title: '',
        content: '',
    });

    // Data
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

    const [waterDrunk, setWaterDrunk] = useState<number>(0);
    const [exerciseTimeToday, setExerciseTimeToday] = useState<number>(0);

    const [totalDrunkCup, setTotalDrunkCup] = useState<number>(0);
    const [isExercisetime, setIsExercisetime] = useState<{
        isToday: boolean;
        isExpired: boolean;
    }>({
        isToday: false,
        isExpired: true,
    });

    const handleAddWaterCup = async () => {
        setTotalDrunkCup((prev) => prev + 1);

        const newWaterDrunkAmound =
            waterDrunk + dataWaterReminder.amountWaterPerTime;
        setWaterDrunk(newWaterDrunkAmound);

        try {
            const res = await appDataSync.updateDailyReminderData({
                waterAmount: newWaterDrunkAmound,
            });
        } catch (error) {
            console.log('Lỗi update data uống nước');
        }
    };

    const updateExerciseToday = async () => {
        try {
            const res = await appDataSync.updateDailyReminderData({
                exerciseInterval: exerciseTimeToday,
            });
        } catch (error) {
            console.log('Lỗi update data thời gian tập luyện');
        }
    };

    const checkTimeExercise = (data: IExerciseReminder[]): boolean => {
        if (data.length === 0) return false;
        else {
            const currentDayOfWeek = dayjs().day();
            const currentTime = dayjs();
            const target = dayjs(data[0].remindTime, 'HH:mm');

            const isToday = data[0].repeat.includes(currentDayOfWeek);
            const isExpired = !currentTime.isBefore(target);
            setIsExercisetime({
                isToday,
                isExpired,
            });
        }

        return true;
    };

    useEffect(() => {
        (async () => {
            try {
                const reminderData =
                    await exerciseReminderSync.getAllReminders();

                if (reminderData.status === 200) {
                    setDataExerciseReminder(reminderData.data.exerciseReminder);
                    setDataWaterReminder(reminderData.data.waterReminder);

                    // Hàm check hôm nay có phải tập thể dục không
                    checkTimeExercise(reminderData.data.exerciseReminder);

                    if (reminderData.data.exerciseReminder.length > 0) {
                        setHaveRemindWorkout(true);
                        sessionStorage.setItem(
                            'dataExerciseReminder',
                            JSON.stringify(reminderData.data.exerciseReminder),
                        );
                    }
                    if (reminderData.data.waterReminder) {
                        setHaveRemindWater(true);
                        sessionStorage.setItem(
                            'dataWaterReminder',
                            JSON.stringify(reminderData.data.waterReminder),
                        );
                    }
                }

                const planningData = await planningSync.getAll();

                if (planningData.status === 200) {
                    if (planningData.data.results.length > 0) {
                        setHavePlan(true);
                        sessionStorage.setItem(
                            'dataPlanning',
                            JSON.stringify(planningData.data.results),
                        );
                    }
                }

                // Lấy data uống nước hôm nay
                const appData = await appDataSync.getCurrentDateData();
                if (appData.status === 200) {
                    if (appData.data.data.waterAmount) {
                        setWaterDrunk(appData.data.data.waterAmount);
                        console.log(
                            'Lượng nước đã uống: ',
                            appData.data.data.waterAmount,
                        );
                        console.log(
                            'Lượng 1 lần: ',
                            reminderData.data.waterReminder.amountWaterPerTime,
                        );
                        console.log(
                            'Số cốc: ',
                            appData.data.data.waterAmount /
                                reminderData.data.waterReminder
                                    .amountWaterPerTime,
                        );
                        setTotalDrunkCup(
                            appData.data.data.waterAmount /
                                reminderData.data.waterReminder
                                    .amountWaterPerTime,
                        );
                    }
                }
            } catch (error) {
                console.log(error);
            }
        })();

        setFact(
            _.sample(facts) || {
                id: 1,
                title: '',
                content: '',
            },
        );
        setrandomWelcome(_.sample(welcomeMessage) || '');
    }, []);

    return (
        <div className="">
            <section id="thumbnail-mobile" className="md:hidden">
                <div
                    className="relative w-full bg-lightgreen px-4 pt-14"
                    style={{
                        borderRadius: 'border-radius: 50%/100px 100px 0 0',
                    }}
                >
                    <div className="px-2">
                        <p className="font-medium">
                            {isFirstTime ? 'Chào mừng' : randomWelcome}
                        </p>
                        <p className="text-[26px] text-gray-600 font-medium mt-1">
                            Nguyễn Ngọc Bình
                        </p>
                    </div>
                    <div className="center flex-col py-6">
                        <div className="text-center">
                            <p className="text-gray-600 font-medium text-base my-5">
                                Đặt mục tiêu, theo dõi hoạt động hàng ngày của
                                bạn và đạt những cột mốc mới
                            </p>
                        </div>
                        <div className="">
                            <Button
                                variant="contained"
                                className="bg-[#252525] rounded-2xl"
                            >
                                {havePlan
                                    ? 'Theo dõi tiến độ kế hoạch'
                                    : 'Lập kế hoạch mới'}
                            </Button>
                        </div>
                    </div>
                    <Image
                        className="absolute top-0 right-0 w-[50%]"
                        src={Dot}
                        alt="doctor"
                    />
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
            <section>
                <div className="hidden md:flex center bg-white w-full h-[280px] md:h-[600px] relative shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                    <div className="flex flex-col w-[400px]">
                        <h2 className="text-boldGreen font-semibold text-4xl">
                            {isFirstTime ? 'Chào mừng' : randomWelcome}
                        </h2>
                        <p className="text-[#6d6d6d] text-base my-5">
                            Đặt mục tiêu, theo dõi hoạt động hàng ngày của bạn
                            và đạt những cột mốc mới
                        </p>
                        <div className="">
                            <Button
                                variant="contained"
                                className="bg-[#252525] rounded-2xl"
                            >
                                {havePlan
                                    ? 'Theo dõi tiến độ kế hoạch'
                                    : 'Lập kế hoạch mới'}
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Image
                            className="w-[450px]"
                            src={DoctorBanner}
                            alt="doctor"
                        />
                    </div>
                    <Image
                        className="absolute right-0 top-0"
                        src={Dot}
                        alt="doctor"
                    />
                </div>
            </section>
            <main className="container-sp mt-5 md:mt-20 pb-28">
                {!haveRemindWorkout && !haveRemindWater && (
                    <section id="remind-water" className="px-3">
                        <div className="center-y justify-between gap-2 py-1">
                            <p className="text-gray-700 font-medium text-lg">
                                Đặt lời nhắc
                            </p>
                            <Button
                                size="large"
                                className="text-boldGreen"
                                onClick={() => router.push('/planning')}
                            >
                                Đi tới
                            </Button>
                        </div>
                        <section className="">
                            <div className="bg-white px-4 pt-3 pb-4 rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="pt-2">
                                        <span className="text-gray-500 font-medium text-sm">
                                            Hãy để chúng tôi giúp bạn tạo lập
                                            những thói quen tốt, để duy trì sức
                                            trạng thái sức khỏe tốt nhất
                                        </span>
                                    </div>
                                    <div className="">
                                        <Image
                                            src="/images/glass-of-water.png"
                                            alt="water"
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section></section>
                    </section>
                )}
                {haveRemindWater && (
                    <section id="remind" className="px-3">
                        <div className="center-y justify-between gap-2 py-1">
                            <p className="text-gray-700 font-medium text-lg">
                                Lượng nước uống trong hôm nay
                            </p>
                            <p className="font-medium text-boldGreen">
                                {waterDrunk.toString()} ml
                            </p>
                        </div>
                        <section className="">
                            <div className="bg-white px-4 pt-3 pb-4 rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                                <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                                    {dataWaterReminder.remindTime.map(
                                        (time, index: number) => {
                                            return index < totalDrunkCup ? (
                                                <div
                                                    className="pt-2 center flex-col"
                                                    key={index}
                                                >
                                                    <Image
                                                        src="/images/fill-water-cup.png"
                                                        alt="water"
                                                        width={80}
                                                        height={80}
                                                    />
                                                    <p className="mt-2">
                                                        {time}
                                                    </p>
                                                </div>
                                            ) : (
                                                <button
                                                    key={index}
                                                    disabled={
                                                        !(
                                                            index ===
                                                            totalDrunkCup
                                                        )
                                                    }
                                                    className="pt-2"
                                                    onClick={handleAddWaterCup}
                                                >
                                                    <div className="relative">
                                                        <Image
                                                            src="/images/empty-cup.png"
                                                            alt="water"
                                                            width={80}
                                                            height={80}
                                                        />
                                                        {index ===
                                                            totalDrunkCup && (
                                                            <div className="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
                                                                <AddIcon className="text-gray-800 text-2xl md:text-4xl"></AddIcon>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="mt-2">
                                                        {time}
                                                    </p>
                                                </button>
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        </section>
                        <section></section>
                    </section>
                )}
                {isExercisetime.isToday && (
                    <section id="remind-workout" className="px-3 my-8">
                        <div className="center-y justify-between gap-2 py-1">
                            <p className="text-gray-700 font-medium text-lg">
                                Tập thể dục hôm nay
                            </p>
                        </div>
                        <section className="">
                            <div className="bg-white px-4 pt-5 pb-6 rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                                {isExercisetime.isExpired ? (
                                    <div className="center-y flex-col">
                                        <div className="center-y justify-between w-full mb-6">
                                            <p className="font-medium text-lg text-gray-800">
                                                Thời gian tập luyện:
                                            </p>
                                            <div className="">
                                                <OutlinedInput
                                                    value={exerciseTimeToday}
                                                    className="w-[120px]"
                                                    id="outlined-adornment-weight"
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            phút
                                                        </InputAdornment>
                                                    }
                                                    onChange={(e) => {
                                                        setExerciseTimeToday(
                                                            Number(
                                                                e.target.value,
                                                            ),
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="center">
                                            <Button
                                                disabled={
                                                    exerciseTimeToday === 0
                                                }
                                                className="rounded-2xl text-white bg-boldGreen h-10 disabled:opacity-60"
                                                variant="contained"
                                                onClick={updateExerciseToday}
                                            >
                                                Xác nhận
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="">
                                        Nhắc bạn hôm nay có lịch tập lúc{' '}
                                        {dataExerciseReminder[0].remindTime}
                                    </div>
                                )}
                            </div>
                        </section>
                    </section>
                )}
                <section id="knowledge" className="my-8">
                    <div className="bg-white pt-4 pb-2">
                        <div className="center-y py-1 px-3">
                            <p className="text-gray-700 font-medium text-lg">
                                Kiến thức dinh dưỡng
                            </p>
                        </div>
                        {/* content */}
                        <ListKnowledge />
                        <div className="center pt-2">
                            <Button size="medium" className="text-boldGreen">
                                Xem thêm...
                            </Button>
                        </div>
                    </div>
                </section>
                <section id="didyouknow" className="px-3">
                    <div className="bg-white px-4 pt-3 pb-8 rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                        <div className="center flex-col gap-5">
                            <div className="center flex-col">
                                <div className="">
                                    <Image
                                        src="/images/light.png"
                                        alt="light"
                                        width={250}
                                        height={250}
                                    />
                                </div>
                                <p className="text-gray-500 font-medium mt-[-12px]">
                                    Có thể ban chưa biết?
                                </p>
                            </div>
                            <div className="max-w-[80%]">
                                <h4 className="uppercase text-xl text-gray-600 font-semibold text-center">
                                    {fact.title}
                                </h4>
                            </div>
                            <div className="text-gray-500 font-medium max-w-[85%]">
                                {fact.content}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
