'use client';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import _ from 'lodash';

import ListKnowledge from '@/components/ListPage/ListKnowledge';
import { welcomeMessage } from '@/mock/welcomeText';
import DoctorBanner from '@/assets/image/banner-ai.png';
import Dot from '@/assets/image/dots-banner.png';
import { Button } from '@mui/material';
import { facts } from '@/mock/facts';
import { IExerciseReminder, IWaterReminder } from '@/types/reminderType';
import exerciseReminderSync from '@/utils/axios/exerciseReminder';
import AddIcon from '@mui/icons-material/Add';

interface IFact {
    id: number;
    title: string;
    content: string;
}
interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
    const isFirstTime = false;
    const [havePlan, setHavePlan] = useState(false);
    const [haveRemindWater, setHaveRemindWater] = useState(false);
    const [haveRemindWorkout, setHaveRemindWorkout] = useState(false);
    const [randomWelcome, setrandomWelcome] = useState('');
    const [fact, setFact] = useState<IFact>({
        id: 1,
        title: '',
        content: '',
    });
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

    useEffect(() => {
        (async () => {
            try {
                const reminderData =
                    await exerciseReminderSync.getAllReminders();
                console.log(reminderData.data);
                if (reminderData.status === 200) {
                    setDataExerciseReminder(reminderData.data.exerciseReminder);
                    setDataWaterReminder(reminderData.data.waterReminder);

                    if (reminderData.data.exerciseReminder) {
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
                                    : 'Lập kế hoạch'}
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
                        backgroundColor: '#d1e7dd',
                        borderColor: 'transparent',
                        borderRadius: '100%/100px 100px 0 0',
                        transform: 'rotate(180deg)',
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
                                    : 'Lập kế hoạch'}
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
                    <section id="remind" className="px-3">
                        <div className="center-y justify-between gap-2 py-1">
                            <p className="text-gray-700 font-medium text-lg">
                                Đặt lời nhắc
                            </p>
                            <Button size="large" className="text-boldGreen">
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
                                1750 ml
                            </p>
                        </div>
                        <section className="">
                            <div className="bg-white px-4 pt-3 pb-4 rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                                <div className="grid grid-cols-5 gap-2">
                                    <div className="pt-2">
                                        <Image
                                            src="/images/fill-water-cup.png"
                                            alt="water"
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <button className="relative pt-2">
                                        <Image
                                            src="/images/empty-cup.png"
                                            alt="water"
                                            width={100}
                                            height={100}
                                        />
                                        <div className="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
                                            <AddIcon className="text-4xl"></AddIcon>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </section>
                        <section></section>
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
